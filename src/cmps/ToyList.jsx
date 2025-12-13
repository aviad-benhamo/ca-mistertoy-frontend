import { ToyPreview } from './ToyPreview.jsx'
import { CircularProgress } from '@mui/material'

export function ToyList({ toys, isLoading, onRemoveToy }) {
    if (isLoading) return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <CircularProgress style={{ color: 'var(--clr1)' }} />
        </div>
    )

    if (!toys.length) return (
        <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.2rem', color: '#666' }}>
            No toys found matching your criteria...
        </div>
    )

    return (
        <ul className="toy-list clean-list">
            {toys.map(toy => (
                <li key={toy._id}>
                    <ToyPreview toy={toy}
                        onRemoveToy={onRemoveToy} />
                </li>
            ))}
        </ul>
    )
}