import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.sendStatus(401)

  const token = authHeader.split(' ')[1]

  jwt.verify(token, 'secret', async (err, decodedToken) => {
    if (err) return res.sendStatus(403)

    const { id } = decodedToken as { id: number }
    const user = await User.findByPk(id)
    if (!user) return res.sendStatus(401)
    req.user = user

    next()
  })
}
