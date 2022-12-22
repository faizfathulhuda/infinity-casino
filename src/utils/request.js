import axios from 'axios'

import router from '@/router'
import { useAuth } from '@/store/auth'

const UNAUTHORIZED_URLS = ['/login']

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_BACKEND_URL}`,
  timeout: 1000000
})

const refreshInstance = axios.create({
  baseURL: `${process.env.VUE_APP_BACKEND_URL}`,
  timeout: 10000
})

const refresh = async originalRequest => {
  try {
    const auth = useAuth()
    const { data } = await refreshInstance.post('auth/refresh-token', {
      token: localStorage.getItem('token'),
      refreshToken: localStorage.getItem('refreshToken')
    })
    auth.setToken(data.token)

    return instance({
      ...originalRequest,
      headers: {
        Authorization: `Bearer ${auth.getToken}`,
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    await localStorage.clear()
    router.push('/')
    return Promise.reject(error)
  }
}
instance.interceptors.request.use(req => {
  const auth = useAuth()
  if (!UNAUTHORIZED_URLS.includes(req.url)) {
    req.headers['Authorization'] = `Bearer ${auth.getToken}`
  }
  return req
})

instance.interceptors.response.use(
  response => response,
  error => {
    const loginRequest = error.config.url.endsWith('login')
    const unauthorized = error.response.status === 401
    const sessionInvalid = error.response.status === 440
    const permission = error.response.status === 403

    if (!loginRequest && unauthorized) {
      return refresh(error.config)
    }

    if (!loginRequest && sessionInvalid) {
      return refresh(error.config)
    }

    if (permission) {
      router.replace('/ForbiddenPage')
    }

    return Promise.reject(error)
  }
)

export default instance
