import * as allSeries from '../series.json'
import {getTableBySeries} from '../lib/api'
import {useLoaderData} from 'react-router-dom'
import SeriesTable from '../components/SeriesTable'

export async function loader({seriesType}) {
    return Promise.all(
        allSeries[seriesType]
            .filter((x) => x.active === true)
            .map(async (x) => {
                return {
                    id: x.id,
                    name: x.text,
                    isCompanySeries: seriesType === 'companySeries',
                    tableData: (await getTableBySeries(x.id))[x.id],
                }
            })
    )
}

const AllSeries = () => {
    const allSeriesData = useLoaderData()
    return (
        <div>
            {allSeriesData.map((series) => {
                return (
                    <div key={series.id}>
                        <p>{series.name}</p>
                        <SeriesTable isCompanySeries={series.isCompanySeries} tableData={series.tableData} />
                    </div>
                )
            })}
        </div>
    )
}

export default AllSeries
