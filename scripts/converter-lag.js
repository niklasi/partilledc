/* eslint-disable no-undef */
const series = '3'
const fs = require('node:fs')

const input = fs.readFileSync('./Div3.csv', 'utf8')
const rows = input.split('\n')

const teams = getTeams(rows)
const matches = getMatches(rows)

console.log(JSON.stringify({teams, matches}))

function getTeams(data) {
    const teams = []

    for (const row of data) {
        if (row.includes('Lag')) continue

        const columns = row.split(';')
        if (columns.length === 1) break

        teams.push({
            team_ranking: formatText(columns[0]),
            division: series,
            team_name: formatText(columns[1]),
            contact: formatText(columns[2]),
            email: formatText(columns[4]),
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
            home_team: formatText(columns[2]).split('-')[0],
            away_team: formatText(columns[2]).split('-')[1],
            date: formatDate(formatText(columns[0])),
            time: formatText(columns[1]),
            lanes: formatText(columns[3]).split('  ').join(' '),
            division: series,
        })
    }

    return matches
}

function formatText(value) {
    return value.trim()
}

function formatDate(value) {
    let [day, month] = value.split(' ')
    const monthMap = {
        jan: '01',
        feb: '02',
        mar: '03',
        apr: '04',
        maj: '05',
        jun: '06',
        jul: '07',
        aug: '08',
        sep: '09',
        okt: '10',
        nov: '11',
        dec: '12',
    }

    if (day.length < 2) {
        day = `0${day}`
    }

    return `2024-${monthMap[month]}-${day}`
}
