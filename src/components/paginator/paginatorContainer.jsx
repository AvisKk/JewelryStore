import { getChangedPage } from "../redux/goodsReducer"
import { connect } from "react-redux"
import style from './paginator.module.css'

function Paginator(props) {

    let page = 1

    ///Выбор переключаемой страницы: отфильтрованная или нет
    if (!props.filtered) {
        page = props.currentPage
    } else {
        page = props.filteredPage
    }

    ///Функции для изменения номера страницы
    let next = () => { props.getChangedPage(page + 1, props.filtered, props.filteredIds) }
    let back = () => { props.getChangedPage(page - 1, props.filtered, props.filteredIds) }
    let firstPage = () => { props.getChangedPage(1, props.filtered, props.filteredIds) }


    return <div className={style.paginator}>
        {page <= 1 ? '' :
            <span>
                <button disabled={props.isFetching} className={style.button} onClick={() => firstPage()}>First page</button>
                <button disabled={props.isFetching} className={style.button} onClick={() => back()}>Back</button>
            </span>
        }
        <span className={style.item}>{page}</span>
        { props.goods.length < 50 ? '' :
            <button disabled={props.isFetching} className={style.button} onClick={() => next()}>Next</button>
        }
    </div>
}

const mapStateToProps = (state) => ({
    currentPage: state.goodsPage.currentPage,
    isFetching: state.goodsPage.isFetching,
    goods: state.goodsPage.goods,
    filtered: state.fieldsPage.filtered,
    filteredPage: state.fieldsPage.filteredCurrentPage,
    filteredIds: state.fieldsPage.filteredGoodsIds
})

export default connect(mapStateToProps, { getChangedPage })(Paginator)