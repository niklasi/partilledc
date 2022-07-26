import {overrideTailwindClasses as tailwindOverride} from 'tailwind-override'

type InputProps = {
    label: string
    primary?: boolean
    secondary?: boolean
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = (props: InputProps) => {
    return (
        <input
            {...props}
            name={props.name}
            value={props.value}
            type={props.type ?? 'text'}
            placeholder={props.label}
            className={tailwindOverride(`mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-primary/20 ${props.className ?? ''}`)}
        />
    )
}

export default Input
