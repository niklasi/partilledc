const firebase = require('firebase')
const request = require('request')

const config = {
  serviceAccount: require('../credentials/partilletennis.json'),
  databaseURL: 'https://project-8539870983476533695.firebaseio.com'
}

const app = firebase.initializeApp(config)
const db = app.database()

let teamData = ''
request.get('http://partilletennis.ingholt.com/teams/all?output=json')
  .on('data', (data) => {
    teamData += data
  })
  .on('end', () => {
    const teams = JSON.parse(teamData.toString())
    db.ref('/series').on('value', (snapshot) => {
      snapshot.forEach((series) => {
        console.log(series.val().text)
        teams
          .filter((team) => series.val().order === team.division)
          .map((team) => {
            return { teamName: team.team_name, series: series.key, teamRanking: team.team_ranking, contact: team.contact, phone: team.phone, email: team.email }
          })
          .forEach((team) => {
            db.ref('/teams').push(team)
          })
      })
    })
  })
