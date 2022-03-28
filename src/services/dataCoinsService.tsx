import { currencySymbol, DataCoins } from "../models/dataCoinsModel"
import { flags } from "./flags"
import { symbols } from "./symbols"
import currency from "currency.js"

class ServiceDataCoins {
  urlAPI = 'https://economia.awesomeapi.com.br/'
  allCurrency = ["BRL", "USD", "CAD", "EUR", "CNY", "JPY", "GBP", "AUD", "ARS", "BTC", "XPF", "INR", "CHF"]

  constructor() { }

  async getComparison(currencys: string, codein: string, valueCodein: number) {
    let returnState: Array<any> = []
    let nameIcon: string = ""
    let currencyCodein: number = valueCodein
    
    let dataApi = await fetch(`${this.urlAPI}last/${currencys}`, {
      method: 'GET'
    }).then((response) => response.json())

    if (dataApi['status'] == 404) {
      return undefined
    }

    if(codein != "USD"){
      let dataApi = await fetch(`${this.urlAPI}last/USD-${codein}`, {
        method: 'GET'
      }).then((response) => response.json())
      if(dataApi['status'] == 404){
        return undefined
      }
      Object.keys(dataApi).forEach(key => {
        currencyCodein = dataApi[key].ask
      })
    }

    Object.keys(dataApi).forEach(key => {
      nameIcon = dataApi[key].name.split('/', 1) + '/' + dataApi[key].name.split('/', 1)

      returnState.push({
        image: flags[dataApi[key].codein as keyof currencySymbol],
        symbol: symbols[dataApi[key].codein as keyof currencySymbol],
        code: codein,
        codein: dataApi[key].codein,
        name: dataApi[key].name,
        high: dataApi[key].codein == codein
          ? currency(valueCodein)
          : codein == "USD"
            ? currency(((dataApi[key].ask) * valueCodein).toFixed(2))
            : currency(((dataApi[key].ask / currencyCodein) * valueCodein).toFixed(2)),
        selected: dataApi[key].codein == codein ? true : false
      })
    })

    returnState.unshift({
      image: flags["USD"],
      symbol: symbols["USD"],
      code: "USD",
      codein: "USD",
      name: nameIcon,
      high: codein == "USD"
        ? currencyCodein
        : (valueCodein / currencyCodein).toFixed(2),
      selected: codein == "USD"
        ? true
        : false
    })


    returnState.sort((a, b) => {
      return a.codein < b.codein ? -1 : a.codein > b.codein ? 1 : 0;
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
