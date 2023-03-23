import fs from 'fs'
import { resolve } from 'path'
import upload from '../../../src/config/upload'

import { LocalStorageProvider } from '../../../src/provider/storageProvider/LocalStorage.provider'
import { UsersInMemoryRepository } from '../../../src/repositories/user/UsersInMemory.repository'
import { UploadPhotoService } from '../../../src/service/users/UploadPhoto.service'

let userRepository: UsersInMemoryRepository
let storageProvider: LocalStorageProvider
let uploadPhotoService: UploadPhotoService

describe('Upload photo service', () => {
  beforeAll(() => {
    userRepository = new UsersInMemoryRepository()
    storageProvider = new LocalStorageProvider()

    uploadPhotoService = new UploadPhotoService(userRepository, storageProvider)
  })

  afterAll(async () => {
    await fs.promises.rename(
      resolve(`${upload.tmpFolder}/avatar`, 'test.jpg'),
      resolve(upload.tmpFolder, 'test.jpg')
    )
  })

  it('Should be able to save a photo in users profile', async () => {
    const user = await uploadPhotoService.execute({
      user_id: 'test-id',
      avatar_file: 'test.jpg',
    })

    expect(user.photo_url).toBe('test.jpg')

    expect(fs.existsSync(`${upload.tmpFolder}/avatar/test.jpg`)).toBeTruthy()
  })
})
