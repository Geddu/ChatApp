import { Sequelize } from 'sequelize-typescript'
import Message from './message'
import Thread from './thread'
import User from './user'
import UserThread from './user-thread'

export default function initializeDb() {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    models: [User, Thread, UserThread, Message],
  })
  sequelize.sync({ alter: true })
}
