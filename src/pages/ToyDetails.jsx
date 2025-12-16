import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toyService } from '../services/toy'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { Popup } from '../cmps/Popup'
import { Chat } from '../cmps/Chat'
import { addToyMsg, removeToyMsg } from '../store/actions/toy.actions.js'
import { CircularProgress } from '@mui/material'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [msgTxt, setMsgTxt] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const { toyId } = useParams()
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    useEffect(() => {
        window.addEventListener('keyup', handleIsOpen)
        return () => {
            window.removeEventListener('keyup', handleIsOpen)
        }
    }, [])

    useEffect(() => {
        loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        }
        catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }

    function handleIsOpen({ key }) {
        if (key === 'Escape') setIsOpen(false)
    }

    async function onSaveMsg(ev) {
        ev.preventDefault()
        try {
            const msg = await addToyMsg(toy._id, msgTxt)
            // Update local state to show the new message immediately
            setToy(prevToy => ({
                ...prevToy,
                msgs: [...(prevToy.msgs || []), msg]
            }))
            setMsgTxt('')
            showSuccessMsg('Review added')
        } catch (err) {
            showErrorMsg('Cannot add review')
        }
    }

    async function onRemoveMsg(msgId) {
        try {
            await removeToyMsg(toy._id, msgId)
            setToy(prevToy => ({
                ...prevToy,
                msgs: prevToy.msgs.filter(msg => msg.id !== msgId)
            }))
            showSuccessMsg('Review removed')
        } catch (err) {
            console.error('Failed to remove review:', err)
            showErrorMsg('Cannot remove review')
        }
    }

    if (!toy) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress style={{ color: 'var(--clr1)' }} />
        </div>
    )
    return (
        <section className="toy-details">
            <h1>Toy Details</h1>
            <h2>{toy.name}</h2>
            <h3>Price: ${toy.price}</h3>

            <div className="toy-img">
                <img
                    src={toy.imgUrl || `https://robohash.org/${toy.name}?set=set4`}
                    alt={toy.name}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = `https://robohash.org/${toy.name}?set=set4`;
                    }}
                />
            </div>

            <p>
                <strong>Labels:</strong> {toy.labels && toy.labels.join(', ')}
            </p>

            <p>
                <strong>In Stock:</strong> {toy.inStock ? <span className="in-stock">Yes</span> : <span className="out-of-stock">No</span>}
            </p>

            <p>
                <strong>Added at:</strong> {toy.createdAt ? new Date(toy.createdAt).toLocaleDateString() : 'N/A'}
            </p>

            <div className="toy-msgs">
                <h3>Reviews</h3>

                {user && (
                    <form className="msg-form" onSubmit={onSaveMsg}>
                        <input
                            type="text"
                            name="msg"
                            value={msgTxt}
                            onChange={(e) => setMsgTxt(e.target.value)}
                            placeholder="Your opinion?"
                            required
                        />
                        <button>Add</button>
                    </form>
                )}

                {!toy.msgs || !toy.msgs.length && <span>No reviews yet...</span>}

                <ul className="msg-list clean-list">
                    {toy.msgs && toy.msgs.map(msg => (
                        <li key={msg.id}>
                            <h4>{msg.by.fullname}</h4>
                            <p>{msg.txt}</p>
                            {user && (user._id === msg.by._id || user.isAdmin) && (
                                <button
                                    type="button"
                                    className="btn-remove-msg"
                                    onClick={() => onRemoveMsg(msg.id)}
                                >
                                    X
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="actions">
                {/* Only Admin can edit */}
                {user && user.isAdmin && (
                    <Link to={`/toy/edit/${toy._id}`}><button className="btn-edit">Edit</button></Link>
                )}


                <Link to="/toy"><button className="btn-back">Back</button></Link>
                <button onClick={() => { setIsOpen(true) }} >
                    Get Help
                </button>
            </div>
            {isOpen && (
                <Popup
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    heading="Lets chat!"
                    footing={<button className="btn" onClick={() => setIsOpen(false)}>Close</button>}
                >
                    <Chat />
                </Popup>
            )}
        </section >
    )
}