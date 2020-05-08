import { useRef } from 'react'

export function useThrottle (fn: any, delay: number) {
    const {current} = useRef<any>()

    function f (...args: any[]) {
        if (!current.timer) {
            current.timer = setTimeout(() => {
                delete current.timer
            }, delay)
            fn(...args)
        }
    }

    return f
}
