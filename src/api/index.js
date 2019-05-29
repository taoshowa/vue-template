import request from '@/utils/request'

export const loginByUsername = (username, password) => request({ url: '/auth/login', method: 'post', data: { username, password } })

export const getUserInfo = () => request({ url: '/users/findCurrentUser', method: 'get' })

export const logout = (token) => request({ url: '/auth/logout', method: 'get', params: token })
