import SeriesTable from '../../components/SeriesTable'
import {useLoaderData, useParams} from 'react-router-dom'
import {getTableBySeries} from '../../lib/api'
import * as allSeries from '../../series.json'

export async function loader({params}) {
    return getTableBySeries(params.series)
}

function Table() {
    const seriesTableData = useLoaderData()
    const {series} = useParams()

    const companySeries = allSeries.companySeries.filter((s) => s.id === series).length > 0

    return <SeriesTable isCompanySeries={companySeries} tableData={seriesTableData} />
}

export default Table
