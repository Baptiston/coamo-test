export class TaxNotFound extends Error {
    constructor(message: string) {
        super(`TaxNotFound - ${message}`)
        this.name = 'TaxNotFound'
    }
}
