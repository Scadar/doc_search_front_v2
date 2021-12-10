export interface IUser {
    uuid: string
    roles: string[]
    email: string
    username: string
    status: "ACTIVE" | "LOCKED" | "EXPIRED"
    firstName: string | null
    lastName: string | null
}

export interface ILoginResponse {
    accessToken: string
    expiryDuration: number
    refreshToken: string
    type: string
}
