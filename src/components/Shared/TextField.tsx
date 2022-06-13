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
            className={props.className}
        />
    )
}

export default Input
