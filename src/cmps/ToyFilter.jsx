import { useEffect, useState, useRef } from "react"
import { utilService } from "../services/util.service.js"
import { toyService } from "../services/toy.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilter, 500)).current

    const labels = toyService.getLabels()

    useEffect(() => {
        setFilterByToEdit({ ...filterBy })
    }, [filterBy])

    function handleChange({ target }) {
        let { name, value, type, checked } = target

        if (type === 'number') value = +value
        if (type === 'checkbox') value = checked

        if (name === 'inStock') {
            if (value === 'true') value = true
            else if (value === 'false') value = false
            else value = '' // All
        }

        const newFilter = { ...filterByToEdit, [name]: value }
        setFilterByToEdit(newFilter)

        if (name === 'name') {
            onSetFilterDebounce(newFilter)
        } else {
            onSetFilter(newFilter)
        }
    }

    function onLabelChange(label) {
        setFilterByToEdit(prevFilter => {
            const currentLabels = prevFilter.labels || []
            let newLabels

            if (currentLabels.includes(label)) {
                newLabels = currentLabels.filter(l => l !== label)
            } else {
                newLabels = [...currentLabels, label]
            }

            const newFilter = { ...prevFilter, labels: newLabels }
            onSetFilter(newFilter)
            return newFilter
        })
    }

    return (
        <section className="toy-filter" style={{ background: '#f8f8f8', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
            <h3>Filter Toys</h3>

            <div className="filter-row" style={{ display: 'flex', gap: '15px', alignItems: 'end', flexWrap: 'wrap' }}>

                <div className="filter-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Search by name..."
                        value={filterByToEdit.name}
                        onChange={handleChange}
                        style={{ padding: '5px' }}
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="inStock">Stock:</label>
                    <select
                        name="inStock"
                        id="inStock"
                        value={filterByToEdit.inStock === '' ? '' : filterByToEdit.inStock.toString()}
                        onChange={handleChange}
                        style={{ padding: '5px' }}
                    >
                        <option value="">All</option>
                        <option value="true">In Stock</option>
                        <option value="false">Out of Stock</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="sortBy">Sort:</label>
                    <select
                        name="sortBy"
                        id="sortBy"
                        value={filterByToEdit.sortBy || ''}
                        onChange={handleChange}
                        style={{ padding: '5px' }}
                    >
                        <option value="">None</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="createdAt">Created</option>
                    </select>
                </div>
            </div>

            <div className="filter-labels" style={{ marginTop: '10px' }}>
                <label>Labels:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '5px' }}>
                    {labels.map(label => (
                        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#fff', padding: '2px 8px', borderRadius: '10px', border: '1px solid #ddd' }}>
                            <input
                                type="checkbox"
                                id={`filter-label-${label}`}
                                checked={(filterByToEdit.labels || []).includes(label)}
                                onChange={() => onLabelChange(label)}
                            />
                            <label htmlFor={`filter-label-${label}`} style={{ cursor: 'pointer', fontSize: '0.9em' }}>{label}</label>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    )
}