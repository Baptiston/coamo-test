export interface ProductData {
    value: number,
    group: number
}

export interface ProductRepository {
    check: (id: number) => Promise<ProductData>
}