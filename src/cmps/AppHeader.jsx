import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useOnlineStatus } from '../hooks/useOnlineStatus'
import { logout } from '../store/actions/user.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function AppHeader() {
    const isOnline = useOnlineStatus()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const navigate = useNavigate()

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Bye now')
            navigate('/login')
        } catch {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <section className="app-header">
            <div className="logo">Mister Toy</div>

            <nav className="main-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy" end> Toys</NavLink>
                <NavLink to="/toy/dashboard"> Dashboard</NavLink>
                <NavLink to="/toy/about"> About</NavLink>
            </nav>

            <div className="user-section">
                {user ? (
                    <span className="user-info">
                        Hello {user.fullname},&nbsp;
                        <button onClick={onLogout} className="btn-link">Logout</button>
                    </span>
                ) : (
                    <NavLink to="/login">Login</NavLink>
                )}

                <p className="user-status" style={{ fontSize: '0.8rem', marginTop: '5px' }}>
                    {isOnline ? '✅ Online' : '❌ Disconnected'}
                </p>
            </div>
        </section>
    )
}
