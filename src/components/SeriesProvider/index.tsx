import {useState, useEffect, createContext, ReactNode} from 'react'
import type {Series} from '../../lib/model'
import {getAllSeries} from '../../lib/api'

interface SeriesContextType {
    series: Series[]
}

export const SeriesContext = createContext<SeriesContextType>(null!)

export function SeriesProvider({children}: {children: ReactNode}) {
    const [series, setSeries] = useState<Series[]>([])

    useEffect(() => {
        getAllSeries().then((data) => setSeries(data))
    }, [])

    return <SeriesContext.Provider value={{series}}>{children}</SeriesContext.Provider>
}
