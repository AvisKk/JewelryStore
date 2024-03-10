import axios from "axios"
import md5 from "md5"

///Определение таймштампа
const now = new Date()
let month = String(now.getUTCMonth() + 1)
if (month < 10) {
    month = "0" + month
}
let date = String(now.getUTCDate())
if (date < 10) {
    date = "0" + date
}
const timestamp = String(now.getUTCFullYear()) + month + date

///Шифрование пароля
const hash = md5(`Valantis_${timestamp}`)

///Общая составляющая запросов к API
export const instance = axios.create({

    ///cors anywhere необходим для http запроса с https домена
    baseURL: "https://cors-anywhere.herokuapp.com/http://api.valantis.store:40000/",
    headers: {"X-Auth": hash}
})