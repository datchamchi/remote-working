import { Repository } from 'typeorm'
import { SubTaskEntity } from '../entity/subTaskEntity'
import { AppDataSource } from '../config'
import { CreateSubTaskDto, UpdateSubTaskDto } from '../dto/SubTaskDto'
import { TaskEntity } from '../entity'
import { AppError } from '../utils'

export class SubTaskService {
    private readonly subTaskRepo: Repository<SubTaskEntity>
    private readonly taskRepo: Repository<TaskEntity>
    constructor() {
        this.subTaskRepo = AppDataSource.getRepository(SubTaskEntity)
        this.taskRepo = AppDataSource.getRepository(TaskEntity)
    }
    async createSubTask(taskKey: string, dto: CreateSubTaskDto) {
        const task = await this.taskRepo.findOne({
            where: { key: taskKey },
            relations: ['subtasks'],
        })
        if (!task) throw new AppError(400, 'Bad Request')
        const subtask = await this.subTaskRepo.save({ ...dto, taskId: task.id })

        task.subtasks = [...task.subtasks, subtask]
        await task.save()

        return subtask
    }

    async updateSubTask(subtaskId: string, dto: UpdateSubTaskDto) {
        const { name, status } = dto

        const updated = await this.subTaskRepo.update(
            { id: Number(subtaskId) },
            { name, status }
        )
        return updated
    }
    async deleteSubTask(subtaskId: string) {
        await this.subTaskRepo.delete({ id: Number(subtaskId) })
        return
    }
}
