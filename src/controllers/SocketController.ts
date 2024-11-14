import { Server, Socket } from 'socket.io'
import { DataType, ErrorType } from '../types/socket.type'
import UserService from '../services/UserService'
import { NotifyService } from '../services/notify/NotifyService'
import { ProjectService } from '../services/project/ProjectService'
import { SocketEvent } from '../../constant'
import { AppError } from '../utils'

export class SocketController {
    private readonly io: Server
    private readonly userService: UserService
    private readonly notifyService: NotifyService
    private readonly projectService: ProjectService
    private connectedUsers: { socketId: string; email: string }[]
    constructor(io: Server) {
        this.connectedUsers = []
        this.io = io
        this.notifyService = new NotifyService()
        this.projectService = new ProjectService()
        this.userService = new UserService()
    }

    public connection = (client: Socket) => {
        const { email, id } = client
        // check if user exist
        const user = this.connectedUsers.find((user) => user.email === email)
        if (user) user.socketId = id
        else this.connectedUsers.push({ email, socketId: id })
        client.on(SocketEvent.INVITE_OTHER, this.handleInvitation(client))
        client.on(SocketEvent.ACCPEPT_INVITE, this.acceptInvite(client))
        client.on(SocketEvent.REFUSE_INVITE, this.refuseInvite(client))
        client.on('disconnect', () => {
            this.connectedUsers = this.connectedUsers.filter(
                (id) => id.socketId !== client.id
            )
        })
    }

    private readonly handleInvitation =
        (client: Socket) => async (data: DataType) => {
            const { to, content, type, from, project } = data
            try {
                // check user exist in project
                if (!project) return
                await this.projectService.checkUserExistInProject(project, to)

                // check Email Exist in system
                const user = await this.userService.getUserByEmail(to)
                const responseUserNotFound: DataType = {
                    type: 'inform',
                    title: user ? 'Invitation sent' : 'Invitation fail',
                    from: 'Remote Working',
                    to: from,
                    content: user
                        ? `Wating ${to} accpept`
                        : `${to} is not currently`,
                }
                this.io
                    .to(client.id)
                    .emit(SocketEvent.USER_NOT_FOUND, responseUserNotFound)
                if (!user) return

                // mailtrapClient
                //     .send({
                //         from: sender,
                //         to: [{ email: to }],
                //         subject: 'Invitation',
                //         text: content,
                //     })
                //     .then(() => {
                //         console.log('send email successfully')
                //     })
                //     .catch((err) => console.log(err))
                // if invited user online ,send notify

                const invitedUserOnline = this.connectedUsers.find(
                    (user) => user.email === to
                )

                // if user exist create notify inform to invited person
                await this.notifyService.addNotify({
                    content,
                    type,
                    from,
                    to,
                    project,
                })

                if (invitedUserOnline) {
                    const invitation: DataType = {
                        content,
                        type: 'invite',
                        from: to,
                        to: from,
                        project,
                    }
                    this.io
                        .to(invitedUserOnline.socketId)
                        .emit(SocketEvent.NOTIFY_USER, invitation)
                }
            } catch (err) {
                if (err instanceof AppError) {
                    return this.io.to(client.id).emit('error', {
                        title: err.status,
                        content: err.messages,
                    })
                }
                const error: ErrorType = {
                    title: 'Error',
                    content: `Cannot invite this user ${to}`,
                }
                this.io.to(client.id).emit('error', error)
            }
        }
    private readonly acceptInvite =
        (client: Socket) => async (data: DataType) => {
            const { from, to, project, content, type } = data
            try {
                // check user exist
                const user = await this.userService.getUserByEmail(to)
                if (!user) return
                const response: DataType = {
                    type,
                    from: to,
                    to: from,
                    content,
                    project,
                }
                const checkUserOnline = this.connectedUsers.find(
                    (userOnline) => userOnline.email === to
                )
                // if user online, display toast
                if (checkUserOnline) {
                    this.io
                        .to(checkUserOnline.socketId)
                        .emit(SocketEvent.ACCPEPT_INVITE, response)
                }
                // add  user into project
                if (!project) return

                await this.projectService.addUserIntoProject(project, to, [
                    from,
                ])

                // create inform
                this.notifyService.addNotify({
                    content: response.content,
                    type: 'inform',
                    from,
                    to,
                })
            } catch (err) {
                if (err instanceof AppError) {
                    return this.io.to(client.id).emit('error', {
                        title: err.status,
                        content: err.messages,
                    })
                }
                const error: ErrorType = {
                    title: 'Error',
                    content: `Unexpected server error occured`,
                }
                this.io.to(client.id).emit('error', error)
            }
        }
    private readonly refuseInvite =
        (client: Socket) => async (data: DataType) => {
            const { from, to, project, content, type } = data
            try {
                // check user exist
                const user = await this.userService.getUserByEmail(to)
                if (!user) return
                const response: DataType = {
                    type,
                    from: to,
                    to: from,
                    content,
                    project,
                }
                const checkUserOnline = this.connectedUsers.find(
                    (userOnline) => userOnline.email === to
                )
                // if user online, display toast
                if (checkUserOnline) {
                    this.io
                        .to(checkUserOnline.socketId)
                        .emit(SocketEvent.REFUSE_INVITE, response)
                }

                // create inform
                this.notifyService.addNotify({
                    content: response.content,
                    type: 'inform',
                    from,
                    to,
                })
            } catch (err) {
                if (err instanceof AppError) {
                    return this.io.to(client.id).emit('error', {
                        title: err.status,
                        content: err.messages,
                    })
                }
                const error: ErrorType = {
                    title: 'Error',
                    content: `Unexpected server error occured`,
                }
                this.io.to(client.id).emit('error', error)
            }
        }
}
