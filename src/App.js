import AllCards from "./components/allCardsWindow/allCardsContiner";
import Header from "./components/Header/header"
import { connect } from "react-redux";

function App(props) {
  return (
    <div>
      <Header/>
      <AllCards goods = {props.goods}/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isFetching: state.goodsPage.isFetching,
  goods: state.goodsPage.goods
})

export default connect(mapStateToProps, {})(App);
