import {overrideTailwindClasses as tailwindOverride} from 'tailwind-override'

type ButtonProps = {
    label: string
    primary?: boolean
    secondary?: boolean
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button = (props: ButtonProps) => {
    const {primary, secondary, disabled, type, className, ...rest} = props
    return (
        <button
            type={type}
            disabled={disabled}
            className={tailwindOverride(
                `${
                    secondary ? 'text-secondary' : primary ? 'text-primary' : undefined
                } disabled:opacity-50 text-sm uppercase p-2 hover:bg-gray-100 disabled:hover:bg-inherit ${
                    className ?? ''
                }`
            )}
            {...rest}
        >
            {props.label}
        </button>
    )
}

export default Button
