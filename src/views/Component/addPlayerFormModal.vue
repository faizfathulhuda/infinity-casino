<template>
  <label
    for="modal-player"
    class="btn bg-[#393A3A] normal-case border-none w-[25%]"
  >Add Player</label>
  <input
    id="modal-player"
    type="checkbox"
    class="modal-toggle"
  >
  <div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <div class="card-actions justify-end">
        <label
          for="modal-player"
          class="btn btn-square bg-transparent border-none hover:bg-transparent hover:border-none"
        >
          <img src="@/assets/icons/ic_cross.svg">
        </label>
      </div>
      <h2 class="card-title font-poppins justify-center text-[30px] font-medium">
        Add Player
      </h2>

      <div class="card-body">
        <div>
          <p class="font-poppins font-normal text-[20px] mb-1">
            Player Name
          </p>
          <input
            v-model="dataPlayer.name"
            :class="[
              `placeholder:text-[#686868] h-[40px] w-[100%] text-[black] text-[14px] rounded-[10px] border-solid border px-[10px] bg-white
                      sm:h-[50px] sm:text-[20px] ${error.name.status ? 'border-[#F41616]' : 'border-black'}`
            ]"
            placeholder="Input your username"
            type="text"
          >
          <p
            v-if="error.name.status"
            class="font-poppins font-normal text-[#F41616] mt-[2px] text-[10px] sm:text-[15px] sm:mb-[5px]"
          >
            {{ error.name.message }}
          </p>
        </div>
        <div class="mb-[32px]">
          <p class="font-poppins font-normal text-[20px] mb-1">
            Balance
          </p>
          <input
            v-model="dataPlayer.balance"
            :class="[
              `placeholder:text-[#686868] h-[40px] w-[100%] text-[black] text-[14px] rounded-[10px] border-solid border px-[10px] bg-white
             sm:h-[50px] sm:text-[20px] ${error.balance.status ? 'border-[#F41616]' : 'border-black'}`
            ]"
            placeholder="Input your balance"
            type="number"
          >
          <p
            v-if="error.balance.status"
            class="font-poppins font-normal text-[#F41616] mt-[2px] text-[10px] sm:text-[15px] sm:mb-[5px]"
          >
            {{ error.balance.message }}
          </p>
        </div>
        <div class="modal-action">
          <label
            :for="typeLabel"
            class="btn w-[100%] bg-[#C21010] hover:bg-[#C21010] text-[20px] normal-case"
            @click="handleAddPlayer"
          > Add </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {POSITION ,useToast } from 'vue-toastification'

import api from '@/api'
export default {
  emits:['update-list'],
  setup() {
    const toast = useToast()
    return { toast }
  },
  data: () => ({
    dataPlayer: {
      name: '',
      balance: null
    },
    error: {
      name: {
        status: false,
        message: ''
      },
      balance: {
        status: false,
        message: ''
      }
    },
    typeLabel: ''
  }),
  methods: {
    validationPlayerName() {
      if (this.dataPlayer.name.replace(/\s/g, '').length > 10) {
        this.error.name = { status: true, message: 'Nama pemain tidak boleh lebih dari 10 karakter' }
        return false
      } else if (this.dataPlayer.name.replace(/\s/g, '').length < 5) {
        this.error.name = { status: true, message: 'Nama pemain tidak boleh kurang dari 5 karakter' }
        return false
      } else if (this.dataPlayer.name.replace(/\s/g, '').length === 0) {
        this.error.name = { status: true, message: 'Nama pemain harus di isi' }
        return false
      } else {
        this.error.name = { status: false }
        return true
      }
    },
    validationBalance() {
      if (this.dataPlayer.balance === null) {
        this.error.balance = { status: true, message: 'Balance harus di isi' }
        return false
      } else {
        this.error.balance = { status: false }
        return true
      }
    },
    async handleAddPlayer() {
      this.typeLabel = ''
      if (this.validationPlayerName() & this.validationBalance()) {
        try {
          const response = await api.managePlayer.createUser(this.dataPlayer)
          if (response.status === 201) {
            this.typeLabel = 'modal-player'
            this.$emit('update-list')
            this.toast.success('Berhasil menambahkan pemain', { timeout: 5000, position: POSITION.TOP_RIGHT })
          } else {
            this.toast.error(response.data.message, { timeout: 5000, position: POSITION.TOP_RIGHT })
          }
        } catch (err) {
          this.toast.error(err.response.data.message, { timeout: 5000, position: POSITION.TOP_RIGHT })
        }
        this.dataPlayer ={name:'',balance:null}
      }
    }
  }
}
</script>
