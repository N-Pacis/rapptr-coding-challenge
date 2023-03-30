import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import userRoutes from "./routes/user.routes"
import todoRoutes from "./routes/todo.routes";

const app = express();


app.use(express.json())

app.use(userRoutes)
app.use(todoRoutes)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
