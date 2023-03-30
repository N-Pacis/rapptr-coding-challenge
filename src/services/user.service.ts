import { PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { excludePassword } from "../middlewares/excludePassword.middleware";


dotenv.config();

export class UserService {
  private prisma = new PrismaClient();
  private secret:string = process.env.JWT_SECRET || "";

  async createUser(user: User): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const createdUser = await this.prisma.user.create({
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: hashedPassword,
      },
    });

    return createdUser;
  }

  generateToken(userId: number): string {
    const token = jwt.sign({ userId }, this.secret, { expiresIn: "5h" });
    return token;
  }

  async saveUser(user: User): Promise<string> {
    
    const createdUser = await this.createUser(user);
    const token = this.generateToken(createdUser.id);
    return token;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return null;
    }

    const token = this.generateToken(user.id);

    return token;
  }

  async getUserProfile(userId: number): Promise<User | null> {
    console.log(userId)
    console.log("here")
    this.prisma.$use(excludePassword)

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { todos: true }, // Include todos relation in the result
    });
  
    return user;
  }

}
