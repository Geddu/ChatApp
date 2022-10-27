# Threads list

Endpoint for listing all threads for the authenticated user. This endpoint requires authentication.

`GET /threads`


## Responses

Success response
```json
Status 200
[
    {
        "id": 1,
        "name": "string",
    },
    {
        ...
    }
]
```

