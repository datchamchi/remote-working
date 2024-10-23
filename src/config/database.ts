import { DataSource } from 'typeorm'
import { UserEntity } from '../entity/user.entity'
import { ProjectEntity } from '../entity/project.entity'
import { RoomEntity } from '../entity/room.entity'
import { MessageEntity } from '../entity/message.entity'
import { TaskEntity } from '../entity/task.entity'
import { NotifyEntity } from '../entity/notify.entity'
import { PhotoEntity } from '../entity/photo.entity'
import { InformNotifyEntity } from '../entity/informNoti.entity'
import { InviteNotifyEntity } from '../entity/inviteNoti.entity'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    synchronize: true,
    logging: false,
    entities: [
        UserEntity,
        PhotoEntity,
        ProjectEntity,
        TaskEntity,
        RoomEntity,
        MessageEntity,
        NotifyEntity,
        InformNotifyEntity,
        InviteNotifyEntity,
    ],

    subscribers: [],
    migrations: [],
})
