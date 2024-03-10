import style from '../filterItem.module.css'
import style2 from '.././priceList/price.module.css'
import { useState } from 'react'

function ProductsList (props) {

    ///Получение товаров по названию
    const searchByName = (productName) => {
        props.getItems({product: productName})

        ///Изменение заголовка
        props.updateTitle(productName)
    }

    const [value, setValue] = useState()

    return <button disabled={props.isFetching} className={style.filterButton}>
        Products
        <div className={style.dropdown}>
            <div>Product name:</div>
            <div><input disabled={props.isFetching} id='productName' type='text' onChange={(e) => setValue(e.target.value)}></input></div>
            <div className={style2.search} disabled={props.isFetching} onClick={() => searchByName(value)}>Search</div>
        </div>
    </button>
}

export default ProductsList