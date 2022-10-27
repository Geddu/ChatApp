# Thread creation

Endpoint for creating a new thread. This endpoint requires the user to be authenticated.

`POST /threads`

Request body

```json
{
  "name": "string", // Name of the thread
  "participantId": 1 // Id of the user added as participant
}
```

## Responses

Success response

```json
Status 200
{
    "id": "string",
    "name": "string"
}
```

Error responses

```json
Status 400
{
    "error": "string"
}
```

**OR**

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
