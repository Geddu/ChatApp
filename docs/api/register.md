# User register

Endpoint for registering user. To keep things simple for this assignment, the password is not encrypted in the database.

`POST /auth/register`

Request body

```json
{
  "username": "string",
  "password": "string",
  "passwordConfirm": "string"
}
```

## Responses

Success response

```json
Status 200
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
