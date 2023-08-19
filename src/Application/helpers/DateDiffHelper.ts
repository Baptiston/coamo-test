export function dateDiffHelper(initialDate: Date, finalDate: Date) {
    const diffTime = Math.abs(initialDate.getTime() - finalDate.getTime())
    return Math.ceil(diffTime / (1000 * 3600 * 24))
}