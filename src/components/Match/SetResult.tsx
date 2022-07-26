import {Combobox, Transition} from '@headlessui/react'
import {useState, Fragment} from 'react'

type SetResultProps = {
    selectedValue: number
    onChange?: (value: number) => void
    label?: string
}
const games = [0, 1, 2, 3, 4]

export function SetResult(props: SetResultProps) {
    const [selectedGame, setSelectedGame] = useState(props.selectedValue)
    const [query, setQuery] = useState('')

const filteredGames =
    query === ''
      ? games
      : games.filter((game) => game.toString() === query) 
            
    return (
        <Combobox value={selectedGame} 
            onChange={(value) => {
                setSelectedGame(value)
                props.onChange && props.onChange(value)
            }}>
            <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                        className="w-full border-none py-2 pl-3 text-sm text-gray-900 focus:ring-0"
                        displayValue={(game) => game.toString()}
                        onChange={(event) => setQuery(event.target.value)}
                        onFocus={(event: React.FocusEvent<HTMLInputElement>) => event.target.select()}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <span className={'material-icons-outlined h-5 w-5'}>
                                expand_more
                            </span>
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredGames.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            </div>
                        ) : (
                            filteredGames.map((game) => (
                                <Combobox.Option
                                    key={game}
                                    className={({active}) =>
                                        `relative cursor-default select-none py-2 pl-6 pr-4 ${
                                            active ? 'bg-active' : 'text-gray-900'
                                        }`
                                    }
                                    value={game}
                                >
                                    {({selected, active}) => (
                                        <>
                                            <span
                                            className={`block truncate ${active ? 'text-secondary' : 'text-gray-900'} ${selected ? 'font-medium' : 'font-normal'}`}
                                            >
                                                {game}
                                            </span>
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    )
}
