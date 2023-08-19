import { PartnerRepository as Partner, partnerData } from "@/Domain/repositories/partner/PartnerRepository";
import { knexInstance } from "../knexInstance";

const KnexInstance = knexInstance();

export class PartnerRepository implements Partner {

    private readonly table = 'partner'
    private readonly schema = 'public'

    async create(data: partnerData): Promise<void> {
        await KnexInstance(this.table)
            .withSchema(this.schema)
            .insert(
                data
            ).returning('id')
    }

}