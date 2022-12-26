import Cryptojs from 'crypto-js'
import { defineStore } from 'pinia'

import api from '@/api'
import { KEY_HASH_CRYPTO } from '@/fixtures/hash'
import { KEY_ME, KEY_TOKEN } from '@/fixtures/key'

const encTokenKey = btoa(KEY_TOKEN)
const encMeKey = btoa(KEY_ME)

export const useAuth = defineStore('auth', {
  state: () => ({
    isAuthenticated: !!localStorage.getItem(encTokenKey),
    token: localStorage.getItem(encTokenKey),
    me: localStorage.getItem(encMeKey)
  }),
  getters: {
    getToken: state => state.token
      ? Cryptojs.AES.decrypt(state.token, KEY_HASH_CRYPTO).toString(Cryptojs.enc.Utf8)
      : null,
    getMe: state => state.me
      ? JSON.parse(Cryptojs.AES.decrypt(state.me, KEY_HASH_CRYPTO).toString(Cryptojs.enc.Utf8))
      : null
  },
  actions: {
    async login(payload) {
      try {
        const { data } = await api.auth.login(payload)
        this.setToken(data.data.token)
        
      } catch (err) {
        throw err
      }
    },
    logout() {
      localStorage.removeItem(encTokenKey)
      localStorage.removeItem(encMeKey)
    },
    setToken(payload) {
      const encToken = Cryptojs.AES.encrypt(payload, KEY_HASH_CRYPTO).toString()
      localStorage.setItem(encTokenKey, encToken)
    
      this.token = encToken
      this.isAuthenticated = true
    }
  }
})