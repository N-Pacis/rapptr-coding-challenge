import { PrismaClient, Todo, User } from "@prisma/client";

export class TodoService {
  private prisma = new PrismaClient();

  async createTodo(todo: Todo,userId:number): Promise<Todo> {

    const createdTodo = await this.prisma.todo.create({
      data: {
        title: todo.title,
        description: todo.description,
        added_by: userId
      },
    });

    return createdTodo;
  }
  async getTodos(): Promise<Todo[] | null> {
    const todos = await this.prisma.todo.findMany({
      where: {
        deleted: false,
      },
    });
    return todos;
  }
  
  async getTodoById(todoId: number): Promise<Todo | null> {
    const todo = await this.prisma.todo.findFirst({
      where: {
        id: todoId,
        deleted: false,
      },
    });
    return todo;
  }

  async updateTodo(
    todoId: number,
    title: string,
    description: string,
  ): Promise<Todo | null> {
    const updatedTodo = await this.prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        title,
        description,
      },
    });
    return updatedTodo;
  }

  
  async deleteTodo(todoId: number): Promise<Todo | null> {
    const deletedTodo = await this.prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        deleted: true,
      },
    });
    return deletedTodo;
  }
  

}
