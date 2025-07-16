# Backend API Documentation

## User Registration API Documentation

## Route

`POST /user/register`

## Description
Registers a new user in the system. Accepts user details, hashes the password, creates a new user, and returns an authentication token along with the user data.

## Request Body
```
{
  "fullName": {
    "firstName": "string (min 3 chars)",
    "lastName": "string (min 3 chars)"
  },
  "email": "string (valid email)",
  "password": "string (min 6 chars)"
}
```

## Success Response
- **Status Code:** `200 OK`
- **Body:**
```
{
  "token": "JWT token string",
  "user": {
    "_id": "user id",
    "fullName": {
      "firstName": "...",
      "lastName": "..."
    },
    "email": "..."
    // other user fields
  },
  "message": "User Registered"
}
```

## Error Responses
- **Status Code:** `400 Bad Request`
  - **Description:** Validation failed (missing or invalid fields)
  - **Body:**
    ```
    {
      "error": [
        { "msg": "Error message", ... }
      ]
    }
    ```

- **Status Code:** `500 Internal Server Error`
  - **Description:** Server error or database failure

## Notes
- Passwords are securely hashed before storage.
- Email must be unique.
- Returns a JWT token for authentication.
