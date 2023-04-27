import {createContext, useState} from 'react'
import classes from './Loader.module.css'
import Loader from '../../images/loader.gif'

export const LoaderContext = createContext(null)

export const LoaderProvider = ({children}) => {
    const [loaderVisible, setLoaderVisible] = useState(false)

    const start = () => {
        setLoaderVisible(true)
    }

    const stop = () => {
        setLoaderVisible(false)
    }

    const value = {start, stop}

    return <LoaderContext.Provider value={value}>
        {loaderVisible &&
            <div className={classes.loaderContainer}>
                <img className={classes.loader} src={Loader} alt={'Loader'}/>
            </div>
        }
        {children}
    </LoaderContext.Provider>

}