import {useMatches} from 'react-router-dom'
import {useCurrentSerie} from './useCurrentSerie'

export function useTitle() {
    const serie = useCurrentSerie()
    const routeMatches = useMatches()

    const name = serie?.text
    const [route] = routeMatches.slice(-1)
    const title = route.handle?.title ?? ''
    return name ? `${name} - ${title}` : title
}
