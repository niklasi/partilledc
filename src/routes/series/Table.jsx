import { useEffect } from 'react'
import PropTypes from 'prop-types'
import SeriesTable from '../../components/SeriesTable'
import { useOutletContext, useLoaderData, useParams } from 'react-router-dom'
import { getTableBySeries } from '../../lib/api'
import allSeries from '../../series.json'

export async function loader ({params}) {
  return getTableBySeries(params.series)
}

function Table (props) {
  const seriesTableData = useLoaderData()
  const {series} = useParams()
  const {setRouteName} = useOutletContext() 

  const companySeries = allSeries.companySeries.filter(s => s.id === props.series).length > 0

  useEffect(() => {
    setRouteName(props.name)
  }, [props.name])


  return <SeriesTable isCompanySeries={companySeries} tableData={seriesTableData[series]} />
}

export default Table