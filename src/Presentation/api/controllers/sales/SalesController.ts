import { httpResponseHelper } from '../../helpers/httpResponseHelper';
import { Controller } from '../../protocols/Controller';
import { HttpRequest, HttpResponse } from '../../protocols/Http';
import { created } from '../../helpers/http-helper';
import { Sale } from '@/Domain/sale/useCases/Sale';
import { SaleDto } from '@/Domain/sale/dto/saleDto';
import { ProductDto } from '@/Domain/sale/dto/productDto';
import { CooperatedDto } from '@/Domain/sale/dto/cooperatedDto';

export class salesController implements Controller {
    constructor(private readonly sales: Sale) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const body = httpRequest.body
            let products: Array<ProductDto> = []

            for await (const product of body.products) {
                products.push(ProductDto.create({
                    id: product.id,
                    productPurpose: product.productPurpose,
                    quantity: product.quantity
                }))
            }

            const cooperated = CooperatedDto.create({
                id: body.cooperated.id,
                birthDate: body.cooperated.birthDate,
                category: body.cooperated.category,
                cpfCnpj: body.cooperated.cpfCnpj,
                maritalStatus: body.cooperated.maritalStatus,
                name: body.cooperated.name,
                openingDate: body.cooperated.openingDate,
                partners: body.cooperated.partners,
                rg: body.cooperated.rg,
                typePerson: body.cooperated.typePerson,
            })

            return created(await this.sales.create(SaleDto.create({
                buyDate: body.buyDate,
                dueDate: body.dueDate,
                consumptionState: body.consumptionState,
                cooperated: cooperated,
                paymentType: body.paymentType,
                products: products,
                saleUnit: body.saleUnit
            })))
        } catch (error) {
            return httpResponseHelper(error);
        }
    }
}
