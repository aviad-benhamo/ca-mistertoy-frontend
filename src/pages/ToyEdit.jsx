import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { toyService } from '../services/toy'
import { saveToy } from '../store/actions/toy.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useConfirmTabClose } from '../hooks/useConfirmTabClose'

export function ToyEdit() {
    const navigate = useNavigate()
    const { toyId } = useParams()
    const setHasUnsavedChanges = useConfirmTabClose()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

    // Load available labels from service
    const labels = toyService.getLabels()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToyToEdit(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            navigate('/toy')
        }
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        price: Yup.number().required('Price is required').min(1, 'Price must be positive'),
        inStock: Yup.boolean()
    })

    const formik = useFormik({
        initialValues: toyToEdit,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            try {
                const savedToy = await saveToy(values)
                showSuccessMsg(`Toy Saved (id: ${savedToy._id})`)
                navigate('/toy')
            } catch (err) {
                showErrorMsg('Cannot save toy')
                console.log('err:', err)
            }
        }
    })

    // Update unsaved changes status when form is dirty
    useEffect(() => {
        // Only set dirty if the form has been touched or modified
        if (formik.dirty) {
            setHasUnsavedChanges(true)
        }
    }, [formik.dirty, setHasUnsavedChanges])

    function onLabelChange(label) {
        const currentLabels = formik.values.labels || []
        const newLabels = currentLabels.includes(label)
            ? currentLabels.filter(l => l !== label)
            : [...currentLabels, label]

        formik.setFieldValue('labels', newLabels)
    }

    // Determine if inputs should mark the form as dirty immediately
    function handleGenericChange(e) {
        formik.handleChange(e)
    }

    return (
        <section className="toy-edit">
            <h2>{formik.values._id ? 'Edit Toy' : 'Add Toy'}</h2>

            <form onSubmit={formik.handleSubmit}>

                {/* Name Field */}
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter toy name..."
                    value={formik.values.name || ''}
                    onChange={handleGenericChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                    <div className="error-msg" style={{ color: 'red' }}>{formik.errors.name}</div>
                )}

                {/* Price Field */}
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={formik.values.price !== undefined && formik.values.price !== null ? formik.values.price : ''}
                    onChange={handleGenericChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.price && formik.errors.price && (
                    <div className="error-msg" style={{ color: 'red' }}>{formik.errors.price}</div>
                )}

                {/* Labels Field (Custom handling) */}
                <div className="filter-labels" style={{ marginTop: '10px' }}>
                    <label>Labels:</label>
                    <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '15px', marginTop: '5px' }} className="labels-list">
                        {labels.map(label => (
                            <div key={label} className="label-item">
                                <input
                                    type="checkbox"
                                    id={`label-${label}`}
                                    checked={formik.values.labels?.includes(label) || false}
                                    onChange={() => onLabelChange(label)}
                                />
                                <label htmlFor={`label-${label}`}>{label}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* In Stock Field */}
                <div className="in-stock-container">
                    <label htmlFor="inStock">In Stock:</label>
                    <input
                        type="checkbox"
                        name="inStock"
                        id="inStock"
                        checked={formik.values.inStock || false}
                        onChange={handleGenericChange}
                    />
                </div>

                <div className="actions">
                    <button type="submit" disabled={!formik.isValid || !formik.dirty}>
                        {formik.values._id ? 'Save' : 'Add'}
                    </button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )
}