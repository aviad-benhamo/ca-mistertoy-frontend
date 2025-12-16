import { httpService } from '../http.service.js'

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    addMsg,
    removeMsg,
    getLabels,
    getEmptyToy,
    getDefaultFilter

}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function addMsg(toyId, txt) {
    return httpService.post(BASE_URL + toyId + '/msg', { txt })
}

function removeMsg(toyId, msgId) {
    return httpService.delete(BASE_URL + toyId + '/msg/' + msgId)
}

function getLabels() {
    return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
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
    return {
        txt: '',
        inStock: '',
        labels: []
    }
}