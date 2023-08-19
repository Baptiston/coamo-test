import { CooperatedRepository as Cooperated } from "@/Domain/repositories/cooperated/CooperatedRepository";
import { CooperatedDto } from "@/Domain/sale/dto/cooperatedDto";
import { knexInstance } from "../knexInstance";
import { CooperatedNotFound } from "@/Domain/shared/errors/CooperatedNotFound";
import { PartnerRepository } from "@/Infrastructure/repositories/partner/PartnerRepository"

const KnexInstance = knexInstance();

export class CooperatedRepository implements Cooperated {
    private readonly table = 'cooperated'
    private readonly schema = 'public'

    async check(data: CooperatedDto): Promise<CooperatedDto> {

        const result = await KnexInstance(this.table)
            .withSchema(this.schema)
            .where('id', data.id)
            .select('*')
            .first()

        if (!result)
            throw new CooperatedNotFound('Não foi encontrado registro do cooperado informado')

        return CooperatedDto.create({
            name: result.name,
            birthDate: result.birth_date,
            cpfCnpj: result.cpf_cnpj,
            category: result.category,
            openingDate: result.opening_date,
            rg: result.rg,
            maritalStatus: result.marital_status,
            id: result.id,
            typePerson: result.type_person
        })
    }

    async create(data: CooperatedDto): Promise<CooperatedDto> {

        const result = await KnexInstance(this.table)
            .withSchema(this.schema)
            .insert({
                name: data.name,
                cpf_cnpj: data.cpfCnpj,
                rg: data.rg,
                opening_date: data.openingDate,
                type_person: data.typePerson,
                birth_date: data.birthDate,
                marital_status: data.maritalStatus,
                category: data.category
            }).returning('id');

        if (data.typePerson == 2) {
            const partnerRepository = new PartnerRepository()
            for await (const partner of data.partners) {
                await partnerRepository.create({
                    cooperated: result[0].id,
                    cpf: partner.cpf,
                    name: partner.name,
                    rg: partner.rg
                })
            }
        }

        return CooperatedDto.create({
            id: result[0].id,
            name: data.name,
            cpfCnpj: data.cpfCnpj,
            rg: data.rg,
            openingDate: data.openingDate,
            typePerson: data.typePerson,
            birthDate: data.birthDate,
            maritalStatus: data.maritalStatus,
            category: data.category
        })
    }
}