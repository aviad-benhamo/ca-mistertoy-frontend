import { Link } from 'react-router-dom'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import Tooltip from '@mui/material/Tooltip'; // חובה לייבא
import IconButton from '@mui/material/IconButton';


export function ToyPreview({ toy, onRemoveToy }) {


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
                        currentTarget.src = `https://robohash.org/${toy.name}?set=set4`
                    }}
                    style={{ maxWidth: '100%' }}
                />
            </div>

            <p>Price: ${toy.price}</p>

            <p style={{ color: toy.inStock ? 'green' : 'red', fontWeight: 'bold' }}>
                {toy.inStock ? 'In Stock' : 'Out of Stock'}
            </p>


            <div className="actions flex justify-center align-center" style={{ gap: '10px', marginTop: '10px' }}>

                {/* Details Button */}
                <Tooltip title="Details">
                    <IconButton
                        component={Link}
                        to={`/toy/${toy._id}`}
                        color="primary"
                        aria-label="details"
                    >
                        <InfoOutlinedIcon />
                    </IconButton>
                </Tooltip>

                {/* Edit Button */}
                <Tooltip title="Edit">
                    <IconButton
                        component={Link}
                        to={`/toy/edit/${toy._id}`}
                        color="primary"
                        aria-label="edit"
                    >
                        <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                </Tooltip>

                {/* Delete Button */}
                <Tooltip title="Delete">
                    <IconButton
                        onClick={() => onRemoveToy(toy._id)}
                        aria-label="delete"
                    >
                        <DeleteOutlineOutlinedIcon
                            sx={{
                                color: 'var(--clr2bg)',
                                cursor: 'pointer',
                                transition: '0.2s',
                                '&:hover': {
                                    color: 'var(--clr2bg-light)',
                                    transform: 'scale(1.1)'
                                }
                            }}
                        />
                    </IconButton>
                </Tooltip>

            </div>
        </article>
    )
}