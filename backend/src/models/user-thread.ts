import { Column, Table, Model, ForeignKey } from 'sequelize-typescript'
import User from './user'
import Thread from './thread'
import { Optional } from 'sequelize/dist'

interface UserThreadAttributes {
  id: number
  userId: number
  threadId: number
}

interface UserThreadCreationAttributes
  extends Optional<UserThreadAttributes, 'id'> {}

@Table({
  timestamps: false
})
class UserThread extends Model<
  UserThreadAttributes,
  UserThreadCreationAttributes
> {
  @ForeignKey(() => User)
  @Column
  userId!: number

  @ForeignKey(() => Thread)
  @Column
  threadId!: number
}

export default UserThread
