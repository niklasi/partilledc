import {Dialog} from '@headlessui/react'

type DialogProps = {
    open: boolean
    title?: string
    children: React.ReactNode
    actions: JSX.Element[]
}
export default function InternalDialog(props: DialogProps) {
    return (
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        <Dialog open={props.open} onClose={() => {}} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center">
                <Dialog.Panel className="bg-white w-full px-4 py-4">
                    <Dialog.Title className="text-2xl">{props.title}</Dialog.Title>
                    {props.children}
                    <div className="flex flex-row justify-end">{props.actions}</div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
