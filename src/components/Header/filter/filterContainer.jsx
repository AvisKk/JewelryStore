import { connect } from "react-redux"
import {
    getUpdateBrands, getUpdateFilteredGoods, getUpdatePrices,
    getFilteredByPriceGoods, updateTitle
} from "../../redux/filterReducer"
import { getUniqueGoods } from "../../redux/goodsReducer"
import style from "./filter.module.css"
import { useEffect } from "react"
import BrandsList from "./filterItem/brandList/brandsList"
import ProductsList from "./filterItem/productList/productsList"
import PricesList from "./filterItem/priceList/pricesList"

function FilterContainer(props) {

    useEffect(() => {
        props.getUpdateBrands()
        props.getUpdatePrices()
    }, [])

    return <div className={style.filterMenu}>
        <div className={style.filterTitle}>
            {props.title ? 'Filtered by: ' + props.title : 'Filters:'}
        </div>
        <div className={style.filterWindow}>

            <span><BrandsList isFetching={props.isFetching} brands={props.brands} updateTitle={props.updateTitle}
                getBrandItems={props.getUpdateFilteredGoods} allGoods={props.getUniqueGoods} /></span>

            <span><ProductsList isFetching={props.isFetching} getItems={props.getUpdateFilteredGoods}
                updateTitle={props.updateTitle} /></span>

            <span><PricesList isFetching={props.isFetching} getItems={props.getFilteredByPriceGoods}
                prices={props.prices} currentPage={props.currentPage}
                updateTitle={props.updateTitle} /></span>

        </div>
    </div>
}

const mapStateToProps = (state) => ({
    fields: state.fieldsPage.fields,
    isFetching: state.goodsPage.isFetching,
    brands: state.fieldsPage.brands,
    prices: state.fieldsPage.prices,
    currentPage: state.fieldsPage.filteredCurrentPage,
    title: state.fieldsPage.title
})

export default connect(mapStateToProps, {
    getUpdateBrands, getUpdateFilteredGoods,
    getUniqueGoods, getUpdatePrices, getFilteredByPriceGoods, updateTitle
})(FilterContainer)