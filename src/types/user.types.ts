import { UploadApiResponse } from 'cloudinary'

type TUser = {
  id?: string
  name: string
  email: string
  password: string
  biografy: string
  file?:
    | {
        fieldname: string
        originalname: string
        encoding: string
        mimetype: string
        destination: string
        filename: string
        path: string
        size: number
      }
    | UploadApiResponse
}

export { TUser }
