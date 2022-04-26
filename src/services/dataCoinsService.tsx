import { currencySymbol, DataCoins } from "../models/dataCoinsModel"
import { flags } from "./flags"
import { symbols } from "./symbols"
import currency from "currency.js"
import { nameCurrency } from "./nameCurrency"

class ServiceDataCoins {
  urlAPI = 'https://economia.awesomeapi.com.br/'
  allCurrency = ["BRL", "USD", "CAD", "EUR", "CNY", "JPY", "GBP", "AUD", "ARS", "BTC", "XPF", "INR", "CHF"]

  constructor() { }

  async getComparison(codein: string, valueCodein: number) {
    let returnState: Array<DataCoins> = []
    let currencyCodein: number = valueCodein

    const currencys = 'USD-BRL,USD-CAD,USD-EUR,USD-CNY,USD-JPY,USD-GBP,USD-AUD,USD-ARS,USD-INR,USD-CHF'

    let dataApi = await fetch(`${this.urlAPI}last/${currencys}`, {
      method: 'GET'
    }).then((response) => response.json())

    if (codein != "USD") {
      let dataApi = await fetch(`${this.urlAPI}last/USD-${codein}`, {
        method: 'GET'
      }).then((response) => response.json())
 
      Object.keys(dataApi).forEach(key => {
        currencyCodein = dataApi[key].ask
      })
    }

    Object.keys(dataApi).forEach(key => {

      returnState.push({
        image: flags[dataApi[key].codein as keyof currencySymbol],
        symbol: symbols[dataApi[key].codein as keyof currencySymbol],
        code: codein,
        codein: dataApi[key].codein,
        name: nameCurrency[dataApi[key].codein as keyof currencySymbol],
        high: dataApi[key].codein == codein
          ? currency(valueCodein)
          : codein == "USD"
            ? currency(((dataApi[key].ask) * valueCodein).toFixed(2))
            : currency(((dataApi[key].ask / currencyCodein) * valueCodein).toFixed(2)),
        selected: dataApi[key].codein == codein ? true : false,
        isShow: false
      })
    })

    returnState.unshift({
      image: flags["USD"],
      symbol: symbols["USD"],
      code: "USD",
      codein: "USD",
      name: nameCurrency['USD'],
      high: codein == "USD"
        ? currency(currencyCodein)
        : (valueCodein / currencyCodein).toFixed(2),
      selected: codein == "USD"
        ? true
        : false,
      isShow: false
    })


    returnState.sort((a, b) => {
      return a.codein < b.codein ? -1 : a.codein > b.codein ? 1 : 0;
    })
    return returnState
  }


  buildCurrencys(code: string, state: DataCoins[]) {
    let stateKeys: string = ''
    if (code != 'USD') {
      stateKeys = `USD-${code},`
    }
    state.forEach(coin => {
      if (code != coin.codein && coin.codein != 'USD') {
        stateKeys += `USD-${coin.codein},`
      }
    })

    stateKeys = stateKeys.slice(0, -1)
    return stateKeys
  }

}

export const serviceDataCoins = new ServiceDataCoins()
