import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys, onRemoveToy }) {

    if (!toys.length) return <div>No toys found...</div>

    return (
        <ul className="toy-list clean-list">
            {toys.map(toy => (
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div style={{ marginTop: '10px' }}>
                        <button
                            onClick={() => onRemoveToy(toy._id)}
                            className="danger-btn"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}