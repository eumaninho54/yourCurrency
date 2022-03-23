class ServiceDataCoins {
  urlAPI = 'https://economia.awesomeapi.com.br/'

  constructor() { }

  async getComparison(currency: string) {
    let dataApi = await fetch(`${this.urlAPI}last/${currency}`, {
      method: 'GET'
    }).then((response) => response.json())
    if(dataApi['status'] != 404){
      return dataApi
    }
  }
  

}

export const serviceDataCoins = new ServiceDataCoins()
