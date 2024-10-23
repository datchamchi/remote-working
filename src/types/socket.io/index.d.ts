// src/types/socketio.d.ts
import 'socket.io'

declare module 'socket.io' {
    interface Socket {
        email: string // Add email property to Socket interface
    }
}
