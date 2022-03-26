import { currencySymbol, DataCoins } from "../models/dataCoinsModel"
import { flags } from "./flags"
import { symbols } from "./symbols"

class ServiceDataCoins {
  urlAPI = 'https://economia.awesomeapi.com.br/'
  allCurrency = ["BRL", "USD", "CAD", "EUR", "CNY", "JPY", "GBP", "AUD", "ARS", "BTC", "XPF", "INR", "CHF"]



  constructor() { }

  async getComparison(currencys: string, codein:string, valueCodein: number) {
    let returnState: Array<any> = []
    let nameIcon: string = ""

    let dataApi = await fetch(`${this.urlAPI}last/${currencys}`, {
      method: 'GET'
    }).then((response) => response.json())
    if (dataApi['status'] == 404) {
      return undefined
    }
 

    Object.keys(dataApi).forEach(key => {
      nameIcon = dataApi[key].name.split('/', 1) + '/' + dataApi[key].name.split('/', 1)
      console.tron.log!(nameIcon)

      returnState.push({
        image: flags[dataApi[key].codein as keyof currencySymbol],
        symbol: symbols[dataApi[key].codein as keyof currencySymbol],
        code: dataApi[key].code,
        codein: dataApi[key].codein,
        name: dataApi[key].name,
        high: dataApi[key].high * valueCodein
      })
    })
    returnState.unshift({
      image: flags[codein as keyof currencySymbol],
      symbol: symbols[codein as keyof currencySymbol],
      code: 'BRL',
      codein: codein,
      name: nameIcon,
      high: valueCodein
    })
    return returnState
  }

  async TESTgetComparison(currency: string) {
    let dataApi = await fetch(`${this.urlAPI}last/${currency}`, {
      method: 'GET'
    }).then((response) => response.json())
    if (dataApi['status'] != 404) {
      return dataApi
    }
  }

  async getAll(allCurrency: string) {
    let dataApi = await fetch(`${this.urlAPI}last/`)
  }


}

export const serviceDataCoins = new ServiceDataCoins()
