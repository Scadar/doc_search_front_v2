export type ApiResponse = {
    data: string
    success: boolean
    timestamp: Date
}

export type ApiError = {
    data: {
        cause: string
        data: string
        success: boolean
        timestamp: Date
    }
    status: number
}