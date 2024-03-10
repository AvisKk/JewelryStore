import Filter from "./filter/filterContainer";
import style from "./headerStyle.module.css"

function Header() {
return(
    <div className={style.header}>
        <span className={style.title}>Store</span>
        <span><Filter /></span>
    </div>
);
}

export default Header;