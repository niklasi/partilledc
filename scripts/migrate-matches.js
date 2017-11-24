const firebase = require('firebase-admin')
const allSeries = require('../src/series.json')
const serviceAccount = require('../credentials/partilletennis-firebase.json')

const config = {
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://project-8539870983476533695.firebaseio.com'
}

const app = firebase.initializeApp(config)
const db = app.database()

const companySeries = allSeries.companySeries
  .map(x => Object.assign(x, {type: 'Company'}))
const exerciseSeries = allSeries.exerciseSeries
  .map(x => Object.assign(x, {type: 'Exercise'}))

let input = ''
process.stdin
  .on('data', (data) => input += data.toString())
  .on('end', () => {
    const matches = JSON.parse(input)
    companySeries
      .concat(exerciseSeries)
      .forEach(series => {
        const division = series.order || series.text.split(' ').join('')
        db.ref('/teams')
          .orderByChild('series')
          .equalTo(series.id)
          .once('value', (snapshot) => {
            let teams = []
            snapshot.forEach(team => {
              const {teamRanking, teamName} = team.val()
              teams.push({id: team.key, teamRanking, teamName})
            })

            matches
              .filter(match => match.division === division)
              .forEach(match => {
                let homeTeam = teams
                  .find(team => team.teamRanking === match.home_team)
                let awayTeam = teams
                  .find(team => team.teamRanking === match.away_team)

                homeTeam.matchp = 0
                awayTeam.matchp = 0

                const {lanes, time, date} = match

                const matches = series.type === 'Exercise'
                  ?
                [
                    {text: 'Match', result: [{home: 0, away: 0}]}
                ]
                  :
                [
                    { text: 'Dubbel', result: [ { home: 0, away: 0 } ] },
                    { text: '1:a singel', result: [ { home: 0, away: 0 } ] },
                    { text: '2:a singel', result: [ { home: 0, away: 0 } ] }
                ]

                const migratedMatch = {
                  homeTeam,
                  awayTeam,
                  date,
                  time,
                  lane: lanes,
                  matches,
                  series: series.id}

                db.ref('/matches').push(migratedMatch)
                console.log(migratedMatch.homeTeam.teamName + ' - ' + migratedMatch.awayTeam.teamName + ', ' + date + ' kl ' + time)
              })
          })
      })
  })
