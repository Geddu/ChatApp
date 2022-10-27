import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import User from '../models/user'

const authRouter = Router()

authRouter.post(
  '/login',
  body('username').isLength({ min: 1 }),
  body('password').isLength({ min: 1 }),
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { username, password } = req.body
      const user = await User.scope('withPassword').findOne({
        where: { username },
      })

      if (!user) return res.status(404).send({ error: 'User not found.' })
      if (user.password !== password)
        return res.status(400).send({ error: 'Incorrect password.' })

      const token = jwt.sign(
        { id: user.id, username: user.username },
        'secret',
        {
          noTimestamp: true,
        }
      )

      res.send({ token, id: user.id, username: user.username })
    } catch (e) {
      res.status(500).send(e)
    }
  }
)

authRouter.post(
  '/register',
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 letters long.'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 letters long.'),
  body('passwordConfirm')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 letters long.'),
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { username, password, passwordConfirm } = req.body

    if (await User.findOne({ where: { username } }))
      return res.status(400).send({ error: 'Username is Already in use.' })

    if (password !== passwordConfirm)
      return res.status(400).send({ error: 'Passwords does not match.' })

    try {
			await User.create({ username, password })
			res.send({
				status: "Success.",
			}) /* Replaced ".sendStatus(200)" with ".send({ status: "Success."})" 
      .sendStatus(200) causes problem on the fronend in the form of a parce error,
       because just an OK as return value is not JSON */
		} catch (e) {
      res.status(500).send(e)
    }
  }
)

export default authRouter
