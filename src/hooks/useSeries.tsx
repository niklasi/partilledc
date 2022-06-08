import {useContext} from 'react'
import {SeriesContext} from '../components/SeriesProvider'

export function useSeries() {
    return useContext(SeriesContext)
}
