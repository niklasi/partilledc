import allSeries from '../../series.json'
import SeriesTable from './SeriesTable'

const AllSeries = (props) => {
  const routes = props.routes
  const seriesType = routes[routes.length - 1].seriesType

  return (
    <div>
      {allSeries[seriesType].filter(x => x.active === true).map(x => {
        return (
          <div key={x.id}>
            <p>{x.text}</p>
            <SeriesTable series={x.id} />
          </div>
        )
      })}
    </div>
  )
}

export default AllSeries
