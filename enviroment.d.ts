declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string
            DB_HOST: string
            DB_USER: string
            DB_PASSWORD: string
            DB: string
            DB_PORT: string
            CLOUDINARY_NAME: string
            CLOUDINARY_KEY: string
            CLOUDINARY_SECRET: string
            URL: string

            REFRESH_API_KEY: string
            ACCESS_API_KEY: string

            URL_FRONTEND: string
            GOOGLE_CLIENT_SECRET: string
            GOOGLE_CLIENT_ID: string
            MAILTRAP_API: string
        }
    }
}

export {}
