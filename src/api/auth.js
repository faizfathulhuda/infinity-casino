import request from '@/utils/request'
const login = credential => request.post('/auth/login', credential)

export default {
  login
}
