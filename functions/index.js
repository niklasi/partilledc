const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true})
admin.initializeApp(functions.config().firebase);

exports.mymatches = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const db = admin.database()
    const email = request.query.email === 'niklas@ingholt.com' ? 'daniel.eek68@gmail.com' : request.query.email
    db.ref('/teams').orderByChild('email').equalTo(email).on('value', snapshot => {

      const promises = []
      snapshot.forEach(team => {
        promises.push(db.ref('/matches').orderByChild('homeTeam/id').equalTo(team.key).once('value'))
        promises.push(db.ref('/matches').orderByChild('awayTeam/id').equalTo(team.key).once('value'))
      })
      Promise.all(promises).then(snapshots => {
        const matches = snapshots
          .map(s => s.val())
          .map(x => Object.keys(x).map(key => x[key]))
          .reduce((matches, list) => matches.concat(list), [])

        response.status(200).send(matches)
      })
    })
  }) 
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
