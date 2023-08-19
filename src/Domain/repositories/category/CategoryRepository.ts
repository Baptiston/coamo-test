export interface CategoryRepository {
    check: (id: number) => Promise<number>
}