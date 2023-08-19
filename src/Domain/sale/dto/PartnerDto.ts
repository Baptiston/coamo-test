import { InvalidParamError } from "@/Domain/shared/errors"

interface PartnerDtoCreationModel {
    name: string,
    rg: string,
    cpf: string
}

export class PartnerDto {
    private constructor(
        readonly name: string,
        readonly rg: string,
        readonly cpf: string
    ) { }

    static create(data: PartnerDtoCreationModel): PartnerDto {
        const {
            name,
            rg,
            cpf
        } = data

        if (!name)
            throw new InvalidParamError("É necessário informar um nome válido");

        if (!cpf)
            throw new InvalidParamError("É necessário informar um cpf válido");

        if (!rg)
            throw new InvalidParamError("É necessário informar um rg válido");

        return new PartnerDto(
            name,
            rg,
            cpf
        )
    }
}
