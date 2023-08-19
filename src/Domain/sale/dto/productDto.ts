import { InvalidParamError } from "@/Domain/shared/errors"

interface ProductDtoCreationModel {
    id: number,
    productPurpose: string,
    quantity: number
}

export class ProductDto {
    private constructor(
        readonly id: number,
        readonly productPurpose: string,
        readonly quantity: number
    ) { }

    static create(data: ProductDtoCreationModel): ProductDto {
        const {
            id,
            productPurpose,
            quantity
        } = data

        if (!id)
            throw new InvalidParamError("É necessário informar um produto valido")

        if (!productPurpose)
            throw new InvalidParamError("É necessário informar uma finalidade do produto valida")

        if (!quantity)
            throw new InvalidParamError("É necessário informar uma quantidade do produto valida")

        return new ProductDto(
            id,
            productPurpose,
            quantity
        )
    }
}
