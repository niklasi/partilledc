const Input = (props) => {
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