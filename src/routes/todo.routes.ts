import { TodoController } from './../controllers/todo.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import express from "express"

const router = express.Router()
const todoController = new TodoController();


router.post("/todos/create",authMiddleware, (req,res)=>{
    return todoController.createTodo(req,res)
})

router.put("/todos/:id/update",authMiddleware,(req,res)=>{
    return todoController.updateTodo(req,res)
})

router.get("/todos/:id",authMiddleware,(req,res)=>{
    return todoController.getTodo(req,res)
})

router.get("/todos",authMiddleware,(req,res)=>{
    return todoController.getTodos(req,res)
})

router.delete("/todos/:id/delete",authMiddleware,(req,res)=>{
    return todoController.deleteTodo(req,res)
})

export default router