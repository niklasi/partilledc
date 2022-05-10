
const Input = (props) => {
  return <input type={props.type ?? 'text'} onChange={props.onChange} placeholder={props.label} className={props.className} />
}

export default Input
