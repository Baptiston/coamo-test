import { SaleRepository as Sale, saleData } from "@/Domain/repositories/sale/saleRepository";
import { knexInstance } from "../knexInstance";

const KnexInstance = knexInstance();

export class SaleRepository implements Sale {

    private readonly table = 'sale'
    private readonly schema = 'public'

    async create(data: saleData): Promise<number> {
        const result = await KnexInstance(this.table)
            .withSchema(this.schema)
            .insert({
                cooperated: data.cooperated,
                unit: data.unit,
                total: data.total
            }).returning('id')

        return result[0].id
    }
}