import { loadingGif } from '../../assets'
import './loadingFallback.scss'

export const LoadingFallback = ()=> {

    return (
        <div className='loading-component' >
        <img  className="box-shadow" src={loadingGif} alt="loading" />
    </div>
    )
}