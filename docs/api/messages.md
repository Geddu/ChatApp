# Messages list

Endpoint for listing all messages of a thread. This endpoint requires authentication.

`GET /threads/<id>/messages`


## Responses

Success response
```json
Status 200
[
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
    },
    {
        ...
    }
]
```

