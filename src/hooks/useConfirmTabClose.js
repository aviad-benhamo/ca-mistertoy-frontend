import { useEffect, useRef } from 'react'

export function useConfirmTabClose() {
    const hasUnsavedChangesRef = useRef(false)

    function confirmUnload(ev) {
        if (hasUnsavedChangesRef.current) ev.preventDefault()
    }

    useEffect(() => {
        window.addEventListener('beforeunload', confirmUnload)
        
        return () => 
            window.removeEventListener('beforeunload', confirmUnload)
    }, [])

    return value => hasUnsavedChangesRef.current = value
}