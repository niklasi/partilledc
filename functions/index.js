const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({origin: true})
admin.initializeApp(functions.config().firebase)

exports.mymatches = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const db = admin.database()
    db
      .ref('/users/' + request.query.uid)
      .once('value', snapshot => {
        const teams = snapshot.val().teams || {}
        const promises = []

        Object.keys(teams).forEach(teamId => {
          promises.push(db.ref('/matches').orderByChild('homeTeam/id').equalTo(teamId).once('value'))
          promises.push(db.ref('/matches').orderByChild('awayTeam/id').equalTo(teamId).once('value'))
        })

        Promise.all(promises).then(snapshots => {
          const matches = snapshots
            .map(s => s.val())
            .map(x => Object.keys(x).map(key => Object.assign({}, {id: key}, x[key])))
            .reduce((matches, list) => matches.concat(list), [])

          response.status(200).send(matches)
        })
      })
  })
})

exports.addUser = functions.auth.user().onCreate(evt => {
  const db = admin.database()
  const email = evt.data.email

  db.ref('/teams').once('value', teamSnapshots => {
    const teams = []
    teamSnapshots.forEach(teamSnapshot => {
      teams.push({teamId: teamSnapshot.key, email: teamSnapshot.val().email})
    })

    const user = {email, teams: {}}
    teams
      .filter(x => x.email.toLowerCase().includes(user.email.toLowerCase()))
      .forEach(x => (user.teams[x.teamId] = true))

    db.ref('/users/' + evt.data.uid).set(user)
  })
})

exports.removeUser = functions.auth.user().onDelete(evt => {
  return admin.database().ref('/users/' + evt.data.uid).remove()
})
