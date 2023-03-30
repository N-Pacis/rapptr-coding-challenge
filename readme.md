Rapptr Coding Challenge
========

This is a Node.js application built with Express.js and Prisma ORM. The app allows users to register, login, and create, update, delete and retrieve todos.

Setting up the app
------------------

1.  Rename `.env.example` to `.env`.
2.  Add appropriate postgres connection url to the `.env` file.

Running the app
---------------

1.  Run `npm install` to install dependencies.
2.  Run `npx prisma migrate dev` to run database migrations.
3.  Run `npm run dev` to start the development server.

APIs
----

### User APIs

#### Register User

To register a new user, send a POST request to `/users/register`. The request body should contain `name`, `email`, and `password` fields.

javascriptCopy code

`router.post("/users/register",(req,res)=>{
  return userController.createUser(req,res)
})`

#### Login User

To login a user, send a POST request to `/users/login`. The request body should contain `email` and `password` fields.

javascriptCopy code

`router.post("/users/login",(req,res)=>{
  return userController.login(req,res)
})`

#### Get User Profile

To get the user's profile, send a GET request to `/users/profile` with a valid `Authorization` header containing a JWT token.

javascriptCopy code

`router.get("/users/profile",authMiddleware,(req,res)=>{
  return userController.getProfile(req,res)
})`

### Todo APIs

#### Create Todo

To create a new todo, send a POST request to `/todos/create`. The request body should contain `title` and `description` fields.

javascriptCopy code

`router.post("/todos/create",authMiddleware, (req,res)=>{
  return todoController.createTodo(req,res)
})`

#### Update Todo

To update an existing todo, send a PUT request to `/todos/:id/update` with the todo ID as a URL parameter. The request body should contain `title` and `description` fields.

javascriptCopy code

`router.put("/todos/:id/update",authMiddleware,(req,res)=>{
  return todoController.updateTodo(req,res)
})`

#### Get Todo

To get a single todo, send a GET request to `/todos/:id` with the todo ID as a URL parameter.

javascriptCopy code

`router.get("/todos/:id",authMiddleware,(req,res)=>{
  return todoController.getTodo(req,res)
})`

#### Get All Todos

To get all todos, send a GET request to `/todos`.

javascriptCopy code

`router.get("/todos",authMiddleware,(req,res)=>{
  return todoController.getTodos(req,res)
})`

#### Delete Todo

To delete a todo, send a DELETE request to `/todos/:id/delete` with the todo ID as a URL parameter.

javascriptCopy code

`router.delete("/todos/:id/delete",authMiddleware,(req,res)=>{
  return todoController.deleteTodo(req,res)
})`
