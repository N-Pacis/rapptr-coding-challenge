# Todo App

## Setting up the app:

1. Rename `.env.example` to `.env`
2. Add appropriate Postgres connection URL in the `.env` file

## Running the app:

1. Run `npm install`
2. Run `npx prisma migrate dev`
3. Run `npm run dev`

## APIs:

1. Register user: 

POST /users/register

Creates a new user with the given email and password.

Request Body:

{
"email": "user@example.com",
"password": "secret"
}

2. Login user:

POST /users/login

Logs in a user with the given email and password and returns a JWT token.

Request Body:

{
"email": "user@example.com",
"password": "secret"
}

3. Get user profile:

GET /users/profile

Returns the user's profile details.

Authorization Header:

Authorization: Bearer <token>

4. Create a new Todo:

POST /todos/create

Creates a new Todo item for the logged-in user.

Request Body:

{
"title": "Buy groceries",
"description": "Milk, bread, eggs"
}

Authorization Header:

Authorization: Bearer <token>

5. Update a Todo:

PUT /todos/:id/update

Updates a Todo item with the given ID for the logged-in user.

Request Body:

{
"title": "Buy groceries",
"description": "Milk, bread, eggs"
}

Authorization Header:

Authorization: Bearer <token>

6. Get a Todo:

GET /todos/:id

Returns the details of a Todo item with the given ID for the logged-in user.

Authorization Header:

Authorization: Bearer <token>

7. Get all Todos:

GET /todos

Returns a list of all Todo items for the logged-in user.

Authorization Header:

Authorization: Bearer <token>

8. Delete a Todo:

DELETE /todos/:id/delete

Deletes a Todo item with the given ID for the logged-in user.

Authorization Header:

Authorization: Bearer <token>