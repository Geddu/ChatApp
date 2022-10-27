import { Router } from 'express'
import User from '../models/user'

const usersRouter = Router()

usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch(e) {
    res.status(500).send(e)
  }
})

export default usersRouter
