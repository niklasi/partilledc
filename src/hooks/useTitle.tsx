import {useParams, useMatches} from 'react-router-dom'
import * as seriesData from '../series.json'

export function useTitle() {
    const {series} = useParams()
    const routeMatches = useMatches()

    const seriesNames = [...seriesData.companySeries, ...seriesData.exerciseSeries]
        .filter((x) => x.id === series)
        .map((x) => x.text)

    const [route] = routeMatches.slice(-1)
    const title = route.handle?.title ?? ''
    return seriesNames.length > 0 ? `${seriesNames} - ${title}` : title
}
