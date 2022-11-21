# Chat app

## Getting started

First make sure you have [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/) installed. Once those are installed, you can get the app up and running with the following command.

```
cp .env.example .env
docker-compose up --build
```

On Frontend side simply run:

```
npm i
npm start
```

## About the process

This task took me around 15h to complete. You can think of the 15h as a deadline, as I was pressured by time to complete this. Thus, some components and functions are far from "clean code". 

How ever I decided to leave this as is. I feel it shows what I can do under pressure.

## Task

The task is to create a frontend for a chat application. The following features should be found in the application:

- Authentication
    - User can register to the chat application 
    - User can log in with username and password 
    - A logged in user can log out from the application 
- Chat (User should be logged in for all of the following cases)
    - User can add new threads to the application 
        - User needs to input the name of the thread
        - User needs to select participant to start the thread with
    - User can see threads where the user belongs 
        - User belongs to a thread if the user created the thread
        - User belongs to a thread if the user was added to the thread as a participant
    - User can view messages in a thread 
        - All users viewing that thread should see the new message added in real-time
    - User can add messages to a thread

Use React and Typescript for the frontend, and [socket.io-client](https://github.com/socketio/socket.io-client) for websocket connections. You are free to use any other libraries you want in the implementation. Make the frontend implementation to this project structure, e.g. in a `frontend` directory.

[socket.io](https://socket.io) is used for notifying users of added messages in real-time. When viewing a thread in the frontend, connect a websocket to `http://localhost:8000/socket`. 


## API

The server is running at `http://localhost:8000`. Use that as the base URL for each of the endpoints.


### Endpoints

| Method | Endpoint | Requires authentication | Description | Request body |
| --- | --- | --- | --- | --- |
| `POST` | [/auth/register](docs/api/register.md) | No | Endpoint for registering an user. In order to keep things simple, passwords are not encrypted in database. | username: `string`<br>password: `string`<br>passwordConfirm: `string` |
| `POST` | [/auth/login](docs/api/login.md) | No | Endpoint for logging in an user. Again for simplicity, the JWT tokens never expire. Responds with<br>- token: `string`<br>- id: `string`<br>- username: `string` | username: `string`<br>password: `string` |
| `GET` | [/users](docs/api/users.md) | Yes | Lists all users added to the application |
| `GET` | [/threads](docs/api/threads.md) | Yes | Lists all threads where the authenticated user belongs to |
| `POST` | [/threads](docs/api/threads_post.md) | Yes | Creates a new thread | name: `string`<br>participantId: `number` |
| `GET` | [/threads/\<id\>/messages](docs/api/messages.md) | Yes | Lists all messages in a thread |
| `POST` | [/threads/\<id\>/messages](docs/api/messages_post.md) | Yes | Creates a new message in a thread. If the message was created, a websocket event `message` is also emitted with the added message as data | content: `string` |
