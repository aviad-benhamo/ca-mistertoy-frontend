import { useEffect, useState, useRef } from "react"
import { utilService } from "../services/util.service.js"
import { toyService } from "../services/toy.service.js"
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"

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

                {/* material-ui    */}
                <div className="filter-group" style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="name" style={{ marginRight: '5px' }}>Name:</label>
                    <TextField
                        variant="outlined"
                        size="small"
                        id="name"
                        name="name"
                        placeholder="Search by name..."
                        value={filterByToEdit.name || ''}
                        onChange={handleChange}
                        style={{ backgroundColor: 'white' }}
                    />
                </div>

                <div className="filter-group" style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="inStock" style={{ marginRight: '5px' }}>Stock:</label>
                    <FormControl size="small" style={{ minWidth: '120px', backgroundColor: 'white' }}>
                        <Select
                            id="inStock"
                            name="inStock"
                            value={filterByToEdit.inStock === '' ? '' : filterByToEdit.inStock.toString()}
                            onChange={handleChange}
                            displayEmpty
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="true">In Stock</MenuItem>
                            <MenuItem value="false">Out of Stock</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="filter-group" style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="sortBy" style={{ marginRight: '5px' }}>Sort:</label>
                    <FormControl size="small" style={{ minWidth: '120px', backgroundColor: 'white' }}>
                        <Select
                            id="sortBy"
                            name="sortBy"
                            value={filterByToEdit.sortBy || ''}
                            onChange={handleChange}
                            displayEmpty
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="name">Name</MenuItem>
                            <MenuItem value="price">Price</MenuItem>
                            <MenuItem value="createdAt">Created</MenuItem>
                        </Select>
                    </FormControl>
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