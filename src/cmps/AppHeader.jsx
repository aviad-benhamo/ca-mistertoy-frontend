import { NavLink } from 'react-router-dom'
import { useOnlineStatus } from '../hooks/useOnlineStatus'

export function AppHeader() {
    const isOnline = useOnlineStatus()

    return (
        <section className="app-header">
            <div className="logo">Mister Toy</div>

            <nav className="main-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy" end> Toys</NavLink>
                <NavLink to="/toy/dashboard"> Dashboard</NavLink>
                <NavLink to="/toy/about"> About</NavLink>
            </nav>

            <p className="user-status">
                {isOnline ? '✅ Online' : '❌ Disconnected'}
            </p>
        </section>
    )
}
