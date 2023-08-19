import { InvalidParamError } from "@/Domain/shared/errors"
import { CooperatedDto } from "./cooperatedDto"
import { ProductDto } from "./productDto"

export type paymentTypes = "prazo" | "aVista"

interface SaleDtoCreationModel {
    products: ProductDto[],
    cooperated: CooperatedDto,
    consumptionState: number,
    saleUnit: number,
    paymentType: paymentTypes,
    buyDate?: Date,
    dueDate?: Date
}

export class SaleDto {
    private constructor(
        readonly products: ProductDto[],
        readonly cooperated: CooperatedDto,
        readonly consumptionState: number,
        readonly saleUnit: number,
        readonly paymentType: paymentTypes,
        readonly buyDate: Date,
        readonly dueDate: Date
    ) { }

    static create(data: SaleDtoCreationModel): SaleDto {
        const {
            products,
            cooperated,
            consumptionState,
            saleUnit,
            paymentType,
            buyDate,
            dueDate
        } = data

        if (!products.length)
            throw new InvalidParamError("É necessário adicionar ao menos um produto a venda")

        if (!cooperated)
            throw new InvalidParamError("É necessário informar um cooperado valido")

        if (!consumptionState)
            throw new InvalidParamError("É necessário informar uma UF de consumo valida")

        if (!saleUnit)
            throw new InvalidParamError("É necessário informar uma unidade de venda valida")

        if (!paymentType)
            throw new InvalidParamError("É necessário informar um tipo de pagamento valido")

        if (paymentType == "prazo") {
            if (!buyDate)
                throw new InvalidParamError("É necessário informar uma data de compra valida")

            if (!dueDate)
                throw new InvalidParamError("É necessário informar uma data de vencimento valida")
        }

        return new SaleDto(
            products,
            cooperated,
            consumptionState,
            saleUnit,
            paymentType,
            new Date(buyDate),
            new Date(dueDate)
        )
    }
}
