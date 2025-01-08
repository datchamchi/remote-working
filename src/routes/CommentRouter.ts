import { Router } from 'express'
import { CommentController } from '../controllers/CommentController'

const commentRouter = Router({ mergeParams: true })

const commentController = new CommentController()
commentRouter
    .route('')
    .get(commentController.getAllCommentOfTask)
    .post(commentController.addComment)

commentRouter
    .route('/:commentId')
    .patch(commentController.updateComment)
    .delete(commentController.deleteComment)
export default commentRouter
