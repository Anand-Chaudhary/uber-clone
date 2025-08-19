# Auth API Documentation (Users & Captains)

This backend exposes authentication endpoints for both Users and Captains. Below are the requests and responses following the existing structure.

---

## Users

### POST `/users/register`

Registers a new user. Hashes the password, creates the user, and returns a JWT token.

Request Body:
```
{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```
- `fullname.firstname` (string, required, min 3 chars)
- `fullname.lastname` (string, optional, min 3 chars)
- `email` (string, required, valid email)
- `password` (string, required, min 6 chars)

Success 201:
```
{
  "success": true,
  "message": "User registered successfully",
  "user": { "_id": "<user_id>", "fullname": {"firstname":"John","lastname":"Doe"}, "email": "john.doe@example.com" },
  "token": "<jwt_token>"
}
```

### POST `/users/login`

Authenticates user with email and password, returns JWT and sets a cookie `token`.

Request Body:
```
{ "email": "john.doe@example.com", "password": "yourpassword" }
```

Success 200/201:
```
{ "success": true, "message": "User Logged In", "existingUser": {"_id": "<user_id>"}, "token": "<jwt_token>" }
```

Auth Error 401:
```
{ "success": false, "message": "Invalid email or password" }
```

### GET `/users/profile`

Protected by `authUser`. Returns the authenticated user profile.

Success 200:
```
{ ...user }
```

### GET `/users/logout`

Protected by `authUser`. Clears cookie, blacklists token.

Success 200:
```
{ "success": true, "message": "User Logged Out" }
```

---

## Captains

### POST `/captains/register`

Registers a new captain with vehicle details, returns a JWT token.

Request Body:
```
{
  "fullname": { "firstname": "Alex", "lastname": "Rider" },
  "email": "alex.rider@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Black",
    "plate": "AB-1234",
    "vehicleType": "four wheeler",
    "capacity": 4
  }
}
```
- `fullname.firstname` (string, required, min 3 chars)
- `email` (string, required, valid email)
- `password` (string, required, min 6 chars)
- `vehicle.color` (string, required, min 3 chars)
- `vehicle.plate` (string, required, min 3 chars)
- `vehicle.vehicleType` (string, required, min 3 chars; enum: two wheeler | four wheeler)
- `vehicle.capacity` (number, required, min 1)

Success 201:
```
{
  "success": true,
  "message": "User registered successfully",
  "user": { "_id": "<captain_id>", "email": "alex.rider@example.com" },
  "token": "<jwt_token>"
}
```

### POST `/captains/login`

Authenticates captain, returns JWT and sets a cookie `token`.

Request Body:
```
{ "email": "alex.rider@example.com", "password": "yourpassword" }
```

Success 200/201:
```
{ "success": true, "message": "Captain Logged In", "existingCaptain": {"_id": "<captain_id>"}, "token": "<jwt_token>" }
```

Auth Error 401:
```
{ "success": false, "message": "Invalid email or password" }
```

### GET `/captains/profile`

Protected by `authCaptain`. Returns the authenticated captain profile.

Success 200:
```
{ ...captain }
```

### GET `/captains/logout`

Protected by `authCaptain`. Clears cookie, blacklists token.

Success 200:
```
{ "success": true, "message": "Captain Logged Out" }
```

---

## Auth Notes

- Both `authUser` and `authCaptain` accept JWT from cookie `token` or `Authorization: Bearer <token>` header.
- Blacklisted tokens (stored in `blacklistToken` collection) are rejected.
- JWT secret: `process.env.JWT_SECRET`.
- Tokens currently expire in 24h.

