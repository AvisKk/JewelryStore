import style from "../filterItem.module.css"
import style2 from "./brandList.module.css"

function BrandsList(props) {

    ///Фильтрация по бренду
    const getBrands = async (brandName) => {
        props.getBrandItems(brandName)

        ///Изменение заголовка
        props.updateTitle(brandName.brand)
    }

    ///Показать все товары
    const showAll = async () => {
        props.allGoods()

        ///Очистка заголовка
        props.updateTitle()
    }

    ///Показать товары без бренда
    const showWithoutBrand = async () => {
        props.allGoods(null)

        ///Изменение заголовка
        props.updateTitle('Without brand')
    }

    return <div>
        <button disabled={props.isFetching} className={style.filterButton}>
            Brands
            <div className={style.dropdown}>
                <div disabled={props.isFetching} className={style2.item}
                    onClick={() => showAll()}>Show all</div>
                <div disabled={props.isFetching} className={style2.item}
                    onClick={() => showWithoutBrand()}>None</div>
                {
                    props.brands.map(u => <div disabled={props.isFetching} key={u}
                        className={style2.item} onClick={() => getBrands({ brand: u })}>
                        {u}
                    </div>)

                }
            </div>
        </button>
    </div>
}

export default BrandsList