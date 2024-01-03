import { UploadApiResponse } from 'cloudinary'

type TBook = {
  id?: string
  bookId?: string
  userId: string
  title: string
  description: string
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
        public_id: string
        secure_url: string
      }
    | UploadApiResponse
}

export { TBook }
