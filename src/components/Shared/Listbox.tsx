import {Fragment, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'

type ListboxProps = {
    selectedItem: string
    onChange?: (value: string) => void
    label?: string
    name?: string
    data: Array<{id: string; display: string}>
}

function InternalListbox(props: ListboxProps) {
    const [selected, setSelected] = useState(props.data.find((x) => x.id === props.selectedItem))

    return (
            <Listbox
                name={props.name}
                value={selected}
                onChange={(value) => {
                    setSelected(value)
                    props.onChange && props.onChange(value.id)
                }}
            >
                <div className="relative mt-1">
                    {props.label && <Listbox.Label>{props.label}</Listbox.Label>}
                    <Listbox.Button className="relative w-full cursor-default rounded-md border-gray-900 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-300 focus:ring focus:ring-primary/20 ">
                        <span className="block truncate">{selected?.display}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <span className="h-5 w-5 material-icons-outlined">unfold_more</span>
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {props.data.map((item) => (
                                <Listbox.Option
                                    key={item.id}
                                    className={({active, selected}) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-active' : 'text-gray-900'
                                        } ${selected ? 'bg-active' : 'bg-white'}`
                                    }
                                    value={item}
                                >
                                    {({selected}) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                            >
                                                {item.display}
                                            </span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
    )
}
export {InternalListbox as Listbox}
