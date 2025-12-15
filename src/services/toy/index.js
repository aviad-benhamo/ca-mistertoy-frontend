const { DEV, VITE_LOCAL } = import.meta.env

import { toyService as local } from './toy.service.local.js'
import { toyService as remote } from './toy.service.remote.js'

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

const service = (VITE_LOCAL === 'true') ? local : remote
export const toyService = { getEmptyToy, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.toyService = toyService
