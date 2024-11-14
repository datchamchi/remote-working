import { z } from 'zod'

export const RoomSchema = z.object({
    users: z.array(z.number()),
})

export type CreateRoomDto = z.infer<typeof RoomSchema>
