import { Repository } from 'typeorm'
import { CommentEntity } from '../entity/commentEntity'
import { AppDataSource } from '../config'
import { InformNotifyEntity, TaskEntity, UserEntity } from '../entity'
import { AppError } from '../utils'

export class CommentService {
    private readonly commentRepo: Repository<CommentEntity>
    private readonly userRepo: Repository<UserEntity>
    private readonly taskRepo: Repository<TaskEntity>
    private readonly notiRepo: Repository<InformNotifyEntity>
    constructor() {
        this.commentRepo = AppDataSource.getRepository(CommentEntity)
        this.userRepo = AppDataSource.getRepository(UserEntity)
        this.taskRepo = AppDataSource.getRepository(TaskEntity)
        this.notiRepo = AppDataSource.getRepository(InformNotifyEntity)
    }

    async addComment(commentDto: {
        email: string
        taskId: string
        content: string
    }) {
        const { content, email, taskId } = commentDto
        const user = await this.userRepo.findOne({ where: { email } })
        if (!user) throw new AppError(403, 'Forbidden')

        const task = await this.taskRepo.findOne({
            where: { id: Number(taskId) },
            relations: ['user'],
        })
        if (!task) throw new AppError(400, 'Task not found')

        const comment = await this.commentRepo.save({
            content,
            user,
            task,
        })
        await this.notiRepo.save({
            content: `${user.name} posted new comment in your task : ${task.taskName}`,
            user: task.user,
            type: 'inform',
            from: email,
        })

        return comment
    }
    async getAllCommentOfTask(taskId: number) {
        const comments = await this.commentRepo.findOne({
            where: { task: { id: taskId } },
        })
        return comments
    }
    async updateComment(commentId: number, dto: { content: string }) {
        const { content } = dto
        const updated = await this.commentRepo.update(
            {
                id: commentId,
            },
            { content }
        )
        return updated
    }
    async deleteComment(commentId: number) {
        await this.commentRepo.delete({ id: commentId })
        return null
    }
}
