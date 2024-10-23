import { AppDataSource } from '../../config/database'
import { CreateTaskDto } from '../../dto/TaskDto'
import { ProjectEntity } from '../../entity/project.entity'
import { TaskEntity } from '../../entity/task.entity'
import { UserEntity } from '../../entity/user.entity'
import { AppError } from '../../utils/AppError'
import { ITaskService } from './ITaskService'

export default class TaskService implements ITaskService {
    private readonly taskRepo
    private readonly projectRepo
    private readonly userRepo
    constructor() {
        this.taskRepo = AppDataSource.getRepository(TaskEntity)
        this.projectRepo = AppDataSource.getRepository(ProjectEntity)
        this.userRepo = AppDataSource.getRepository(UserEntity)
    }
    async getAllTasks(projectId: string): Promise<TaskEntity[]> {
        const tasks = this.taskRepo
            .createQueryBuilder('task')
            .innerJoinAndSelect('task.project', 'project')
            .where('project.id =:projectId', { projectId })
            .innerJoinAndSelect('task.user', 'user')
            .leftJoinAndSelect('user.photo', 'photo')
            .select(['task', 'user.email', 'photo.path'])
            .getMany()

        return tasks
    }
    async addTask(projectId: string, input: CreateTaskDto) {
        const project = await this.projectRepo.findOne({
            where: { id: Number(projectId) },
            relations: ['tasks', 'users'],
        })

        if (!project) throw new AppError(400, 'Project not found')

        const checkUserInProject = project.users.find(
            (user) => user.id === input.assign
        )
        if (!checkUserInProject) throw new AppError(400, 'User not in project')

        const count = project.tasks.length
        const { key } = project
        const task = await this.taskRepo.save({
            ...input,
            key: `${key}-${count + 1}`,
            state: 'todo',
            project,
            user: checkUserInProject,
        })
        return task
    }
}
