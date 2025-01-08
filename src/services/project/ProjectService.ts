import { Repository } from 'typeorm'

import { HttpCode, LIMIT_PROJECT_PAGE } from '../../../constant'
import { AppDataSource } from '../../config'
import {
    InformNotifyEntity,
    ProjectEntity,
    RoomEntity,
    UserEntity,
} from '../../entity'
import { IProjectService } from './IProjectService'
import { CreateProjectDto } from '../../dto'
import { AppError } from '../../utils'

export class ProjectService implements IProjectService {
    private readonly projectRepo: Repository<ProjectEntity>
    private readonly userRepo: Repository<UserEntity>
    private readonly roomRepo: Repository<RoomEntity>
    private readonly notiRepo: Repository<InformNotifyEntity>

    constructor() {
        this.projectRepo = AppDataSource.getRepository(ProjectEntity)
        this.userRepo = AppDataSource.getRepository(UserEntity)
        this.roomRepo = AppDataSource.getRepository(RoomEntity)
        this.notiRepo = AppDataSource.getRepository(InformNotifyEntity)
    }
    async addProject(
        user: string,
        input: CreateProjectDto
    ): Promise<ProjectEntity> {
        const { key, projectName } = input

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

        // create room
        await this.roomRepo.save({ name: projectName, users: [userValid] })

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

        // update room
        const room = await this.roomRepo.findOne({
            where: { name: project.projectName },
            relations: ['users'],
        })
        if (!room) throw new AppError(400, 'Not found this room')
        room.users = [...room.users, ...users]
        await this.roomRepo.save(room)
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

    async analysProject(projectId: string, type: string) {
        const project = await this.projectRepo.findOne({
            where: { id: Number(projectId) },
            relations: ['tasks', 'tasks.user'],
        })
        if (!project) throw new AppError(400, 'Project not found')
        switch (type) {
            case 'all': {
                return project.tasks
            }
            case 'week': {
                const startOfWeek = new Date()
                const endOfWeek = new Date()
                const dayOfWeek = startOfWeek.getDay()

                startOfWeek.setHours(0, 0, 0, 0)
                startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek + 1)

                endOfWeek.setHours(0, 0, 0, 0)
                endOfWeek.setDate(endOfWeek.getDate() + (8 - dayOfWeek))

                return project.tasks.filter(
                    (task) =>
                        new Date(task.createdAt) >= startOfWeek &&
                        new Date(task.createdAt) < endOfWeek
                )
            }
            case 'month': {
                const thisMonth = new Date().getMonth()
                const thisYear = new Date().getFullYear()
                return project.tasks.filter(
                    (task) =>
                        new Date(task.createdAt).getMonth() == thisMonth &&
                        new Date(task.createdAt).getFullYear() == thisYear
                )
            }
            default:
                throw new AppError(400, 'Bad Request')
        }
    }
    async leaverProject({
        email,
        projectId,
        userId,
    }: {
        email: string
        projectId: string
        userId: string
    }) {
        const project = await this.projectRepo.findOne({
            where: { id: Number(projectId) },
            relations: ['users', 'tasks', 'tasks.user'],
        })
        const room = await this.roomRepo.findOne({
            where: { id: Number(projectId) },
            relations: ['users'],
        })
        if (!project) throw new AppError(400, 'Project not found')
        if (!room) throw new AppError(400, 'Room not found')
        const newListUser = project.users.filter((user) => user.email !== email)

        if (email === project.leader) {
            const newLeader = project.users.find(
                (user) => user.id === Number(userId)
            )
            if (!newLeader) throw new AppError(400, 'User not found')
            project.leader = newLeader.email
        }
        project.users = newListUser

        project.tasks = project.tasks.filter(
            (task) => task.user.email !== email
        )
        room.users = room.users.filter((user) => user.email !== email)
        const updatedProject = await this.projectRepo.save(project)
        await this.roomRepo.save(room)

        return updatedProject
    }
}
