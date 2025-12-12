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
        <section className="toy-filter">
            <h3>Filter Toys</h3>

            <div className="filter-row">

                {/* Name Filter */}
                <div className="filter-group">
                    <TextField
                        variant="outlined"
                        size="small"
                        id="name"
                        name="name"
                        placeholder="Search by name..."
                        value={filterByToEdit.name || ''}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white' }}
                    />
                </div>

                {/* Stock Filter */}
                <div className="filter-group">
                    <label htmlFor="inStock">Stock:</label>
                    <FormControl size="small" sx={{ minWidth: 120, backgroundColor: 'white' }}>
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

                {/* Sort Filter */}
                <div className="filter-group">
                    <label htmlFor="sortBy">Sort:</label>
                    <FormControl size="small" sx={{ minWidth: 120, backgroundColor: 'white' }}>
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

            <div className="filter-labels">
                <label>Labels:</label>
                <div className="labels-list">
                    {labels.map(label => (
                        <div key={label} className="label-item">
                            <input
                                type="checkbox"
                                id={`filter-label-${label}`}
                                checked={(filterByToEdit.labels || []).includes(label)}
                                onChange={() => onLabelChange(label)}
                            />
                            <label htmlFor={`filter-label-${label}`}>{label}</label>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    )
}