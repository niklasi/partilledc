// import {useEffect, useState} from 'react'
import {useLoaderData} from 'react-router-dom'
import Match from '../components/Match'
import {saveMatch} from '../actions'
import {getMatchesByDate} from '../lib/api'

function getToday() {
    return new Date().toLocaleDateString('sv-SE')
}

export async function loader() {
    return getMatchesByDate(getToday())
}

function TodaysMatches(props) {
    const matches = useLoaderData()
    // const [today, setToday] = useState('')
    // let interval = null

    // useEffect(() => {
    //     clearInterval(interval)
    //     props.loadTodaysMatches(today)
    //
    //     interval = setInterval(() => {
    //         setToday(getToday())
    //     }, 1000 * 10)
    //     return props.unloadMatches
    // }, [today])

    return (
        <div>
            <div className="flex flex-wrap">
                {matches.map((match, index) => (
                    <div key={'match-' + index} className="basis-full md:basis-1/2 lg:basis-1/3 px-2 py-2">
                        <Match saveMatch={props.saveMatch} match={match} user={props.user || {}} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TodaysMatches
