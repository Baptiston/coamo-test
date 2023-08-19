import { ProductSaleData, ProductSaleRepository as ProductSale } from "@/Domain/repositories/productSale/ProductSaleRepository";
import { knexInstance } from "../knexInstance";

const KnexInstance = knexInstance();

export class ProductSaleRepository implements ProductSale {

    private readonly table = 'product_sale'
    private readonly schema = 'public'

    async create(data: ProductSaleData): Promise<void> {
        await KnexInstance(this.table)
            .withSchema(this.schema)
            .insert(
                data
            ).returning('id')
    }

}