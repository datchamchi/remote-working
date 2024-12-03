import { Repository } from 'typeorm'
import { ITaskService } from './ITaskService'
import { ProjectEntity, TaskEntity, UserEntity } from '../../entity'
import { AppDataSource } from '../../config'
import { CreateTaskDto } from '../../dto'
import { LIMIT_TASK } from '../../../constant'
import { AppError } from '../../utils'
import { UpdateTaskDto } from '../../dto/TaskDto'

export default class TaskService implements ITaskService {
    private readonly taskRepo: Repository<TaskEntity>
    private readonly projectRepo: Repository<ProjectEntity>
    private readonly userRepo: Repository<UserEntity>
    constructor() {
        this.taskRepo = AppDataSource.getRepository(TaskEntity)
        this.projectRepo = AppDataSource.getRepository(ProjectEntity)
        this.userRepo = AppDataSource.getRepository(UserEntity)
    }
    async getAllTasks(projectId: string): Promise<TaskEntity[]> {
        const tasks = await this.taskRepo
            .createQueryBuilder('task')
            .innerJoinAndSelect('task.project', 'project')
            .where('project.id =:projectId', { projectId })
            .innerJoinAndSelect('task.user', 'user')
            .leftJoinAndSelect('user.photo', 'photo')
            .select(['task', 'user.email', 'user.name', 'photo.path'])
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
    async getllTasksByUser(
        email: string,
        page: string,
        time: 'deadline' | 'recently',
        type: 'todo' | 'ongoing' | 'done' | 'all' | 'overdue'
    ) {
        const tasks = await this.taskRepo.find({
            where: {
                user: { email },
                state: type === 'all' ? undefined : type,
            },
            relations: ['project'],
            take: LIMIT_TASK,
            skip: (Number(page) - 1) * LIMIT_TASK,
            order: {
                estimate: time === 'deadline' ? 'DESC' : undefined,
                createdAt: time === 'recently' ? 'DESC' : undefined,
            },
        })
        return tasks
    }
    async getTotalPage(
        email: string,
        time: 'deadline' | 'recently',
        type: 'todo' | 'ongoing' | 'done' | 'all'
    ) {
        const numberTasks = await this.taskRepo.count({
            where: {
                user: { email },
                state: type === 'all' ? undefined : type,
            },
        })
        const numberPage = Math.ceil(numberTasks / LIMIT_TASK)
        return numberPage
    }
    async updateTask(user: string, taskId: string, dto: UpdateTaskDto) {
        const task = await this.taskRepo.findOne({
            where: { id: Number(taskId) },
            relations: ['user', 'project'],
        })
        if (!task) throw new AppError(400, 'Task not found')
        if (task.user.email !== user && task.project.leader !== user)
            throw new AppError(403, 'User is not permission to update task')
        const { description, estimate, state, assign } = dto

        if (description) task.description = description
        if (estimate) task.estimate = estimate
        if (state) task.state = state
        if (assign) {
            const user = await this.userRepo.findOne({ where: { id: assign } })
            if (!user) throw new AppError(400, 'User not found')
            task.user = user
        }
        const updated = await this.taskRepo.save(task)
        return updated
    }
    async deleteTask(user: string, taskId: string) {
        const task = await this.taskRepo.findOne({
            where: { id: Number(taskId) },
            relations: ['user'],
        })
        if (!task) throw new AppError(400, 'Task not found')
        if (task.user.email !== user)
            throw new AppError(
                403,
                "You don't have permission to delete this task"
            )
        await task.remove()
        return
    }

    static async handleTaskDueTo(dueDate: Date) {
        const overdueTasks = await AppDataSource.getRepository(TaskEntity)
            .createQueryBuilder('task')
            .where(
                'DAY(task.estimate) =:day and MONTH(task.estimate) = :month and YEAR(task.estimate)= :year and task.state <> :status',
                {
                    day: dueDate.getDate(),
                    month: dueDate.getMonth() + 1,
                    year: dueDate.getFullYear(),
                    status: 'done',
                }
            )
            .innerJoinAndSelect('task.user', 'user')
            .getMany()
        return overdueTasks
    }
    static async updateStateOverdueTask(dateTime: Date) {
        AppDataSource.getRepository(TaskEntity)
            .createQueryBuilder()
            .update(TaskEntity)
            .where(
                'task.estimate < :dateTime and task.state <> :done and task.state <> :overdue',
                { dateTime, done: 'done', overdue: 'overdue' }
            )
            .set({ state: 'overdue' })
            .execute()
    }
}
