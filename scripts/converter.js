/* eslint-disable no-undef */

const fs = require('node:fs')

const series = 'HerrsingelDiv4'
const input = fs.readFileSync('./Herrsingel-Div4.csv', 'utf8')
const rows = input.split('\n')

const teams = getTeams(rows)
const matches = getMatches(rows)

console.log(JSON.stringify({teams, matches}))

function getTeams(data) {
    const teams = []

    for (const row of data) {
        if (row.includes('Lag') || row.includes('Namn')) continue

        const columns = row.split(';')
        if (columns.length === 1) break

        teams.push({
            team_ranking: formatText(columns[0]),
            division: series,
            team_name: formatText(columns[1]),
            contact: '',
            email: formatText(columns[2]),
            phone: formatText(columns[3]),
        })
    }

    return teams
}

function getMatches(data) {
    const matches = []
    let foundMatches = false

    for (const row of data) {
        if (row.includes('Datum')) {
            foundMatches = true
            continue
        }

        if (!foundMatches) continue

        const columns = row.split(';')
        if (columns.length === 1) break

        matches.push({
            home_team: formatText(columns[3]),
            away_team: formatText(columns[4]),
            date: formatText(columns[0]),
            time: formatText(columns[1]),
            lanes: formatText(columns[2]).split('  ').join(' '),
            division: series,
        })
    }

    return matches
}

function formatText(value) {
    return value.trim()
}
