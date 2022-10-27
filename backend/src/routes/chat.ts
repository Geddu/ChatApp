import { Request, Response, Router } from 'express'
import { body, validationResult } from 'express-validator'
import { Server as SocketServer } from 'socket.io'
import Message from '../models/message'
import Thread from '../models/thread'
import User from '../models/user'
import UserThread from '../models/user-thread'

const chatRouter = Router()

chatRouter.post(
  '/',
  body('name').isLength({ min: 1 }).withMessage("Thread name can't be empty."),
  body('participantId').isNumeric(),
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { name, participantId } = req.body

      const user = await User.findByPk(participantId)
      if (!user)
        return res.status(400).send({
          error: `User with id ${participantId} does not exist.`,
        })

      const thread = await Thread.create({ name })
      await UserThread.create({
        threadId: thread.id,
        userId: Number(participantId),
      })
      await UserThread.create({
        threadId: thread.id,
        userId: req.user.id,
      })
      res.send(thread)
    } catch (e) {
      res.status(500).send(e)
    }
  }
)

chatRouter.get('/', async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { include: [Thread] })
    res.send(user?.threads || [])
  } catch (e) {
    res.status(500).send(e)
  }
})

chatRouter.get('/:id/messages', async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { threadId: req.params.id },
    })

    res.send(messages)
  } catch (e) {
    res.status(500).send(e)
  }
})

chatRouter.post(
  '/:id/messages',
  body('content')
    .isLength({ min: 1 })
    .withMessage("Message content can't be empty"),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const thread = await Thread.findByPk(req.params.id)
      if (!thread) return res.status(404).send({ error: 'Thread not found.' })

      const { content } = req.body

      const newMessage = await Message.create({
        content,
        threadId: thread.id,
        sender: req.user.id,
      })

      const messageWithUser = await Message.findByPk(newMessage.id)
      const io = req.app.get('socketServer') as SocketServer

      io.to(`thread-${thread.id}`).emit('message', messageWithUser)
      res.send(messageWithUser)
    } catch (e) {
      res.status(500).send(e)
    }
  }
)

export default chatRouter
