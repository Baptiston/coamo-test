import { InvalidParamError } from "@/Domain/shared/errors"
import { PartnerDto } from "./PartnerDto";

interface CooperatedDtoCreationModel {
    id?: number,
    name?: string,
    cpfCnpj?: string,
    rg?: string,
    openingDate?: Date,
    typePerson?: number,
    birthDate?: Date,
    maritalStatus?: string,
    category?: number,
    partners?: PartnerDto[]
}

export class CooperatedDto {
    private constructor(
        readonly id: number,
        readonly name: string,
        readonly cpfCnpj: string,
        readonly rg: string,
        readonly openingDate: Date,
        readonly typePerson: number,
        readonly birthDate: Date,
        readonly maritalStatus: string,
        readonly category: number,
        readonly partners: PartnerDto[]
    ) { }

    static create(data: CooperatedDtoCreationModel): CooperatedDto {
        const {
            id,
            name,
            cpfCnpj,
            rg,
            openingDate,
            typePerson,
            birthDate,
            maritalStatus,
            category,
            partners
        } = data

        if (!id) {

            switch (typePerson) {
                case 1:
                    if (!rg)
                        throw new InvalidParamError("É necessário informar um rg válido");

                    if (!birthDate)
                        throw new InvalidParamError("É necessário informar uma data de nascimento válida");

                    if (!maritalStatus)
                        throw new InvalidParamError("É necessário informar um status civil válido");
                    break;
                case 2:
                    if (!openingDate)
                        throw new InvalidParamError("É necessário informar uma data de abertura válida");

                    if (!partners.length)
                        throw new InvalidParamError("É necessário informar ao menos um sócio");

                    break;
                default:
                    throw new InvalidParamError("É necessário informar um tipo pessoa válido");
            }

            if (!name)
                throw new InvalidParamError("É necessário informar um nome válido");

            if (!cpfCnpj)
                throw new InvalidParamError("É necessário informar um cpf/cnpj válido");

            if (!category)
                throw new InvalidParamError("É necessário informar uma categoria válida");
        }

        return new CooperatedDto(
            id,
            name,
            cpfCnpj,
            rg,
            openingDate,
            typePerson,
            birthDate,
            maritalStatus,
            category,
            partners
        )
    }
}
