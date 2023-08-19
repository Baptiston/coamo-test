import { ProductRepository as Product, ProductData } from "@/Domain/repositories/product/ProductRepository";
import { knexInstance } from "../knexInstance";
import { ProductNotFound } from "@/Domain/shared/errors/ProductNotFound";

const KnexInstance = knexInstance();

export class ProductRepository implements Product {

    private readonly table = 'product'
    private readonly schema = 'public'

    async check(id: number): Promise<ProductData> {

        const result = await KnexInstance(this.table)
            .withSchema(this.schema)
            .where('id', id)
            .select('*')
            .first()

        if (!result)
            throw new ProductNotFound('Não foi encontrado registro do cooperado informado')

        return {
            group: result.group,
            value: result.unitary_value
        }
    }

}