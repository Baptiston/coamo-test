export class ProductNotFound extends Error {
    constructor(message: string) {
        super(`ProductNotFound - ${message}`)
        this.name = 'ProductNotFound'
    }
}
