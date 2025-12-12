import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys, onRemoveToy }) {

    if (!toys.length) return <div>No toys found...</div>

    return (
        <ul className="toy-list clean-list">
            {toys.map(toy => (
                <li key={toy._id}>
                    <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
                </li>
            ))}
        </ul>
    )
}