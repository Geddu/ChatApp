# User login

Endpoint for logging in a user. The response returns a JWT token for authentication, and the id and the username of the logged in user. To keep things simple, the JWT token never expires.

`POST /auth/login`

Request body

```json
{
  "username": "string", // Username needs to be at least 3 letters.
  "password": "string" // Password needs to be at least 5 letters.
}
```

## Responses

Success response

```json
Status 200
{
    "token": "string",      // JWT token for authentication
    "id": "string",         // Id of the logged in user
    "username": "string"    // Username of the logged in user
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
