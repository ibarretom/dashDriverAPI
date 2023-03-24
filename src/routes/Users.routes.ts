import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/upload'

import { createUsersController } from '../controllers/user/CreateUsers/'
import { uploadPhotoController } from '../controllers/user/UploadPhoto'
import { EnsureAuthenticated } from '../middleware/EnsureAuthenticated'

const UserRouter = Router()

const uploadAvatar = multer(uploadConfig)

UserRouter.post('/', async (req, res) => {
  await createUsersController.handle(req, res)
})

UserRouter.patch(
  '/avatar',
  EnsureAuthenticated,
  uploadAvatar.single('file'),
  async (req, res) => {
    await uploadPhotoController.handle(req, res)
  }
)

export { UserRouter }
