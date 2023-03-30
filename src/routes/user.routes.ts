import { authMiddleware } from './../middlewares/auth.middleware';
import express from "express"
import { UserController } from "../controllers/user.controller"

const router = express.Router()
const userController = new UserController();


router.post("/users/register",(req,res)=>{
    return userController.createUser(req,res)
})

router.post("/users/login",(req,res)=>{
    return userController.login(req,res)
})

router.get("/users/profile",authMiddleware,(req,res)=>{
    return userController.getProfile(req,res)
})

export default router