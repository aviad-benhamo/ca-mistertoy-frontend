import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, signup } from '../store/actions/user.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'

export function LoginSignup() {
    const [isSignup, setIsSignup] = useState(false)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const navigate = useNavigate()

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    async function handleSubmit(ev) {
        ev.preventDefault()
        try {
            const method = isSignup ? signup : login
            const user = await method(credentials)

            showSuccessMsg(`Welcome ${user.fullname}`)
            navigate('/toy')

        } catch (err) {
            showErrorMsg('Oops try again')
            console.log('LoginSignup -> err:', err)
        }
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
        setCredentials(userService.getEmptyCredentials())
    }

    return (
        <section className="login-page">
            <div className="login-container">
                <h2>{isSignup ? 'Signup' : 'Login'}</h2>

                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    {isSignup && (
                        <input
                            type="text"
                            name="fullname"
                            value={credentials.fullname}
                            placeholder="Full name"
                            onChange={handleChange}
                            required
                        />
                    )}
                    <button className="btn-action">{isSignup ? 'Signup' : 'Login'}</button>
                </form>

                <div className="btns">
                    <a href="#" onClick={(ev) => {
                        ev.preventDefault()
                        toggleSignup()
                    }}>
                        {isSignup ?
                            'Already a member? Login' :
                            'New user? Signup here'
                        }
                    </a>
                </div>
            </div>
        </section>
    )
}