import { DataSource } from 'typeorm'
import {
    InformNotifyEntity,
    InviteNotifyEntity,
    MessageEntity,
    NotifyEntity,
    PhotoEntity,
    ProjectEntity,
    RoomEntity,
    TaskEntity,
    UserEntity,
} from '../entity'
import { SubTaskEntity } from '../entity/subTaskEntity'
import { CommentEntity } from '../entity/commentEntity'

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
        SubTaskEntity,
        CommentEntity,
    ],

    subscribers: [],
    migrations: [],
})
