# User Registration & Login Endpoint Documentation

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


---

## POST `/login`

### Description
Authenticates a user with email and password. Returns a JWT token if credentials are valid.

### Request Body
Send a JSON object with the following structure:

```
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

- `email` (string, required, must be a valid email)
- `password` (string, required)

### Responses

#### Success (200 OK)
```
{
  "success": true,
  "message": "Login successful",
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

#### Authentication Error (401 Unauthorized)
```
{
  "success": false,
  "message": "Invalid email or password"
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
- Email and password must be provided.
- On success, a JWT token is returned for authentication.
