import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { Switch } from '@headlessui/react'
import { useSeries } from "../../hooks/useSeries"
import Button from '../../components/Shared/Button'

type SeriesInfoProps = {
    seriesId: string
}

export function SeriesInfo(props: SeriesInfoProps) {
    const {series} = useSeries()
    const serie = series.find(x => x.id === props.seriesId)

    return <>
    <div>Titel {serie?.text}</div>
    <SeriesType />
    <ActiveSwitch />
    <Button primary label='Spara' />
    </>
}


function SeriesType() {
  const [seriesType, setSeriesType] = useState('Lag')

  return (
    <RadioGroup value={seriesType} onChange={setSeriesType}>
        <RadioGroup.Label>Typ av serie</RadioGroup.Label>
        <RadioGroup.Option value="Lag">
        {({ checked }) => (
            <span className={checked ? 'bg-active' : ''}>Lag</span>
        )}
        </RadioGroup.Option>
        <RadioGroup.Option value="Singel">
        {({ checked }) => (
            <span className={checked ? 'bg-active' : ''}>Singel</span>
        )}
        </RadioGroup.Option>
        <RadioGroup.Option value="Dubbel">
        {({ checked }) => (
            <span className={checked ? 'bg-active' : ''}>Dubbel</span>
        )}
        </RadioGroup.Option>
    </RadioGroup>
  )
}

function ActiveSwitch() {
  const [enabled, setEnabled] = useState(false)

  return (
    <Switch.Group>
        <div className="flex items-center">
              <Switch.Label className="mr-4">Aktiv</Switch.Label>
              <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${
                      enabled ? 'bg-primary' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                  <span className="sr-only">Aktiv</span>
                  <span
                  className={`${
                      enabled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white`}
                  />
              </Switch>
        </div>
    </Switch.Group>
  )
}
