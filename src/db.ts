export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

export type User = {
  id: number
  avatar: string
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  role: UserRoles
}

export type JWTTokenPayload = {
  id: number
  email: string
  role: UserRoles
}

export interface Database {
  users: User[]
}

interface UserRepo {
  findUserById(id: number): User | null
  findUserByEmailAndPassword(email: string, password: string): User | null
}

export default class DatabaseHandler implements UserRepo {
  private static instance: DatabaseHandler

  private constructor(private readonly databaseObject: Database) {}

  public static getInstance(databaseObject: Database): DatabaseHandler {
    if (!DatabaseHandler.instance) {
      DatabaseHandler.instance = new DatabaseHandler(databaseObject)
    }

    return DatabaseHandler.instance
  }

  public findUserById(id: number): User | null {
    return (
      this.databaseObject.users.find((user: User) => user.id === id) || null
    )
  }

  public findUserByEmailAndPassword(
    email: string,
    password: string
  ): User | null {
    return (
      this.databaseObject.users.find(
        (user: User) => user.email === email && user.password === password
      ) || null
    )
  }
}
