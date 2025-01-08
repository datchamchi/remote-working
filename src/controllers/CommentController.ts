import { Request, Response } from 'express'
import { CommentService } from '../services/CommentService'
import { responseError } from '../utils'

export class CommentController {
    private readonly commentService: CommentService
    constructor() {
        this.commentService = new CommentService()
    }
    addComment = async (
        req: Request<
            { taskId: string; projectId: string },
            object,
            { content: string }
        >,
        res: Response
    ) => {
        try {
            const dto = req.body
            const { taskId } = req.params
            const email = req.email
            const comment = await this.commentService.addComment({
                email,
                taskId,
                content: dto.content,
            })
            res.status(201).json({
                status: 'success',
                data: comment,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
    getAllCommentOfTask = async (
        req: Request<{ taskId: number }>,
        res: Response
    ) => {
        const { taskId } = req.params
        try {
            const comments =
                await this.commentService.getAllCommentOfTask(taskId)
            res.status(200).json({
                status: 'success',
                data: comments,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
    deleteComment = async (
        req: Request<{ commentId: string }>,
        res: Response
    ) => {
        const { commentId } = req.params
        try {
            await this.commentService.deleteComment(Number(commentId))
            res.status(204).json({
                status: 'success',
                data: null,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
    updateComment = async (
        req: Request<{ commentId: string }, object, { content: string }>,
        res: Response
    ) => {
        const { commentId } = req.params
        const { content } = req.body
        try {
            const commentUpated = await this.commentService.updateComment(
                Number(commentId),
                { content }
            )
            res.status(200).json({
                status: 'success',
                data: commentUpated,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
}
