import Button from '../Shared/Button'
import { Link } from 'react-router'
import series from '../../series.json'

export function Navigation (props) {
  const listItemFactory = (serie) => {
    const items = [
      <Link key={`team-${serie.id}`} data-testid={`menu-team-${serie.id}`} to={`/series/${serie.id}/teams`} onClick={props.handleToggle}>
          <Button label='Lag' className='w-full normal-case mx-4 px-4 text-base text-left text-black' />
      </Link>,
      <Link key={`matches-${serie.id}`} data-testid={`menu-matches-${serie.id}`} to={`/series/${serie.id}/matches`} onClick={props.handleToggle}>
        <Button label='Matcher' className='w-full normal-case mx-4 px-4 text-base text-left text-black' />
      </Link>,
      <Link key={`table-${serie.id}`} data-testid={`menu-table-${serie.id}`} to={`/series/${serie.id}/table`} onClick={props.handleToggle}>
        <Button label='Tabell' className='w-full normal-case mx-4 px-4 text-base text-left text-black' />
      </Link>
    ]
    if (props.user.uid === 'EcTzkTApzDXWR07vMbwmuXfkIHm2' ||
      props.user.uid === 't9Q8UPdd1oOvyA4PN4C4VeBMeaW2' || props.user.email === 'niklas@ingholt.com') {
      items.push(
        <Link key={`reset-${serie.id}`} to={{ pathname: '/series/' + serie.id + '/reset', state: { slug: serie.slug } }} onClick={props.handleToggle}>
          <Button label='Nollställ' className='w-full normal-case mx-4 px-4 text-base text-left text-black' />
        </Link>
        )
    }
    return <div key={serie.id} className='my-2 px-2 w-full' data-testid={serie.text.split(' ').join('-')}>
      <Button className='text-lg normal-case text-black text-left w-full' label={serie.text} />
        {items}
      </div>
  }

  const myMatches = () => {
    if (!props.user.isAnonymous) {
      return (
        <Link to='/my-matches' onClick={props.handleToggle}>
          <Button label='Mina matcher' className='w-full normal-case px-4 text-base text-left text-black' />
        </Link>
      )
    }
  }

  const open = props.open ? 'ease-linear duration-200 translate-x-4/6' : 'ease-linear duration-200 -translate-x-full'
    return <div className={`bg-transparent z-40 absolute top-0 left-0 w-screen h-screen ${props.open ? undefined : 'invisible'}`} onClick={() => props.handleToggle()}>
      <div className={`w-4/6 bg-white shadow fixed top-0 ${open}`}>
        <div className='flex flex-col space-x-2 safe-top'>
          <p className='text-2xl pl-4 text-gray-500'>
            Lagserier
          </p>
          {series.companySeries.filter(x => x.active === true).map(listItemFactory)}
          <hr />
          <p className='text-2xl pl-4 text-gray-500'>
            Motionsserier
          </p>
          {series.exerciseSeries.filter(x => x.active === true).map(listItemFactory)}
          <hr />
          {myMatches()}
            <Link to='/todays-matches' onClick={props.handleToggle}>
              <Button label='Dagens matcher' className='w-full normal-case px-4 text-base text-left text-black' />
            </Link>
        </div>
      </div>
    </div>
}
