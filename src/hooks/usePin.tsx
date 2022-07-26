import {useState} from 'react'
const SESSION_CORRECT_PIN = '5c651293-3ef1-4ebe-9258-cfe7709762d7'

export function usePin(value: boolean): [boolean, (value: string) => void] {
    const [requirePin, setRequirePin] = useState(isPinRequired())

    function isPinRequired() {
        const correctPinAtTime = sessionStorage.getItem(SESSION_CORRECT_PIN)
        if (!correctPinAtTime) return value
        return value && Date.now() - +correctPinAtTime > 10 * 1000
    }

    function checkPin(value: string) {
        if (value !== '1958') return
        sessionStorage.setItem(SESSION_CORRECT_PIN, `${Date.now()}`)
        setRequirePin(false)
    }

    return [requirePin, checkPin]
}
