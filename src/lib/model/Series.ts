export type Series = {
    id: string
    order?: number
    text: string
    active: boolean
    slug: string
    type: 'CompanySeries' | 'ExerciseSeries'
}
