import { SaleDto } from "../dto/saleDto"

export interface calculatedProduct {
    produto: number,
    valorTotal: number
}

export interface createdSale {
    status: string,
    totalVenda: number,
    produtos: Array<calculatedProduct>
}

export interface Sale {
    create: (data: SaleDto) => Promise<createdSale>
}
