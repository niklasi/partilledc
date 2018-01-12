const firebase = require('firebase-admin')
const serviceAccount = require('../credentials/partilletennis-firebase.json')

const config = {
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://project-8539870983476533695.firebaseio.com'
}

const app = firebase.initializeApp(config)
const db = app.database()

db.ref('/users').once('value', userSnapshots => {
  db.ref('/teams').once('value', teamSnapshots => {
    const teams = []
    teamSnapshots.forEach(teamSnapshot => {
      teams.push({teamId: teamSnapshot.key, email: teamSnapshot.val().email})
    })

    userSnapshots.forEach(userSnapshot => {
      const userKey = userSnapshot.key
      const user = userSnapshot.val()

      user.teams = {}
      teams
        .filter(x => x.email.toLowerCase().includes(user.email.toLowerCase()))
        .forEach(x => (user.teams[x.teamId] = true))
      console.log(user)
      db.ref('/users/' + userKey).set(user)
    })
  })
})

