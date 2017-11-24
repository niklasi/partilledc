const firebase = require('firebase-admin')
const serviceAccount = require('../credentials/partilletennis-firebase.json')

const config = {
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://project-8539870983476533695.firebaseio.com'
}

const app = firebase.initializeApp(config)
const db = app.database()

const seriesId = '-KROX8xD3kGu2kg0bUk2'

db.ref('/teams')
  .orderByChild('series')
  .equalTo(seriesId)
  .once('value', (snapshot) => {
    snapshot.forEach(team => {
      const {teamName} = team.val()
      console.log(teamName, team.key)
      // db.ref('/teams/' + team.key).remove()
    })
  })

db.ref('/matches')
  .orderByChild('series')
  .equalTo(seriesId)
  .once('value', (snapshot) => {
    snapshot.forEach(match => {
      const {homeTeam, awayTeam, date} = match.val()
      console.log(homeTeam.teamName + ' - ' + awayTeam.teamName + ', ' + date, match.key)
      // db.ref('/matches/' + match.key).remove()
    })
  })

