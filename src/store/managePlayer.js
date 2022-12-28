import Cryptojs from 'crypto-js'
import { defineStore } from 'pinia'

import api from '@/api'
import { KEY_HASH_CRYPTO } from '@/fixtures/hash'
import { KEY_ME } from '@/fixtures/key'

const encMeKey = btoa(KEY_ME)

export const useManagePlayer = defineStore('managePlayer', {
  state: () => ({
    me: localStorage.getItem(encMeKey) || null,
    list: null
  }),

  getters: {
    getMe: state => state.me
      ? JSON.parse(Cryptojs.AES.decrypt(state.me, KEY_HASH_CRYPTO).toString(Cryptojs.enc.Utf8))
      : null,
    getUsers: state => state.list
      ? state.list
      : null
  },

  // const mutations = {
  //   SET_ME: (state, payload) => {
  //     state.me = payload
  //     localStorage.setItem(encMeKey, payload)
  //   },
  //   SET_LIST: (state, payload) => {
  //     state.list = payload
  //   },
  //   REMOVE_ME: (state) => {
  //     state.me = null
  //     localStorage.removeItem(encMeKey)
  //   }
  // },

  actions: {
    removeMe() {
      this.me = null
      localStorage.removeItem(encMeKey)
    },
    setMe(payload) {
      const encMe = Cryptojs.AES.encrypt(payload, KEY_HASH_CRYPTO).toString()
      localStorage.setItem(encMeKey, encMe)
    
      this.me = encMe
    },
    async fetchMe(payload) {
      try {
        const { data: { data } } = await api.managePlayer.getUser(payload)
        console.log(data)
        // this.setMe(data.data.token)
      } catch (err) {
        throw err
      }
    },
    async fetchUsers(payload) {
      try {
        const { data: { data } } = await api.managePlayer.list(payload)
        console.log(data)
        this.list = data
      } catch (err) {
        throw err
      }
    },
    async editRole(id, payload) {
      try {
        await api.managePlayer.updateUser(id, payload)
      } catch (err) {
        throw err
      }
    },
    async createUser(payload) {
      try {
        await api.managePlayer.createUser(payload)
      } catch (err) {
        throw err
      }
    },
    async deleteUser(payload) {
      try {
        await api.managePlayer.deleteUser(payload)
      } catch (err) {
        throw err
      }
    }
  }
})
