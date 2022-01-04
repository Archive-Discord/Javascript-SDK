export interface server {
    servers: string
}

export interface serverReturn {
    code: boolean
    data: string
}

export interface ClientOptions {
    clientID: string
    token: string
}