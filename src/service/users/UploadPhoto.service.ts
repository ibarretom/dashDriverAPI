import { AppError } from '../../errors/AppError'

import { IStorageProvider } from '../../provider/storageProvider/IStorage.provider'
import { IUsersRepository } from '../../repositories/user/IUsers.repository'

type Request = {
  user_id: string
  avatar_file: string
}

export class UploadPhotoService {
  constructor(
    private userRepository: IUsersRepository,
    private storageProvider: IStorageProvider
  ) {}

  async execute({ user_id, avatar_file }: Request) {
    const user = await this.userRepository.findByID(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    if (user.photo_url) {
      await this.storageProvider.delete(user.photo_url, 'avatar')
    }

    await this.storageProvider.save(avatar_file, 'avatar')

    user.photo_url = avatar_file

    return await this.userRepository.update(user)
  }
}
