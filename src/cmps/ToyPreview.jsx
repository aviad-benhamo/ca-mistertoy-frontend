import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {

    function getIcon(type) {
        switch (type) {
            case 'Action': return <span style={{ fontSize: '40px' }}>🚀</span>
            case 'Educational': return <span style={{ fontSize: '40px' }}>🧩</span>
            case 'Funny': return <span style={{ fontSize: '40px' }}>📦</span>
            default: return <span style={{ fontSize: '40px' }}>🚗</span>
        }
    }

    return (
        <article className="toy-preview">
            <header>
                <h4>{toy.name}</h4>
            </header>

            <div style={{ marginBlock: '10px', color: '#555' }}>
                {getIcon(toy.type)}
            </div>

            <p>Price: ${toy.price}</p>

            <p style={{ color: toy.inStock ? 'green' : 'red', fontWeight: 'bold' }}>
                {toy.inStock ? 'In Stock' : 'Out of Stock'}
            </p>

            <div className="actions flex justify-center" style={{ gap: '10px', marginTop: '10px' }}>
                <Link to={`/toy/${toy._id}`} title="Details" className="btn-link" style={{ fontSize: '20px', textDecoration: 'none' }}>
                    ℹ️
                </Link>
                <Link to={`/toy/edit/${toy._id}`} title="Edit" className="btn-link" style={{ fontSize: '20px', textDecoration: 'none' }}>
                    ✏️
                </Link>
            </div>
        </article>
    )
}