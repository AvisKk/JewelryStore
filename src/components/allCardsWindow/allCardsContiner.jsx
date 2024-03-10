import { connect } from "react-redux";
import AllCards from "./allCards";
import { getUniqueGoods } from "../redux/goodsReducer";
import { useEffect } from "react";

function AllCardsContiner(props) {

    const updateGoods = () => {
        props.getUniqueGoods()
    }

    useEffect(() => {
        updateGoods()
    }, [])

    return (
        <AllCards goods={props.goods} isFetching={props.isFetching} isFetchingFilter={props.isFetchingFilter} />
    );
}

const mapStateToProps = (state) => ({
    goods: state.goodsPage.goods,
    isFetching: state.goodsPage.isFetching,
    isFetchingFilter: state.fieldsPage.isFetching
})

export default connect(mapStateToProps, { getUniqueGoods })(AllCardsContiner);