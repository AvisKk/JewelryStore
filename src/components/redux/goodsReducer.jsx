import { requestAPI } from "../API/requestAPI";
import { filterPageChange, isFilteered, updateFilteredGoods } from "./filterReducer";

const UPDATE_GOODS = "UPDATE_GOODS"
const IS_FETCHING = "IS_FETCHING"
const CHANGE_PAGE = "CHANGE_PAGE"

let initialState = {
    goods: [
    ],
    isFetching: true,
    currentPage: 1
}

const goodsReducer = (state = initialState, action) => {

    switch (action.type) {
        case (UPDATE_GOODS): {
            return {
                ...state,
                goods: action.goods
            }
        };
        case (IS_FETCHING): {
            return {
                ...state, isFetching: action.isFetching
            }
        };
        case (CHANGE_PAGE): {
            return {
                ...state, currentPage: action.currentPage
            }
        };
        default:
            return state
    }
}

export const updateGoods = (goods) => ({ type: UPDATE_GOODS, goods })
export const fetching = (isFetching) => ({ type: IS_FETCHING, isFetching })
export const pageChange = (currentPage) => ({ type: CHANGE_PAGE, currentPage })

///Получение товаров на странице

export const getUniqueGoods = (offset) => async (dispatch) => {
    dispatch(isFilteered(false))
    dispatch(filterPageChange(1))
    let uniqueIds = []
    let ids = []
    let limit = 50
    let i = 0
    /// Получение и сортировка id на наличие повторения
    do {
        ids = await requestAPI.getIds(limit, offset)
        if (!ids) { continue }
        let newSet = new Set(ids)
        uniqueIds = Array.from(newSet)
        limit = 50 + (50 - uniqueIds.length)
        i++
    } while (uniqueIds.length < 50 || i < 2)
    dispatch(getUpdateGoods(uniqueIds))
}

/// Запрос товаров с сервера
export const getUpdateGoods = (data) => async (dispatch) => {
    dispatch(fetching(true))
    let response = await requestAPI.getItems(data)

    ///Сортировка товаров на наличие повторов
    let uniqueGoods = response.reduce((a, c) => (a.map(e => e.id).includes(c.id) || a.push(c), a), [])
    dispatch(updateGoods(uniqueGoods))
    dispatch(fetching(false))
}

///Обновление товаров при переходе на другую страницу
export const getChangedPage = (currentPage, filtered, filteredIds) => async (dispatch) => {

    if (!filtered) {

        ///Переключение страницы с неотфильтрованными товарами

        dispatch(fetching(true))
        let offset = (currentPage - 1) * 50
        dispatch(pageChange(currentPage))
        dispatch(getUniqueGoods(offset))
        dispatch(fetching(false))
    } else {

        ///Переключение страницы с отфильтрованными товарами

        dispatch(filterPageChange(currentPage))
        dispatch(updateFilteredGoods(filteredIds, currentPage))
    }


}

export default goodsReducer