import { storageService } from '../async-storage.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getEmptyCredentials
}

async function getById(userId) {
    try {
        const user = await storageService.get(STORAGE_KEY, userId)
        return user
    } catch (err) {
        console.error(`user.service: Cannot get user ${userId}`, err)
        throw err
    }
}

async function login({ username, password }) {
    try {
        const users = await storageService.query(STORAGE_KEY)
        const user = users.find(user => user.username === username)

        if (user) {
            return _setLoggedinUser(user)
        } else {
            throw new Error('Invalid login')
        }
    } catch (err) {
        console.error('user.service: Cannot login', err)
        throw err
    }
}

async function signup({ username, password, fullname }) {
    try {
        const user = { username, password, fullname }
        const savedUser = await storageService.post(STORAGE_KEY, user)
        return _setLoggedinUser(savedUser)
    } catch (err) {
        console.error('user.service: Cannot signup', err)
        throw err
    }
}

async function logout() {
    try {
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (err) {
        console.error('user.service: Cannot logout', err)
        throw err
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = {
        _id: user._id,
        fullname: user.fullname,
        isAdmin: user.isAdmin,
        score: user.score || 0
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}