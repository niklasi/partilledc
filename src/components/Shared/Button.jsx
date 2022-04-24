import { overrideTailwindClasses as tailwindOverride } from 'tailwind-override'

const Button = (props) => {
  const { primary, secondary, disabled, type, className, ...rest } = props
  return (
    <button type={type} disabled={disabled} className={tailwindOverride(`${secondary ? 'text-secondary' : 'text-primary'} disabled:opacity-50 text-sm uppercase p-2 hover:bg-gray-100 disabled:hover:bg-inherit ${className ?? ''}`)} {...rest}>
      {props.label}
    </button>
  )
}

export default Button
