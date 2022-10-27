import {
  Column,
  Table,
  Model,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript'
import { Optional } from 'sequelize'
import User from './user'
import UserThread from './user-thread'
import Message from './message'

interface ThreadAttributes {
  id: number
  name: string
}

interface ThreadCreationAttributes extends Optional<ThreadAttributes, 'id'> {}

@Table({
  timestamps: false
})
class Thread extends Model<ThreadAttributes, ThreadCreationAttributes> {
  @Column
  name!: string

  @BelongsToMany(() => User, () => UserThread)
  users!: Array<User & { UserThread: UserThread }>

  @HasMany(() => Message)
  messages!: Message[]
}

export default Thread
