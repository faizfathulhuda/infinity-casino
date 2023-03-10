import request from '@/utils/request'
const list = form => request.get(`/players?limit=${form.limit}&page=${form.page}&search=${form.search}`)
const createUser = form => request.post('/players', form)
const updateUser = (id, form) => request.put(`/players/${id}`, form)
const getUser = id => request.get(`/players/${id}`)
const deleteUser = id => request.delete(`/players/${id}`)

export default {
  list,
  createUser,
  updateUser,
  getUser,
  deleteUser
}
