import { LocalStorageProvider } from '../../../provider/storageProvider/LocalStorage.provider'
import { UsersRepository } from '../../../repositories/user/Users.repository'
import { UploadPhotoService } from '../../../service/users/UploadPhoto.service'
import { UploadPhotoController } from './UploadPhoto.controller'

const userRepository = new UsersRepository()
const storageProvider = new LocalStorageProvider()

const uploadPhotoService = new UploadPhotoService(
  userRepository,
  storageProvider
)

const uploadPhotoController = new UploadPhotoController(uploadPhotoService)

export { uploadPhotoController }
