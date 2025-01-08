import { Server, Socket } from 'socket.io'
import { DataType, ErrorType } from '../types/socket'
import UserService from '../services/UserService'
import { NotifyService } from '../services/notify/NotifyService'
import { ProjectService } from '../services/project/ProjectService'
import { SocketEvent } from '../../constant'
import { AppError } from '../utils'
import { RoomService } from '../services/RoomService'
import MessageService from '../services/MessageService'
import cloudinary from 'cloudinary'
import stream from 'stream'
import { RoomEntity } from '../entity'

export class SocketController {
    private readonly io: Server
    private readonly userService: UserService
    private readonly notifyService: NotifyService
    private readonly projectService: ProjectService
    private readonly roomService: RoomService
    private readonly messageService: MessageService
    private connectedUsers: { socketId: string; email: string }[]
    constructor(io: Server) {
        this.connectedUsers = []
        this.io = io
        this.notifyService = new NotifyService()
        this.projectService = new ProjectService()
        this.userService = new UserService()
        this.roomService = new RoomService()
        this.messageService = new MessageService()
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
        client.on(SocketEvent.NEW_MESSAGE, this.newTextMessage(client))
        client.on(SocketEvent.INVITE_CALL, this.startCall(client))
        client.on(SocketEvent.END_CALL, this.endCall(client))
        client.on(SocketEvent.NEW_FILE_MESSAGE, this.newFileMessage(client))
        client.on('disconnect', () => {
            this.connectedUsers = this.connectedUsers.filter(
                (id) => id.socketId !== client.id
            )
        })
    }

    private readonly handleInvitation =
        (client: Socket) =>
        async (data: {
            type: 'inform' | 'invite'
            title?: string
            content: string
            from: string
            to: string[]
            project?: string
        }) => {
            const { to: emails, content, type, from, project } = data
            // check user exist in project
            if (!project) return
            emails.forEach(async (to) => {
                try {
                    await this.projectService.checkUserExistInProject(
                        project,
                        to
                    )

                    // check Email Exist in system
                    const user = await this.userService.getUserByEmail(to)
                    const responseUserNotFound: DataType = {
                        type: 'inform',
                        title: 'Invitation fail',
                        from: 'Remote Working',
                        to: from,
                        content: `${to} is not currently`,
                    }
                    if (!user) {
                        return this.io
                            .to(client.id)
                            .emit(
                                SocketEvent.USER_NOT_FOUND,
                                responseUserNotFound
                            )
                    }

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
                }
            })
            const response = {
                type: 'inform',
                title: 'Invitation sent',
                from: 'Remote Working',
                to: from,
                content: `Wating ${emails.join(' and ')} accpept`,
            }
            this.io.to(client.id).emit(SocketEvent.INVITE_OTHER, response)
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
    private readonly newTextMessage =
        (client: Socket) =>
        async (data: {
            roomId: number
            content: string
            type: 'text' | 'img'
        }) => {
            const { roomId, content, type } = data
            const user = await this.userService.getUserByEmail(client.email)
            const room = await this.roomService.getRoom(client.email, roomId)
            try {
                const newMessage = await this.messageService.createMessage(
                    client.email,
                    roomId,
                    {
                        content,
                        type,
                    }
                )
                // inform other in room
                this.informOtherInRoom({
                    email: client.email,
                    room,
                    event: SocketEvent.NEW_MESSAGE,
                    content: {
                        title: `${user?.name} send message into ${room.name ? room.name : room.users.map((user) => user.name).join(', ')}`,
                        content: newMessage.content,
                    },
                })
            } catch {
                this.io
                    .to(client.id)
                    .emit(SocketEvent.ERROR, 'Can not send message to others')
            }
        }
    private readonly newFileMessage =
        (client: Socket) =>
        async (data: {
            roomId: number
            content: string
            type: 'text' | 'img'
        }) => {
            const { roomId, content, type } = data
            const user = await this.userService.getUserByEmail(client.email)
            const room = await this.roomService.getRoom(client.email, roomId)
            const buffer = Buffer.from(content.split(',')[1], 'base64')

            const uploadStream = cloudinary.v2.uploader.upload_stream(
                { resource_type: 'auto', folder: 'remote' },
                async (error, result) => {
                    if (error) return
                    else if (result) {
                        await this.messageService.createMessage(
                            client.email,
                            roomId,
                            {
                                content: result.secure_url,
                                type,
                            }
                        )
                        // inform other in room

                        try {
                            this.io
                                .to(client.id)
                                .emit(SocketEvent.NEW_FILE_MESSAGE)
                            this.informOtherInRoom({
                                email: client.email,
                                room,
                                event: SocketEvent.NEW_MESSAGE,
                                content: {
                                    title: `${user?.name} send photo into ${room.name}`,
                                },
                            })
                        } catch {
                            this.io
                                .to(client.id)
                                .emit(
                                    SocketEvent.ERROR,
                                    'Cannot send photo to others'
                                )
                        }
                    }
                }
            )
            const bufferStream = new stream.PassThrough()
            bufferStream.end(buffer)
            bufferStream.pipe(uploadStream)
        }
    private readonly startCall =
        (client: Socket) =>
        async (data: { content: string; roomId: number }) => {
            const { email } = client
            const { roomId } = data
            const user = await this.userService.getUserByEmail(email)
            // update room status

            const room = await this.roomService.getRoom2(roomId)
            if (!room.isCalling) {
                this.informOtherInRoom({
                    email,
                    room,
                    event: SocketEvent.INVITE_CALL,
                    content: {
                        title: `${user?.name} start calling in ${room.name}`,
                        content: roomId,
                    },
                })
                await this.roomService.updateCallStatus(roomId, true)
            }
        }
    private readonly endCall =
        (client: Socket) =>
        async (data: { content: string; roomId: number }) => {
            const { email } = client
            const { roomId } = data

            // Kiểm tra trạng thái cuộc gọi trước khi kết thúc
            const currentRoom = await this.roomService.getRoom2(roomId)
            if (!currentRoom.isCalling) {
                return // Nếu cuộc gọi đã kết thúc thì không xử lý tiếp
            }

            // update room status
            const room = await this.roomService.updateCallStatus(roomId, false)

            this.informOtherInRoom({
                email,
                room,
                event: SocketEvent.END_CALL,
                content: {
                    title: `${room.name}: Call End`,
                },
            })
        }
    private async informOtherInRoom(dto: {
        email: string
        room: RoomEntity
        event: string
        content: object
    }) {
        const { content, email, event, room } = dto
        const userInRoomConnected = this.connectedUsers.filter((user) => {
            const userInRoom = room.users.findIndex(
                (u) => u.email === user.email
            )
            return userInRoom !== -1
        })
        userInRoomConnected.forEach((u) => {
            if (u.email !== email) {
                return this.io.to(u.socketId).emit(event, content)
            } else return
        })
    }
}
