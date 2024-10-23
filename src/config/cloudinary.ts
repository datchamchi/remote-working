import cloudinary from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { AppError } from '../utils/AppError'
import { ALLOW_FORMAT } from '../../constant'

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: async (_, file) => {
        const format = file.mimetype.split('/')[1]

        if (!ALLOW_FORMAT.includes(format)) {
            throw new AppError(
                400,
                'Unsupported file format. Only JPEG and PNG are allowed.'
            )
        }
        return {
            folder: 'remote',
        }
    },
})

const uploader = multer({ storage })

export default uploader
