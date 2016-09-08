const firebase = require('firebase')
// const request = require('request')

const config = {
  serviceAccount: require('../credentials/partilletennis.json'),
  databaseURL: 'https://project-8539870983476533695.firebaseio.com'
}

const app = firebase.initializeApp(config)
const db = app.database()

// let teamData = ''
// request.get('http://partilletennis.ingholt.com/teams/all?output=json')
//   .on('data', (data) => {
//     teamData += data
//   })
//   .on('end', () => {
//     const teams = JSON.parse(teamData.toString())
//     db.ref('/series').on('value', (snapshot) => {
//       snapshot.forEach((series) => {
//         console.log(series.val().text)
//         teams
//           .filter((team) => series.val().order === team.division)
//           .map((team) => {
//             return { teamName: team.team_name, series: series.key, teamRanking: team.team_ranking, contact: team.contact, phone: team.phone, email: team.email }
//           })
//           .forEach((team) => {
//             db.ref('/teams').push(team)
//           })
//       })
//     })
//   })

//
// TableSeries
//

// db.ref('/series').on('child_added', (series) => {
//   db.ref('/teams').orderByChild('series').equalTo(series.key).on('child_added', (snapshot) => {
//     let team = snapshot.val()
//     let item = {teamId: snapshot.key, series: series.key, teamName: team.teamName, matches: 0, matchp: '0-0', teamp: 0}
//     db.ref('/tableSeries').push(item)
//   })
// })
