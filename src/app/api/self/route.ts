import DatabaseHandler, { Database, JWTTokenPayload } from "@/db"
import { NextResponse } from "next/server"
import { headers } from "next/headers"

import jwt from "jsonwebtoken"

import db from "@/db.json"

export async function GET(request: Request) {
  // Should get headers from request and check if the token is valid
  // If it is, return the user data
  // If not catch the error and return 401
  const headerList = headers()
  const authHeader = headerList.get("Authorization")

  if (!authHeader) {
    return new NextResponse(
      JSON.stringify({
        message: "Missing token",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
  const token = authHeader.split(" ")[1]
  if (!token) {
    return new NextResponse(
      JSON.stringify({
        message: "Missing token",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
  // Should get the user data from the database
  const databaseHandler = DatabaseHandler.getInstance(db as unknown as Database)
  // Verify the token
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTTokenPayload

    const user = databaseHandler.findUserById(decodedToken.id)

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }

    return NextResponse.json({
      status: 200,
      body: {
        user,
      },
    })
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({
        status: 401,
        body: {
          message: "Token expired",
        },
      })
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({
        status: 401,
        body: {
          message: "Invalid token",
        },
      })
    }
  }
}
