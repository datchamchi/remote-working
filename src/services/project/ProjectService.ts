import { Repository } from 'typeorm'

import { HttpCode, LIMIT_PROJECT_PAGE } from '../../../constant'
import { AppDataSource } from '../../config'
import { ProjectEntity, UserEntity } from '../../entity'
import { IProjectService } from './IProjectService'
import { CreateProjectDto } from '../../dto'
import { AppError } from '../../utils'

export class ProjectService implements IProjectService {
    private readonly projectRepo: Repository<ProjectEntity>
    private readonly userRepo: Repository<UserEntity>
    constructor() {
        this.projectRepo = AppDataSource.getRepository(ProjectEntity)
        this.userRepo = AppDataSource.getRepository(UserEntity)
    }
    async addProject(
        user: string,
        input: CreateProjectDto
    ): Promise<ProjectEntity> {
        const { key } = input

        // check user valid
        const userValid = await this.userRepo.findOne({
            where: { email: user },
        })
        if (!userValid) throw new AppError(400, 'Invalid User')
        // check project name exist
        const existProject = await this.projectRepo.findOne({
            where: { key },
        })
        if (existProject) throw new AppError(400, 'Project key is exist')

        const newProject = await this.projectRepo.save({
            ...input,
            leader: user,
            users: [userValid],
        })

        return newProject
    }
    async getAllProjects(
        email: string,
        page: number,
        createdAt: 'asc' | 'desc' | undefined,
        name: 'asc' | 'desc' | undefined
    ): Promise<ProjectEntity[]> {
        const skip = (page - 1) * LIMIT_PROJECT_PAGE
        const projects = await this.projectRepo
            .createQueryBuilder('project')
            .innerJoinAndSelect('project.users', 'user')
            .where('user.email = :email', { email })
            .select(['project'])

            .getMany()

        return projects
    }
    async getProject(projectId: number): Promise<ProjectEntity | null> {
        const project = await this.projectRepo
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.users', 'user')
            .leftJoinAndSelect('user.photo', 'photo')
            .select([
                'project',
                'user.id',
                'user.name',
                'user.email',
                'photo.path',
            ])
            .where('project.id = :projectId', { projectId })
            .getOne()
        return project
    }
    async addUserIntoProject(
        projectId: string,
        leader: string,
        emails: string[]
    ): Promise<ProjectEntity> {
        const project = await this.projectRepo.findOne({
            where: { key: projectId },
            relations: ['users'],
        })
        if (!project) throw new AppError(400, 'Not found projectId')
        if (project.leader !== leader)
            throw new AppError(HttpCode.FORBIDDEN, 'User is not permission')
        const users = await Promise.all(
            emails.map(async (email) => {
                if (
                    project.users.findIndex((user) => user.email === email) >= 0
                )
                    throw new AppError(400, `${email} exist in project`)
                const user = await this.userRepo.findOne({ where: { email } })
                if (!user) throw new AppError(400, 'User not exist')
                return user
            })
        )
        project.users = [...project.users, ...users]

        const updated = await this.projectRepo.save(project)
        return updated
    }
    async checkUserExistInProject(projectId: string, email: string) {
        const project = await this.projectRepo.findOne({
            where: { key: projectId },
            relations: ['users'],
        })
        if (!project) throw new AppError(400, 'Not found projectId')

        const userExist =
            project.users.findIndex((user) => user.email === email) >= 0

        if (userExist) throw new AppError(400, `${email} exist in project`)
    }
}
