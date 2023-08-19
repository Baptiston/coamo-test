export class TimeoutConnectError extends Error {
    constructor (stack?: string) {
        super(`TimeoutConnectError - ${stack}`)
        this.name = 'TimeoutConnectError'
        this.stack = stack
    }
}
