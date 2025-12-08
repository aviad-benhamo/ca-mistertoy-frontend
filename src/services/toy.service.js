import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getLabels
}

_createToys()

function query(filterBy = {}) {
    console.log('toyService query received filter:', filterBy)


    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.inStock !== undefined && filterBy.inStock !== '' && filterBy.inStock !== 'all') {
                const isInStock = (filterBy.inStock === 'true' || filterBy.inStock === true)
                toys = toys.filter(toy => toy.inStock === isInStock)
            }

            if (filterBy.labels && filterBy.labels.length) {
                toys = toys.filter(toy =>
                    toy.labels && toy.labels.some(label => filterBy.labels.includes(label))
                )
            }

            // (Sort)
            if (filterBy.sortBy) {
                if (filterBy.sortBy === 'name') {
                    toys.sort((t1, t2) => t1.name.localeCompare(t2.name))
                } else if (filterBy.sortBy === 'price') {
                    toys.sort((t1, t2) => t1.price - t2.price)
                } else if (filterBy.sortBy === 'createdAt') {
                    toys.sort((t1, t2) => t1.createdAt - t2.createdAt)
                }
            }

            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        toy.createdAt = Date.now()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: true,
        imgUrl: ''
    }
}

function getDefaultFilter() {
    return { txt: '', inStock: 'all', labels: [] }
}

function getLabels() {
    return [...labels]
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            _createToy('Talking Doll', 123, ['Doll', 'Battery Powered', 'Baby']),
            _createToy('Remote Car', 50, ['On wheels', 'Battery Powered']),
            _createToy('Puzzle Box', 35, ['Box game', 'Puzzle']),
            _createToy('Teddy Bear', 80, ['Doll', 'Baby'])
        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

function _createToy(name, price, labels) {
    return {
        _id: utilService.makeId(),
        name,
        price,
        labels,
        createdAt: Date.now(),
        inStock: true,
        imgUrl: `https://robohash.org/${name}?set=set4`
    }
}