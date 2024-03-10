import { instance } from "./instance";
import axiosRetry from "axios-retry";

axiosRetry( instance, { retries: 3,
  retryCondition: (_error) => true})

export const requestAPI = {

  ///Получение id товаров для основной страницы
  async getIds (limit = 50, offset = 0) {
    try {
      const response = await instance.post('',{"action": "get_ids","params": {"offset": offset, "limit": limit}})
      return response.data.result
    } catch (error) {
      console.log(error.config)
    }
  },

  ///Получение товаров для основной страницы по id
  async getItems (ids) {
    try {
      const response = await instance.post('', {"action": "get_items", "params": {"ids": 
      ids}})
      return response.data.result
    } catch (error) {
      console.log(error.config)
    }
  },
}