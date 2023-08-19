export class ServerError extends Error {
    constructor (stack?: string) {
        super(`Internal server error - ${stack}`)
        this.name = 'ServerError'
        this.stack = stack
    }
}
