const firebase = require('firebase')
const matches = require('./matches.json')

const config = {
  serviceAccount: require('../credentials/partilletennis.json'),
  databaseURL: 'https://project-8539870983476533695.firebaseio.com'
}

const app = firebase.initializeApp(config)
const db = app.database()

db.ref('/series').on('child_added', (series) => {
  const division = series.val().order
  db.ref('/teams').orderByChild('series').equalTo(series.key).on('value', (snapshot) => {
    let teams = []
    snapshot.forEach(team => {
      const {teamRanking, teamName} = team.val()
      teams.push({id: team.key, teamRanking, teamName})
    })

    matches.filter(match => match.division === division).forEach(match => {
      let homeTeam = teams.find(team => team.teamRanking === match.home_team)
      let awayTeam = teams.find(team => team.teamRanking === match.away_team)

      homeTeam.matchp = 0
      awayTeam.matchp = 0

      const {lanes, time, date} = match

      const matches = [{text: 'Dubbel', result: [{home: 0, away: 0}]}, {text: '1:a singel', result: [{home: 0, away: 0}]}, {text: '2:a singel', result: [{home: 0, away: 0}]}]

      const migratedMatch = {homeTeam, awayTeam, date, time, lane: lanes, matches, series: series.key}

      db.ref('/matches').push(migratedMatch)
    })
  })
})
