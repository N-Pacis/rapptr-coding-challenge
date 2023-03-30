import { successResponse, serverErrorResponse, notFoundResponse } from "../utils/api.response";
import { Request, Response } from "express";
import { TodoService } from '../services/todo.service';
import { Todo } from "@prisma/client";

export class TodoController {
  private todoService = new TodoService();

  public async createTodo(req: any, res: Response) {
    try {
      const todo = req.body as Todo;
      const userId = req.user.id;
      const createdTodo = await this.todoService.createTodo(todo, userId);
      return successResponse("Todo created", createdTodo, res);
    } catch (error: any) {
      console.log(error)
      return serverErrorResponse(error, res);
    }
  }

  public async getTodo(req: any, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const todo = await this.todoService.getTodoById(id);
      if (!todo) {
        return notFoundResponse("id",id,"Todo", res);
      }
      return successResponse("Todo retrieved", todo, res);
    } catch (error: any) {
      return serverErrorResponse(error, res);
    }
  }

  public async updateTodo(req: any, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const todo = req.body as Todo;
      const updatedTodo = await this.todoService.updateTodo(id, todo.title,todo.description);
      if (!updatedTodo) {
        return notFoundResponse("id",id,"Todo", res);
      }
      return successResponse("Todo updated", updatedTodo, res);
    } catch (error: any) {
      return serverErrorResponse(error, res);
    }
  }

  public async deleteTodo(req: any, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deletedTodo = await this.todoService.deleteTodo(id);
      if (!deletedTodo) {
        return notFoundResponse("id",id,"Todo", res);
      }
      return successResponse("Todo deleted", deletedTodo, res);
    } catch (error: any) {
      return serverErrorResponse(error, res);
    }
  }

  public async getTodos(req: any, res: Response) {
    try {
      const todos = await this.todoService.getTodos();
      return successResponse("Todos retrieved", todos, res);
    } catch (error: any) {
      return serverErrorResponse(error, res);
    }
  }
}

