import Preloader from "../preloader/preloader";
import Card from "./Card/card";
import style from "./allCardsStyle.module.css";
import Paginator from "../paginator/paginatorContainer";

/// Функция для ввывода всех карточек товаров
function AllCards(props) {

    return (
        <div>
            {props.goods.length ? <Paginator /> : ''}
            <div className={style.main}>
                {props.isFetching ?
                    <Preloader /> :
                    props.goods.map(u => <div key={u.id}><Card goods={u} /></div>)
                }
            </div>
            {props.goods.length >= 50 ? props.isFetching ? '' : <Paginator /> : ''}
        </div>
    );
}

export default AllCards