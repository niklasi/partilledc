const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({origin: true})
const r2 = require('r2')

admin.initializeApp(functions.config().firebase)

exports.resetSeries = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const seriesId = request.query.seriesId
    const slug = request.query.slug
    const uid = request.query.uid

    if (!seriesId) {
      return response.status(400).send('Missing seriesId')
    }

    if (!slug) {
      return response.status(400).send('Missing slug')
    }

    if (!uid) {
      return response.status(400).send('Missing uid')
    }

    const teamsRef = '/teamsNext'
    const matchesRef = '/matchesNext'
    const db = admin.database()

    function cleanSeries () {
      const teamsPromise = new Promise(function (resolve, reject) {
        db.ref(teamsRef)
          .orderByChild('series')
          .equalTo(seriesId)
          .once('value', (snapshot) => {
            snapshot.forEach(team => {
            // const {teamName} = team.val()
            // console.log(teamName, team.key)
              db.ref(teamsRef + '/' + team.key).remove()
            })
            resolve()
          })
      })

      const matchesPromise = new Promise(function (resolve) {
        db.ref(matchesRef)
          .orderByChild('series')
          .equalTo(seriesId)
          .once('value', (snapshot) => {
            snapshot.forEach(match => {
            // const {homeTeam, awayTeam, date} = match.val()
            // console.log(homeTeam.teamName + ' - ' + awayTeam.teamName + ', ' + date, match.key)
              db.ref(matchesRef + '/' + match.key).remove()
            })
            resolve()
          })
      })

      return Promise.all([teamsPromise, matchesPromise])
    }

    function migrateTeams (teams) {
      return new Promise(function (resolve) {
        teams
          .map((team) => {
            return {
              teamName: team.team_name,
              series: seriesId,
              teamRanking: team.team_ranking,
              contact: team.contact,
              phone: team.phone,
              email: team.email
            }
          })
          .forEach((team) => {
            db.ref(teamsRef).push(team)
          // console.log(team.teamName)
          })
        resolve()
      })
    }

    function migrateMatches (matches) {
      return new Promise(function (resolve) {
        db.ref(teamsRef)
          .orderByChild('series')
          .equalTo(seriesId)
          .once('value', (snapshot) => {
            let teams = []
            snapshot.forEach(team => {
              const {teamRanking, teamName} = team.val()
              teams.push({id: team.key, teamRanking, teamName})
            })

            matches
              .forEach(match => {
                let homeTeam = teams
                  .find(team => team.teamRanking === match.home_team)
                let awayTeam = teams
                  .find(team => team.teamRanking === match.away_team)

                homeTeam.matchp = 0
                awayTeam.matchp = 0

                const {lanes, time, date} = match

                const matches = lanes.indexOf('+') === -1
                  ? [
                    {text: 'Match', result: [{home: 0, away: 0}]}
                  ]
                  : [
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
                  series: seriesId}

                db.ref(matchesRef).push(migratedMatch)
              // console.log(migratedMatch.homeTeam.teamName + ' - ' + migratedMatch.awayTeam.teamName + ', ' + date + ' kl ' + time)
              })
            resolve()
          })
      })
    }

    db.ref('/users/' + uid).once('value', async function (user) {
      const admin = user.val().admin || false
      if (!admin) {
        response.status(401).send('Only admin can reset series')
      }
      const data = await r2.get('https://partilletennis-scraper-js7ld72o6a-uc.a.run.app/scraper/' + slug).json
      await cleanSeries()
      await migrateTeams(data.teams)
      await migrateMatches(data.matches)

      return response.status(200).send('Serien nollställd')
    })
  })
})

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
