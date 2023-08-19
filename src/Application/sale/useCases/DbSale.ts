import { SaleDto } from "@/Domain/sale/dto/saleDto";
import { Sale, calculatedProduct, createdSale } from "@/Domain/sale/useCases/Sale";
import { CooperatedRepository } from "@/Domain/repositories/cooperated/CooperatedRepository";
import { ProductRepository } from "@/Domain/repositories/product/ProductRepository";
import { TaxRepository } from "@/Domain/repositories/tax/TaxRepository";
import { CategoryRepository } from "@/Domain/repositories/category/CategoryRepository";
import { dateDiffHelper } from "@/Application/helpers/DateDiffHelper";
import { SaleRepository } from "@/Domain/repositories/sale/saleRepository";
import { ProductSaleRepository } from "@/Domain/repositories/productSale/ProductSaleRepository";

export interface productData {
    id: number,
    value: number,
    tax: string,
    quantity: number
}

export class DbSale implements Sale {

    constructor(
        private readonly cooperatedRepository: CooperatedRepository,
        private readonly productRepository: ProductRepository,
        private readonly taxRepository: TaxRepository,
        private readonly categoryRepository: CategoryRepository,
        private readonly saleRepository: SaleRepository,
        private readonly productSaleRepository: ProductSaleRepository
    ) { }

    async create(data: SaleDto): Promise<createdSale> {

        let products: Array<productData> = []
        let calculatedProducts: Array<calculatedProduct> = []
        let groupDiscount: Array<number> = []
        let totalSale: number = 0

        const cooperated = (!data.cooperated.id) ?
            await this.cooperatedRepository.create(data.cooperated) :
            await this.cooperatedRepository.check(data.cooperated)

        for await (const product of data.products) {
            const { group, value } = await this.productRepository.check(product.id)
            const tax = await this.taxRepository.check({
                product_purpose: product.productPurpose,
                consumption_state: data.consumptionState,
                product_group: group,
                sale_unit: data.saleUnit,
                type_person: cooperated.typePerson
            })
            const total = (value * product.quantity) + ((value * product.quantity) * (tax / 100))

            products.push({ id: product.id, value: total, tax: `${tax}%`, quantity: product.quantity })

            if (groupDiscount.indexOf(group) == -1)
                groupDiscount.push(group)

            totalSale += total
        }

        totalSale = totalSale - (totalSale * (((groupDiscount.length > 5) ? 5 : groupDiscount.length) / 100))

        if (data.paymentType == "aVista") {
            totalSale = totalSale - (totalSale * (await this.categoryRepository.check(cooperated.category) / 100))
        } else {
            totalSale = totalSale + parseFloat((totalSale * (((1 + (0.05 / 100)) ** dateDiffHelper(data.buyDate, data.dueDate)) - 1)).toFixed(2))
        }

        const sale = await this.saleRepository.create({
            cooperated: cooperated.id,
            unit: data.saleUnit,
            total: totalSale
        })

        for await (const product of products) {
            await this.productSaleRepository.create({
                icms: product.tax,
                product: product.id,
                quantity: product.quantity,
                sale: sale,
                total: product.id
            })
            calculatedProducts.push({ produto: product.id, valorTotal: product.value })
        }

        return {
            status: "venda gerada",
            totalVenda: parseFloat(totalSale.toFixed(2)),
            produtos: calculatedProducts
        }
    }
}