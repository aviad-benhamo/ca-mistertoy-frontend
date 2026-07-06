import { useEffect, useRef, useState } from "react"
import { eventBusService } from "../services/event-bus.service.js"
// const { useState, useEffect, useRef } = React

export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    function closeMsg() {
        setMsg(null)
    }

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            // window.scrollTo({top: 0, behavior: 'smooth'});
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current)
                timeoutIdRef.current = null
            }
            timeoutIdRef.current = setTimeout(closeMsg, 3000)
        })
        return () => {
            if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)
            unsubscribe()
        }
    }, [])

    if (!msg) return <span></span>
    return (
        <section className={`user-msg ${msg.type}`}>
            <button onClick={closeMsg}>x</button>
            {msg.txt}
        </section>
    )
}
