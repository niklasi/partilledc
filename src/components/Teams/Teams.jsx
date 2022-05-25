import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useOutletContext, useLoaderData } from 'react-router-dom'
import Team from './Team'
import { getTeamsBySeries } from '../../lib/api'

export async function loader ({params}) {
  return getTeamsBySeries(params.series)
}

function Teams (props) {
  const teams = useLoaderData()
  const {setRouteName} = useOutletContext() 
  
  useEffect(() => {
    setRouteName(props.name)
  }, [props.name])

  return (
    <div className='flex flex-wrap'>
      {teams.map((team, index) =>
        <div key={'team-' + index} className='basis-full md:basis-1/2 lg:basis-1/3 px-2 py-2'>
          <Team team={team} />
        </div>)}
    </div>
  )
}

export default Teams
