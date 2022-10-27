# Posting new message

Endpoint for posting new messages. This endpoint requires the user to be authenticated.

When the new message is created, the server emits a websocket event `message` with the added message as parameter.

`POST /threads/<id>/messages`

Request body

```json
{
  "content": "string" // Text content of the message, needs to be at least 1 letters long
}
```

## Responses

Success response

```json
Status 200
{
    "id": 1,
    "content": "string",    // Content of the message
    "sender": 1,            // Id of the user that posted this message
    "threadId": 1,          // Id of the thread where this message belongs
    "thread": {             // Thread where this message belongs
        "id": 1,
        "name": "string"
    },
    "user": {               // User that posted this message
        "id": 1,
        "username": "string"
    }
}
```

Error responses

```json
Status 400
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```
