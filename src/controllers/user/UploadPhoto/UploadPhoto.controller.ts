import { Request, Response } from 'express'

import { UploadPhotoService } from '../../../service/users/UploadPhoto.service'

export class UploadPhotoController {
  constructor(private uploadPhotoService: UploadPhotoService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user

    const photo: string = request.file?.filename || ''

    const user = await this.uploadPhotoService.execute({
      user_id,
      avatar_file: photo,
    })

    return response.status(200).json({ avatar: user.photo_url })
  }
}
