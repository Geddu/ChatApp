import { Server } from 'http'
import { Server as SocketServer } from 'socket.io'

function createSocketServer(server: Server): SocketServer {
  const io = new SocketServer(server, {
    cors: { origin: '*' },
    path: '/socket',
  })

  io.on('connection', (socket) => {
    console.log(socket.id, 'connected')
    const { thread } = socket.handshake.query

    if (!thread) return socket.disconnect()

    socket.join(`thread-${thread}`)
    console.log(socket.id, 'joined thread', thread)

    socket.on('disconnect', () => console.log(socket.id, 'disconnected'))
  })

  return io
}

export default createSocketServer
