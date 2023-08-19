import { CooperatedDto } from "../../sale/dto/cooperatedDto"

export interface CooperatedRepository {
    check: (data: CooperatedDto) => Promise<CooperatedDto>
    create: (data: CooperatedDto) => Promise<CooperatedDto>
}