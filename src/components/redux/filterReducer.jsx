import { filterAPI } from "../API/filterAPI"
import { fetching, getUpdateGoods } from "./goodsReducer"

const GET_BRANDS = "GET_BRANDS"
const GET_PRICES = "GET_PRICES"
const IS_FETCHING = "IS_FETCHING"
const IS_FILTERED = "IS_FILTERED"
const CHANGE_FILT_PAGE = "CHANGE_FILT_PAGE"
const UPDATE_FILTERED_IDS = "UPDATE_FILTERED_IDS"
const UPDATE_TITLE = "UPDATE_TITLE"

let initialState = {
    brands: [],
    prices: [],
    filteredGoodsIds: [],
    isFetching: false,
    filtered: false,
    filteredCurrentPage: 1,
    title: null
}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case (GET_BRANDS): {
            return {
                ...state, brands: action.brands
            }
        };
        case (GET_PRICES): {
            return {
                ...state, prices: action.prices
            }
        };
        case (IS_FETCHING): {
            return {
                ...state, isFetching: action.isFetching
            }
        };
        case (IS_FILTERED): {
            return {
                ...state, filtered: action.filtered
            }
        };
        case (CHANGE_FILT_PAGE): {
            return {
                ...state, filteredCurrentPage: action.filteredCurrentPage
            }
        };
        case (UPDATE_FILTERED_IDS): {
            return {
                ...state, filteredGoodsIds: action.filteredGoodsIds
            }
        };
        case (UPDATE_TITLE): {
            return {
                ...state, title: action.title
            }
        }
        default: return state
    }
}

export const updateBrands = (brands) => ({ type: GET_BRANDS, brands })
export const updatePrices = (prices) => ({ type: GET_PRICES, prices })
export const fetchingFilter = (isFetching) => ({ type: IS_FETCHING, isFetching })
export const isFilteered = (filtered) => ({ type: IS_FILTERED, filtered })
export const filterPageChange = (filteredCurrentPage) => ({ type: CHANGE_FILT_PAGE, filteredCurrentPage })
export const updateFilteredIds = (filteredGoodsIds) => ({ type: UPDATE_FILTERED_IDS, filteredGoodsIds })
export const updateTitle = (title) => ({type: UPDATE_TITLE, title}) 

///Первичное обновление всех брендов

export const getUpdateBrands = () => async (dispatch) => {
    const productFields = await filterAPI.getProductFields('brand')
    let newSet = new Set(productFields)
    let uniqueFields = Array.from(newSet)
    dispatch(updateBrands(uniqueFields))
}
///Первичное обновление всех цен, необходимых для фильтрации

export const getUpdatePrices = () => async (dispatch) => {
    const prices = await filterAPI.getProductFields('price')
    let newSet = new Set(prices)
    let uniquePrices = Array.from(newSet)
    uniquePrices.sort(function (a, b) {
        return a - b;
    });
    dispatch(updatePrices(uniquePrices))
}

///Получение id товаров отфильтрованнных по бренду и добавление их в state

export const getUpdateFilteredGoods = (field) => async (dispatch) => {
    dispatch(isFilteered(true))
    const ids = await filterAPI.getFiltredGoods(field)
    dispatch(updateFilteredIds(ids))
    dispatch(updateFilteredGoods(ids))
}

///Получение id товаров отфильтрованных по цене и добавление их в state

export const getFilteredByPriceGoods = (prices) => async (dispatch) => {
    dispatch(isFilteered(true))
    let i = 0
    let ids = []
    ///Соединяем массивы id для всех цен, находящихся в заданном интервале

    while (i < prices.length) {

        ///Так как сервер требует полного соответствия цены, запрашиваем id для всех цен в заданном интервале

        const newIds = await filterAPI.getFiltredGoods({ price: prices[i] })
        ids = [...ids, ...newIds]
        i++
    }
    dispatch(updateFilteredIds(ids))
    dispatch(updateFilteredGoods(ids))
}

///Вывод отфильтрованных товаров в количестве 50 штук в зависимости от страницы
export const updateFilteredGoods = (ids, currentPage = 1) => async (dispatch) => {
    let start = (currentPage - 1) * 50
    let end = currentPage * 50
    let idsOnPage = ids
    if (idsOnPage.length) {
        idsOnPage = idsOnPage.slice(start, end)
    }
    dispatch(getUpdateGoods(idsOnPage))
}

export default filterReducer