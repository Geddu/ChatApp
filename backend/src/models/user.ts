import {
  Column,
  Table,
  Model,
  BelongsToMany,
  HasMany,
  Scopes,
  DefaultScope,
} from 'sequelize-typescript'
import { Optional } from 'sequelize'
import Thread from './thread'
import UserThread from './user-thread'
import Message from './message'

interface UserAttributes {
  id: number
  username: string
  password: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}


@DefaultScope(() => ({
  attributes: { exclude: ['password'] },
}))
@Scopes(() => ({
  withPassword: {
    attributes: { include: ['password'] },
  },
}))
@Table({
  timestamps: false
})
class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column
  username!: string

  @Column
  password!: string

  @BelongsToMany(() => Thread, () => UserThread)
  threads!: Array<Thread & { UserThread: UserThread }>

  @HasMany(() => Message)
  messages!: Message[]
}

export default User
