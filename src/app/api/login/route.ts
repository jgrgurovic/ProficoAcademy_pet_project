import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

import db from "../../../db.json"
import DatabaseHandler, { Database } from "../../../db"

interface LoginRequestBody {
  email: string
  password: string
}

export async function POST(request: Request) {
  const databaseHandler = DatabaseHandler.getInstance(db as unknown as Database)

  const body: LoginRequestBody = await request.json()

  if (!body.email || !body.password) {
    return new NextResponse(
      JSON.stringify({
        message: "Missing email or password",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  const user = databaseHandler.findUserByEmailAndPassword(
    body.email,
    body.password
  )

  if (!user) {
    return new NextResponse(
      JSON.stringify({
        message: "Invalid email or password",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  return new NextResponse(
    JSON.stringify({
      token: jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        (process.env.JWT_SECRET as string) || "SECRET"
        ),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
      )
    }
    