import preloader from '../common/preloader.svg'
import style from './preloader.module.css'

///Значок загрузки
function Preloader () {
return <div className={style.preloader}>
    <img src={preloader} alt={''}/>
</div>
}

export default Preloader