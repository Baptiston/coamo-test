import { salesController } from "@/Presentation/api/controllers/sales/SalesController"
import { Controller } from "@/Presentation/api/protocols/Controller"
import { SalesFactory } from "../useCases/sales/SalesFactory"

export const SalesControllerFactory = (): Controller => {
    return new salesController(SalesFactory())
}