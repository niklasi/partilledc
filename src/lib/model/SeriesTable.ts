type Score = {
    points: number
    sets: number
    games: number
}
export type SeriesTableItem = {
    id: string
    matches: number
    matchp: {
        won: Score
        lost: Score
    }
    teamp: number
    teamRanking: number
}
