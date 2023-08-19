import { TaxRepository as Tax, TaxData } from "@/Domain/repositories/tax/TaxRepository";
import { knexInstance } from "../knexInstance";
import { TaxNotFound } from "@/Domain/shared/errors";

const KnexInstance = knexInstance();

export class TaxRepository implements Tax {

    private readonly table = 'tax'
    private readonly schema = 'public'

    async check(data: TaxData): Promise<number> {

        const result = await KnexInstance(this.table)
            .withSchema(this.schema)
            .where('product_purpose', data.product_purpose)
            .where('consumption_state', data.consumption_state)
            .where('sale_unit', data.sale_unit)
            .where('product_group', data.product_group)
            .where('type_person', data.type_person)
            .select('*')
            .first()

        if (!result)
            throw new TaxNotFound('Não é possivel dar sequencia na venda pois não existe uma taxa tributária criada para este cenário')

        return result.total
    }

}