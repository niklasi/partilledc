import {Fragment, useState} from 'react'
import {Listbox as HeadlessListBox, Transition} from '@headlessui/react'

const games = [0, 1, 2, 3, 4]

type ListboxProps = {
    selectedValue: number
    onChange?: (value: number) => void
    label?: string
}

export function Listbox(props: ListboxProps) {
    const [selectedGame, setSelectedGame] = useState(props.selectedValue)

    return (
        <HeadlessListBox
            value={selectedGame}
            horizontal
            onChange={(value) => {
                setSelectedGame(value)
                props.onChange && props.onChange(value)
            }}
        >
            {props.label && props.label === 'abc' && (
                <HeadlessListBox.Label className="px-2">{props.label}</HeadlessListBox.Label>
            )}
            <HeadlessListBox.Button>{selectedGame}</HeadlessListBox.Button>
            <Transition
                as={Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <div className="absolute -top-0 -left-12 z-10">
                    <HeadlessListBox.Options className="flex flex-row">
                        {games.map((game) => (
                            <HeadlessListBox.Option
                                className={({active, selected}) =>
                                    `${active ? 'bg-primary/10' : ''} ${
                                        selected ? 'font-bold' : ''
                                    } px-2 border rounded-md mx-1`
                                }
                                key={game}
                                value={game}
                            >
                                {game}
                            </HeadlessListBox.Option>
                        ))}
                    </HeadlessListBox.Options>
                </div>
            </Transition>
        </HeadlessListBox>
    )
}
