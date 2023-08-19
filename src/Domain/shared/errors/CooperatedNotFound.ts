export class CooperatedNotFound extends Error {
    constructor(message: string) {
        super(`CooperatedNotFound - ${message}`)
        this.name = 'CooperatedNotFound'
    }
}
