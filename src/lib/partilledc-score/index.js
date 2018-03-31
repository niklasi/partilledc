export function matchPlayed (sets) {
  return sets.reduce((p, c) => p + c.home + c.away, 0) > 0
}

export function score (results) {
  const sets = results
    .reduce((setWins, set) => {
      const {home, away} = set

      if (home === 4) return {home: setWins.home + 1, away: setWins.away}
      if (away === 4) return {home: setWins.home, away: setWins.away + 1}

      if (setWins.home !== setWins.away) return setWins
      if (home - away > 1) return {home: setWins.home + 1, away: setWins.away}
      if (away - home > 1) return {home: setWins.home, away: setWins.away + 1}

      return setWins
    }, { home: 0, away: 0 })

  const games = results.reduce((gameWins, game) => {
    return {home: gameWins.home + game.home, away: gameWins.away + game.away}
  }, { home: 0, away: 0 })

  let homePoints = 0
  let awayPoints = 0

  if (sets.home === sets.away) {
    homePoints = 1
    awayPoints = 1
  }

  if (sets.home > sets.away) {
    homePoints = 2
    awayPoints = 0
  }

  if (sets.home < sets.away) {
    homePoints = 0
    awayPoints = 2
  }

  return {
    home: {
      points: homePoints,
      sets: sets.home,
      games: games.home
    },
    away: {
      points: awayPoints,
      sets: sets.away,
      games: games.away
    }
  }
}

export function matchPoints (results) {
  return results.filter(matchPlayed).map(score).reduce((p, c) => {
    const {home, away} = p
    return {
      home: {
        points: home.points + c.home.points,
        sets: home.sets + c.home.sets,
        games: home.games + c.home.games
      },
      away: {
        points: away.points + c.away.points,
        sets: away.sets + c.away.sets,
        games: away.games + c.away.games
      }
    }
  }, {home: {points: 0, sets: 0, games: 0}, away: {points: 0, sets: 0, games: 0}})
}

export function teamPoints ({home, away}) {
  if (home.points === 0 && away.points === 0) return {home: 0, away: 0}
  if (home.points > away.points) return {home: 2, away: 0}
  if (home.points < away.points) return {home: 0, away: 2}

  return {home: 1, away: 1}
}
