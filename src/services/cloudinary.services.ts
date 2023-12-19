import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config(process.env.CLOUDINARY_URL as string)

class CloudServices {
  async uploadImage(file: any) {
    fs.unlink(file?.path, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'WWR'
      })
      if (!result) {
        throw new Error('Error uploading image')
      }
      return result
    } catch (e: Error | any) {
      throw new Error(e.message)
    }
  }

  async deleteImage(publicId: string) {
    try {
      const result = await cloudinary.uploader.destroy(publicId)
      if (!result) {
        throw new Error('Error deleting image')
      }
      return result
    } catch (e: Error | any) {
      throw new Error(e.message)
    }
  }
}

export default CloudServices
