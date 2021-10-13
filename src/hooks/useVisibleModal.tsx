import { useState } from 'react'

export const useVisibleModal = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const onOpenHandler = () => setIsVisible(true)
    const onCloseHandler = () => setIsVisible(false)

    return { isVisible, onCloseHandler, onOpenHandler }
}
