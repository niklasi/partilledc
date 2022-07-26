import {useSeries} from './useSeries'
import {useParams} from 'react-router-dom'

export function useCurrentSerie() {
    const {series: allSeries} = useSeries()
    const {series} = useParams()

    return allSeries.find((serie) => serie.id === series)
}
