import style from "./cardStyle.module.css"

///Настройка одной карточки товара
function Card(props) {

    return (
        <div className={style.card}>
            <div className={style.brand}>{props.goods.brand}</div>
            <div className={style.product}>{props.goods.product}</div>
            <div className={style.price}>{props.goods.price} ₽</div>
            <div className={style.id}>id: {props.goods.id}</div>
        </div>
    );
}

export default Card;