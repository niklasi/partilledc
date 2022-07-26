import SeriesTable from '../../components/SeriesTable'
import {useLoaderData} from 'react-router-dom'
import {getTableBySeries} from '../../lib/api'
import {useCurrentSerie} from '../../hooks/useCurrentSerie'

export async function loader({params}) {
    return getTableBySeries(params.series)
}

function Table() {
    const seriesTableData = useLoaderData() as Awaited<ReturnType<typeof loader>>
    const series = useCurrentSerie()

    const companySeries = series.type === 'CompanySeries'

    return <SeriesTable isCompanySeries={companySeries} tableData={seriesTableData} />
}

export default Table
