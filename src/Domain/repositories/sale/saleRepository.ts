export interface saleData {
    cooperated: number,
    unit: number,
    total: number
}

export interface SaleRepository {
    create: (data: saleData) => Promise<number>
}