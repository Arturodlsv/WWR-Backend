import Jwt from 'jsonwebtoken'

const AuthMiddleware = async (req: any, res: any, next: any) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const decoded = Jwt.verify(token, process.env.JWT_SECRET as string)
  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  req.userId = decoded
  next()
}

export default AuthMiddleware
