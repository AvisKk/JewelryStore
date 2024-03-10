import { useState } from 'react'
import style from '../filterItem.module.css'
import style2 from './price.module.css'


function PricesList(props) {

    const [minimalPrice, setMinimalPrice] = useState(props.prices[0])
    const [maximumPrice, setMaximumPrice] = useState(props.prices[props.prices.length - 1])

    const pricesArray = props.prices

    ///Проверка введённой в поиск цены
    const searchByPrices = (min, max) => {
        let minimalPrice = minPrice(min)
        let maximumPrice = maxPrice(max)

        if (!minimalPrice || minimalPrice < pricesArray[0]) {
            minimalPrice = pricesArray[0]
        }
        if (!maximumPrice || maximumPrice > pricesArray[pricesArray.length - 1]) {
            maximumPrice = pricesArray[pricesArray.length - 1]
        }
        if (minimalPrice > maximumPrice) {
            minimalPrice = maximumPrice
        }
        const indexOfMinimalPrice = pricesArray.indexOf(minimalPrice)
        const indexOfMaximumPrice = pricesArray.indexOf(maximumPrice)

        getFilteredByPriceGoods(indexOfMinimalPrice, indexOfMaximumPrice)
    }

    ///Функция для поиска ближайшей цены из существующих в массиве
    const nearestPrice = (target, arr) => {
        let nearest = arr.reduce((a, b) => Math.abs(b - target) <= Math.abs(a - target) ? b : a)
        return nearest
    }

    ///Проверка ближайшего минимального значения
    const minPrice = (min) => {
        let nearestMinPrice = nearestPrice(min, pricesArray)

        ///Если ближайшее минимальное меньше целевого
        if (nearestMinPrice < min) {
            let indexOfNearest = pricesArray.indexOf(nearestMinPrice)
            nearestMinPrice = pricesArray[indexOfNearest + 1]
        }
        return nearestMinPrice
    }

    ///Проверка ближайшего максимального значения
    const maxPrice = (max) => {
        let nearestMaxPrice = nearestPrice(max, pricesArray)

        ///Если ближайшее максимальное больше целевого
        if (nearestMaxPrice > max) {
            let indexOfNearest = pricesArray.indexOf(nearestMaxPrice)
            nearestMaxPrice = pricesArray[indexOfNearest - 1]
        }
        return nearestMaxPrice
    }

    let page = props.currentPage

    ///Запрос товаров по критериям цены
    const getFilteredByPriceGoods = (min, max) => {
        let slicedArray = pricesArray.slice(min, max)
        props.getItems(slicedArray, page)

        ///Изменение заголовка
        props.updateTitle('price ' + minimalPrice + ' - ' + maximumPrice)
    }

    return <button disabled={props.isFetching} className={style.filterButton}>Price
            <div className={style.dropdown}>
                <div>Minimal price:</div>
                <div> <input disabled={props.isFetching} id='min' onChange={e => setMinimalPrice(e.target.value)}></input></div>
                <div>Maximum price:</div>
                <div> <input disabled={props.isFetching} id='max' onChange={e => setMaximumPrice(e.target.value)}></input></div>
                <div className={style2.search} disabled={props.isFetching}
                onClick={() => searchByPrices(minimalPrice, maximumPrice)}>Search</div>
            </div>
    </button>
}

export default PricesList