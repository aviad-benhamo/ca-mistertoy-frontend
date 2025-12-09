import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {


    return (
        <article className="toy-preview">
            <header>
                <h4>{toy.name}</h4>
            </header>

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