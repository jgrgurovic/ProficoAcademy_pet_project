import { User } from "./db"

interface MyApi {
  login: (params: {
    email: string
    password: string
  }) => Promise<{ token: string }>
  self: (token: string) => Promise<{ user: User }>
}

export default class Api implements MyApi {
  private constructor() {}
  private static _instance: Api | null = null

  public static get getInstance(): Api {
    if (!this._instance) {
      this._instance = new Api()
    }
    return this._instance
  }

  public async login(params: {
    email: string
    password: string
  }): Promise<{ token: string }> {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    const data = await response.json()

    return data
  }

  public async self(token: string): Promise<{ user: User }> {
    const response = await fetch("/api/self", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(`Bearer ${token}`)

    if (!response.ok) {
      throw new Error("Self failed")
    }

    const data = await response.json()

    return data.body
  }
}
