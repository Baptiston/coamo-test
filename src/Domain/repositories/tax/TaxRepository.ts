export interface TaxData {
    product_purpose: string,
    sale_unit: number,
    consumption_state: number,
    product_group: number,
    type_person: number
}

export interface TaxRepository {
    check: (data: TaxData) => Promise<number>
}