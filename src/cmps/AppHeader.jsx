import { NavLink } from 'react-router-dom'
import { useOnlineStatus } from '../hooks/useOnlineStatus'

export function AppHeader() {
    const isOnline = useOnlineStatus()

    return (
        <section className="app-header">
            <section className="nav-wrapper flex justify-between">
                <nav>
                    <NavLink to="/">Home</NavLink> |
                    <NavLink to="/toy"> Toys</NavLink> |

                </nav>
                <p>{isOnline ? '✅ Online' : '❌ Disconnected'}</p>
            </section>
            <div className="logo">Mister Toy</div>
        </section>
    )
}
