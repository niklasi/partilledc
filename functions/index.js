const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true})
admin.initializeApp(functions.config().firebase);

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

  db.ref('/teams')
    .orderByChild('email')
    .equalTo(email)
    .once('value', snapshots => {
    
    const user = {email, teams: {}}
    snapshots.forEach(team => {
      user.teams[team.key] = true
    })

    db.ref('/users/' + evt.data.uid).set(user)
  })
})

exports.removeUser = functions.auth.user().onDelete(evt => {
  return admin.database().ref("/users/" + evt.data.uid).remove()
})

exports.test = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.setHeader('content-type', 'text/calendar')
    response.status(200).send(`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
BEGIN:VEVENT
UID:uid1@example.com
DTSTAMP:200714T170000Z
ORGANIZER;CN=John Doe:MAILTO:john.doe@example.com
DTSTART:20170714T170000Z
DTEND:20170715T035959Z
SUMMARY:Bastille Day Party
END:VEVENT
END:VCALENDAR`)
  })
})
