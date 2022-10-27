import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  DefaultScope,
} from 'sequelize-typescript'
import { Optional } from 'sequelize'
import User from './user'
import Thread from './thread'

interface MessageAttributes {
  id: number
  content: string
  sender: number
  threadId: number
}

interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> {}

@DefaultScope(() => ({
  include: [User, Thread],
}))
@Table
class Message extends Model<MessageAttributes, MessageCreationAttributes> {
  @Column
  content!: string

  @ForeignKey(() => User)
  @Column
  sender!: number

  @ForeignKey(() => Thread)
  @Column
  threadId!: number

  @BelongsTo(() => User)
  user!: User

  @BelongsTo(() => Thread)
  thread!: Thread
}

export default Message
