import {getTableBySeries, getAllSeries} from '../lib/api'
import {useLoaderData} from 'react-router-dom'
import SeriesTable from '../components/SeriesTable'

export async function loader({seriesType}: {seriesType: string}) {
    const allSeries = await getAllSeries()
    return Promise.all(
        allSeries
            .filter((series) => series.type === seriesType)
            .filter((series) => series.active)
            .map(async (series) => {
                return {
                    ...series,
                    tableData: await getTableBySeries(series.id),
                }
            })
    )
}

const AllSeries = () => {
    const allSeriesData = useLoaderData() as Awaited<ReturnType<typeof loader>>
    return (
        <div>
            {allSeriesData.map((series) => {
                return (
                    <div key={series.id}>
                        <p>{series.text}</p>
                        <SeriesTable isCompanySeries={series.type === 'CompanySeries'} tableData={series.tableData} />
                    </div>
                )
            })}
        </div>
    )
}

export default AllSeries
