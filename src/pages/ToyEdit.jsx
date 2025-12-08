import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { saveToy } from '../store/actions/toy.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    // Load available labels from service
    const labels = toyService.getLabels()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        value = type === 'checkbox' ? target.checked : value

        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onLabelChange(label) {
        setToyToEdit(prevToy => {
            const labels = prevToy.labels.includes(label)
                ? prevToy.labels.filter(l => l !== label)
                : [...prevToy.labels, label]
            return { ...prevToy, labels }
        })
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then((savedToy) => {
                showSuccessMsg(`Toy Saved (id: ${savedToy._id})`)
                navigate('/toy')
            })
            .catch(err => {
                showErrorMsg('Cannot save toy')
                console.log('err:', err)
            })
    }

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit Toy' : 'Add Toy'}</h2>

            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter toy name..."
                    value={toyToEdit.name}
                    onChange={handleChange}
                />

                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price || ''}
                    onChange={handleChange}
                />

                <div className="labels-container">
                    <label>Labels:</label>
                    <div className="labels-list">
                        {labels.map(label => (
                            <div key={label} className="label-item">
                                <input
                                    type="checkbox"
                                    id={`label-${label}`}
                                    checked={toyToEdit.labels.includes(label)}
                                    onChange={() => onLabelChange(label)}
                                />
                                <label htmlFor={`label-${label}`}>{label}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="in-stock-container">
                    <label htmlFor="inStock">In Stock:</label>
                    <input
                        type="checkbox"
                        name="inStock"
                        id="inStock"
                        checked={toyToEdit.inStock}
                        onChange={handleChange}
                    />
                </div>

                <div className="actions">
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )
}