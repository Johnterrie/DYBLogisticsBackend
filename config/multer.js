import multer from 'multer'
import { cloudinaryStorage } from './cloudinary.js'

const upload = multer({ storage: cloudinaryStorage })

export default upload
