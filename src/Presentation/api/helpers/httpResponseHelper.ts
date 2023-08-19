import { CategoryNotFound, CooperatedNotFound, InvalidParamError, ProductNotFound, TaxNotFound, TimeoutConnectError } from "@/Domain/shared/errors";
import { badRequest, requestTimeout, serverError } from "@/Presentation/api/helpers/http-helper";
import { HttpResponse } from "@/Presentation/api/protocols/Http";

export function httpResponseHelper(error: Error): HttpResponse {
    switch (error.constructor) {
        case InvalidParamError:
            return badRequest(error)
        case CategoryNotFound:
            return badRequest(error)
        case CooperatedNotFound:
            return badRequest(error)
        case ProductNotFound:
            return badRequest(error)
        case TaxNotFound:
            return badRequest(error)
        case TimeoutConnectError:
            return requestTimeout(error)
        default:
            return serverError(error)
    }
}