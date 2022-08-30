import {overrideTailwindClasses as tailwindOverride} from 'tailwind-override'

type CardProps = {
    title: string | number | React.ReactElement
    avatar?: string | number | React.ReactElement
    subtitle?: string | number | React.ReactElement
    children?: React.ReactNode
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Card = (props: CardProps) => {
    return (
        <div className={tailwindOverride(`px-3 py-3 shadow border border-solid border-gray-200 ${props.className}`)}>
            <div className="flex flex-row space-x-3">
                <div className="h-9 w-9 flex justify-center items-center bg-secondary border border-secondary rounded-full">
                    <div className="text-white">{props.avatar}</div>
                </div>
                <div className="flex flex-col basis-11/12">
                    <div className="text-base">{props.title}</div>
                    <div className="text-sm text-gray-600">{props.subtitle}</div>
                </div>
            </div>
            {props.children}
        </div>
    )
}

export default Card
