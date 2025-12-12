import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadToys, removeToy, setFilterBy } from '../store/actions/toy.actions.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys()
            .catch(err => showErrorMsg('Cannot load toys'))
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
                console.log('Toy removed, id:', toyId)
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    return (
        <section className="toy-index">
            <div className="flex justify-between align-center action-bar">
                <h2>Toy Inventory</h2>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/toy/edit"
                    sx={{
                        backgroundColor: '#087f81',
                        '&:hover': {
                            backgroundColor: '#066b6d',
                        }
                    }}
                >
                    Add Toy
                </Button>
            </div>

            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />

        </section>
    )
}