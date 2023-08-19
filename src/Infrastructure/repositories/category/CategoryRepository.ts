import { CategoryRepository as Category } from "@/Domain/repositories/category/CategoryRepository";
import { knexInstance } from "../knexInstance";
import { CategoryNotFound } from "@/Domain/shared/errors";

const KnexInstance = knexInstance();

export class CategoryRepository implements Category {
    private readonly table = 'category'
    private readonly schema = 'public'

    async check(id: number): Promise<number> {

        const result = await KnexInstance(this.table)
            .withSchema(this.schema)
            .where('id', id)
            .select('*')
            .first()

        if (!result)
            throw new CategoryNotFound('Não foi encontrado registro da categoria informada')

        return result.percentage
    }
}