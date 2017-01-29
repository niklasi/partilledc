const firebase = require('firebase')
const teams = require('./motion-teams.json')
const allSeries = require('../src/series.json')

const config = {
  serviceAccount: require('../credentials/partilletennis.json'),
  databaseURL: 'https://project-8539870983476533695.firebaseio.com'
}

const app = firebase.initializeApp(config)
const db = app.database()

allSeries.exerciseSeries.forEach(series => {
  console.log(series.text)
  teams
    .filter((team) => series.text.split(' ').join('') === team.division)
    // .filter((team) => series.order === team.division)
    .map((team) => {
      return { teamName: team.team_name, series: series.id, teamRanking: team.team_ranking, contact: team.contact, phone: team.phone, email: team.email }
    })
    .forEach((team) => {
      db.ref('/teams').push(team)
    })
})
