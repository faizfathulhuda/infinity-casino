<template>
  <label for="modal-delete-player"><fa-icon
    class="mr-3 cursor-pointer"
    icon="trash-alt"
    fixed-width
  /></label>
  <input
    id="modal-delete-player"
    type="checkbox"
    class="modal-toggle"
  >
  <div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <img
        class="mx-[10%] sm:mx-[20%]"
        src="@/assets/image/img_delete_player.svg"
      >
      <div class="font-poppins sm:mx-[10%] my-5 whitespace-normal text-center font-normal text-[20px]">
        Are you sure you want to delete this player data?
      </div>
      <div class="flex ml-[20%] mt-[17px]">
        <label
          for="modal-delete-player"
          class="btn w-[30%] font-poppins font-normal text-[#C21010] border-[#C21010] bg-transparent hover:bg-transparent text-[20px] normal-case"
          @click="onPressButton"
        >
          Cancel
        </label>
        <label
          for="modal-delete-player"
          class="btn w-[30%] ml-[10%] bg-[#C21010] font-poppins font-normal hover:bg-[#C21010] text-[20px] normal-case"
          @click="handleDeletePlayer"
        >
          Yes
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { POSITION, useToast } from 'vue-toastification'

import api from '@/api'
export default {
  emits:['update-list'],
  props: {
    idPlayer: { type: Number, default: () => null }
  },
  setup() {
    const toast = useToast()
    return {toast}
  },
  data: () => ({
  }),
  methods: {
    async handleDeletePlayer() {
      
      try {
        const response = await api.managePlayer.deleteUser(this.idPlayer)
        if (response.status === 200) {
          this.$emit('update-list')
          this.toast.success('Berhasil menghapus pemain', { timeout: 5000, position: POSITION.TOP_RIGHT })
        } else {
          this.toast.error(response.data.message,{timeout:5000,position:POSITION.TOP_RIGHT})
        }
      } catch (err) {
        this.toast.error(err.response.data.message,{timeout:5000,position:POSITION.TOP_RIGHT})
      }
    }
  }
}
</script>
