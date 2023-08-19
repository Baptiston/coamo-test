import { DbSale } from "@/Application/sale/useCases/DbSale"
import { Sale } from "@/Domain/sale/useCases/Sale"
import { CategoryRepository } from "@/Infrastructure/repositories/category/CategoryRepository"
import { CooperatedRepository } from "@/Infrastructure/repositories/cooperated/cooperatedRepository"
import { ProductRepository } from "@/Infrastructure/repositories/product/ProductRepository"
import { ProductSaleRepository } from "@/Infrastructure/repositories/productSale/ProductSaleRepository"
import { SaleRepository } from "@/Infrastructure/repositories/sale/SaleRepository"
import { TaxRepository } from "@/Infrastructure/repositories/tax/TaxRepository"

export const SalesFactory = (): Sale => {
    return new DbSale(new CooperatedRepository(),
        new ProductRepository(),
        new TaxRepository(),
        new CategoryRepository(),
        new SaleRepository(),
        new ProductSaleRepository())
}