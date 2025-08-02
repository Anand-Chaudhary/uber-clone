# User Registration Endpoint Documentation

## POST `/users/register`

### Description
Registers a new user in the system. Accepts user details, hashes the password, creates the user, and returns an authentication token.

### Request Body
Send a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

- `fullname.firstname` (string, required, min 3 chars)
- `fullname.lastname` (string, optional, min 3 chars)
- `email` (string, required, must be a valid email)
- `password` (string, required, min 6 chars)

### Responses

#### Success (201 Created)
```
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": ""
    // ...other user fields
  },
  "token": "<jwt_token>"
}
```

#### Validation Error (400 Bad Request)
```
{
  "success": false,
  "message": "Errors",
  "errors": [
    // Array of validation error messages
  ]
}
```

#### Other Errors (500 Internal Server Error)
```
{
  "success": false,
  "message": "Internal server error"
}
```

### Notes
- All required fields must be provided and valid.
- On success, a JWT token is returned for authentication.
- Passwords are securely hashed before storage.
