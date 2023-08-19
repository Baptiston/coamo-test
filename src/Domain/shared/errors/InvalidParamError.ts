export class InvalidParamError extends Error {
    constructor (message: string) {
        super(`InvalidParamError - ${message}`)
        this.name = 'InvalidParamError'
    }
}
  