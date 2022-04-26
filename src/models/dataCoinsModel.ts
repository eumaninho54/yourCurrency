
import currency from "currency.js"
export interface DataCoins {
    image: string
    symbol: string
    code: string
    codein: string
    name: string
    high: number | string | currency
    selected: boolean
    isShow: boolean
}

export interface currencySymbol {
    BRL: string
    USD: string
    CAD: string
    EUR: string
    CNY: string
    JPY: string
    GBP: string
    AUD: string
    ARS: string
    INR: string
    CHF: string
}

export interface alphabetList {
    value: string
    key: string
    image: string
    name: string
}
