const firebase = require('firebase-admin')
const allSeries = require('../src/series.json')
const serviceAccount = require('../credentials/partilletennis-firebase.json')

const config = {
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://project-8539870983476533695.firebaseio.com'
}

const app = firebase.initializeApp(config)
const db = app.database()

// db.ref('/users').once('value', userSnapshots => {
  
//   db.ref('/teams').once('value', teamSnapshots => {
//     const teams = []
//     teamSnapshots.forEach(teamSnapshot => {
//       teams.push({teamId: teamSnapshot.key, email: teamSnapshot.val().email})
//     })

//     userSnapshots.forEach(userSnapshot => {
//       const userKey = userSnapshot.key
//       const user = userSnapshot.val()

//       user.teams = {}
//       teams
//         .filter(x => x.email === user.email).
//         forEach(x => user.teams[x.teamId] = true)
//       // Object.keys(user.teams || {})
//       //   .map(key => user.teams[key])
//       //   .forEach(team => teams[team] = true)
//       console.log(user)
//       db.ref('/users/' + userKey).set(user)
//     })
    
//   })
// })

// return

const companySeries = allSeries.companySeries
const exerciseSeries = allSeries.exerciseSeries

let input = ''
process.stdin
  .on('data', (data) => input += data.toString())
  .on('end', () => {
    companySeries
      .concat(exerciseSeries)
      .forEach(series => {
      console.log(series.text)
      const division = series.order || series.text.split(' ').join('')
      const teams = JSON.parse(input)
      teams
        .filter(team => division === team.division)
        .map((team) => {
          return { 
            teamName: team.team_name,
            series: series.id,
            teamRanking: team.team_ranking, 
            contact: team.contact, 
            phone: team.phone, 
            email: team.email 
          }
        })
        .forEach((team) => {
          // db.ref('/teams').push(team)
          console.log(team)
        })
    })
  })
