export class CategoryNotFound extends Error {
    constructor(message: string) {
        super(`CategoryNotFound - ${message}`)
        this.name = 'CategoryNotFound'
    }
}
