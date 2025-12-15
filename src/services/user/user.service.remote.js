import { httpService } from '../http.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getEmptyCredentials
}

async function login(credentials) {
    const user = await httpService.post('auth/login', credentials)
    if (user) {
        return _saveLocalUser(user)
    }
}

async function signup(signupInfo) {
    const user = await httpService.post('auth/signup', signupInfo)
    if (user) {
        return _saveLocalUser(user)
    }
}

async function logout() {
    try {
        await httpService.post('auth/logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    } catch (err) {
        console.error('Cannot logout:', err)
        throw err
    }
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}