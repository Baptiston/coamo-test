export interface ProductSaleData {
    product: number,
    sale: number,
    total: number,
    icms: string,
    quantity: number
}

export interface ProductSaleRepository {
    create: (data: ProductSaleData) => Promise<void>
}