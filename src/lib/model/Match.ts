import type {Team} from './Team'

type MatchTeam = Pick<Team, 'id' | 'teamName' | 'teamRanking'> & {matchp: number}
export type MatchResult = {
    text: string
    result: {home: number; away: number}[]
}

export type Match = {
    id: string
    lane: string
    date: string
    time: string
    series: string
    homeTeam: MatchTeam
    awayTeam: MatchTeam
    matches: MatchResult[]
}
