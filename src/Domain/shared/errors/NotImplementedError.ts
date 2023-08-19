export class NotImplementedError extends Error {
    constructor (stack?: string) {
        super('Not Implemented - ' + stack)
        this.name = 'NotImplementedError'
        this.stack = stack
    }
}
