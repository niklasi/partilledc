const matchPlayed = (sets) => {
  return sets.reduce((p, c) => p + c.home + c.away, 0) > 0
}

export function score (results) {
  const result = results
    .reduce((setWins, set) => {
      const {home, away} = set
      if (home === 4) return {home: setWins.home + 1, away: setWins.away}
      if (away === 4) return {home: setWins.home, away: setWins.away + 1}

      if (setWins.home !== setWins.away) return setWins
      if (home - away > 1) return {home: setWins.home + 1, away: setWins.away}
      if (away - home > 1) return {home: setWins.home, away: setWins.away + 1}

      return setWins
    }, {home: 0, away: 0})

  if (result.home === result.away) return {home: 1, away: 1}
  if (result.home > result.away) return {home: 2, away: 0}

  return {home: 0, away: 2}
}

export function matchPoints (results) {
  return results.filter(matchPlayed).map(score).reduce((p, c) => {
    const {home, away} = p
    return {home: home + c.home, away: away + c.away}
  }, {home: 0, away: 0})
}

export function teamPoints ({home, away}) {
  if (home > away) return {home: 2, away: 0}
  if (home < away) return {home: 0, away: 2}

  return {home: 1, away: 1}
}
