import { instance } from "./instance";
import axiosRetry from "axios-retry";

axiosRetry( instance, { retries: 3,
  retryCondition: (_error) => true})

export const filterAPI = {

  ///Получение полей товаров
    async getProductFields (field) {
      try {
        const response = await instance.post('', {"action": "get_fields", 
        "params": {"field": field}})
        return response.data.result
      } catch (error) {
        console.log(error)
      }
    },

  ///Получение отфильтрованных товаров  
    async getFiltredGoods ({brand = undefined, price = undefined, product = undefined}) {
      try {
        const response = await instance.post('', 
        {"action": "filter", "params": {"brand": brand, "price": price, "product": product}})
        return response.data.result
      } catch (error) {
        console.log(error)
      }
    },
}