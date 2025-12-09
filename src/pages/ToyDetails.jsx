import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
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
                    style={{ maxWidth: '100%' }}
                />
            </div>

            <p>
                <strong>Labels:</strong> {toy.labels && toy.labels.join(', ')}
            </p>

            <p>
                <strong>In Stock:</strong> {toy.inStock ? 'Yes' : 'No'}
            </p>

            <p>
                <strong>Added at:</strong> {toy.createdAt ? new Date(toy.createdAt).toLocaleDateString() : 'N/A'}
            </p>

            <div className="actions">
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                <Link to="/toy">Back to List</Link>
            </div>
        </section>
    )
}