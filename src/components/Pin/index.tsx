import {ReactNode} from 'react'
import TextField from '../Shared/TextField'
import {usePin} from '../../hooks/usePin'

type PinProps = {
    required: boolean
    children: ReactNode
}

export function Pin(props: PinProps) {
    const [requirePin, checkPin] = usePin(props.required)

    return (
        <>
            {requirePin ? (
                <TextField
                    label="Ange pin"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    onChange={(e: any) => checkPin(e.target.value)}
                />
            ) : (
                props.children
            )}
        </>
    )
}
