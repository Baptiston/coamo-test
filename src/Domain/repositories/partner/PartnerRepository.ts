export interface partnerData {
    cpf: string,
    name: string,
    rg: string,
    cooperated: number
}

export interface PartnerRepository {
    create: (data: partnerData) => Promise<void>
}