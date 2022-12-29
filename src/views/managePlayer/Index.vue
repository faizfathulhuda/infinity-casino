<script>
import { POSITION, useToast } from 'vue-toastification'

import api from '@/api'
import { useManagePlayer } from '@/store/managePlayer'
import addPlayerForm from '@/views/Component/addPlayerFormModal'
import deletePlayerModal from '@/views/Component/deletePlayerModal'
export default {
  components: { addPlayerForm, deletePlayerModal },
  setup() {
    const managePlayer = useManagePlayer()
    const toast = useToast()
    return { managePlayer, toast }
  },
  data: () => ({
    limit: 10,
    page: 1,
    search: '',
    totalRows: 10,
    pageOptions: [10, 20, 50, 100, 500, 1000],
    sortBy: '',
    sortDesc: false,
    items: [],
    fields: [
      { key: 'id', label: 'ID', sortable: true },
      { key: 'user', label: 'User', sortable: true },
      { key: 'balance', label: 'Balance', sortable: true },
      { key: 'action', label: 'Action' }
    ],
    errorMessage: null,
    isLoading: false,
    showModal: {
      addPlayer: false,
      deletePlayer: false,
      editPlayer: false
    },
    typeModal: 'Edit Player',
    idPlayer:null,
    dataPlayer: {
      name: null,
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
  created() {
    this.fetchPlayer()
  },
  methods: {
    async fetchPlayer() {
      this.isLoading = true
      try {
        await this.managePlayer.fetchUsers({
          limit: this.limit,
          page: this.page,
          search: this.search
        })
        this.items = this.managePlayer.getUsers
        this.isLoading = false
      } catch (err) {
        this.toast.error(err.response.data.message, { timeout: 5000, position: POSITION.TOP_RIGHT })
        this.isLoading = false
        this.errorMessage = err.message
      }
    },
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
      if (typeof this.dataPlayer.balance !== 'number') {
        this.error.balance = { status: true, message: 'Balance harus di isi' }
        return false
      } else {
        this.error.balance = { status: false }
        return true
      }
    },
    async handleEditPlayer() {
      this.typeLabel = ''
      if (this.validationPlayerName() & this.validationBalance()) {
        try {
          this.typeLabel = `modal-player${this.idPlayer}`
          const response = await api.managePlayer.updateUser(this.idPlayer, this.dataPlayer)
          if (response.status === 200) {
            this.fetchPlayer()
            this.toast.success('Berhasil memperbarui data pemain', { timeout: 5000, position: POSITION.TOP_RIGHT })
          } else {
            this.toast.error(response.data.message, { timeout: 5000, position: POSITION.TOP_RIGHT })
          }
        } catch (err) {
          
          this.toast.error(err.response.data.message, { timeout: 5000, position: POSITION.TOP_RIGHT })
        }
      }
    },
    setValue(id, name, balance) {
      this.idPlayer = id
      this.dataPlayer.name = name
      this.dataPlayer.balance = balance
    }
  }
}
</script>

<template class="login">
  <div class="mt-10 mx-6">
    <div class="flex align-items-center justify-between mb-5">
      <addPlayerForm @update-list="fetchPlayer" />
      <input
        v-model="search"
        :class="[
          `placeholder:text-[#686868] text-[14px] rounded-[10px] border-solid border px-[10px] bg-white w-[25%]
                      sm:h-[48px] sm:text-[20px]`
        ]"
        placeholder="Search..."
        @change="fetchPlayer"
      >
    </div>

    <table
      ref="tableplayer"
      class="table table-zebra w-full"
    >
      <!-- head -->
      <thead class="header-table">
        <tr>
          <th class="bg-[#393A3A]">
            ID
          </th>
          <th class="bg-[#393A3A]">
            User
          </th>
          <th class="bg-[#393A3A]">
            Balance
          </th>
          <th class="bg-[#393A3A]">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="index"
        >
          <th>{{ index + 1 }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.balance }}</td>
          <td>
            <label
              :for="'modal-player' + idPlayer"
              @click="setValue(item.id,item.name,item.balance)"
            ><fa-icon
              class="mr-3 cursor-pointer"
              icon="edit"
              fixed-width
            /></label>

            <deletePlayerModal
              v-model:id-player="item.id"
              @update-list="fetchPlayer"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <input
      :id="'modal-player' + idPlayer"
      type="checkbox"
      class="modal-toggle"
    >
    <div class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <div class="card-actions justify-end">
          <label
            :for="'modal-player' + idPlayer"
            class="btn btn-square bg-transparent border-none hover:bg-transparent hover:border-none"
          >
            <img src="@/assets/icons/ic_cross.svg">
          </label>
        </div>
        <h2 class="card-title font-poppins justify-center text-[30px] font-medium">
          Edit Player
        </h2>

        <div class="card-body">
          <div class="">
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
              @click="handleEditPlayer"
            >
              Save
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.header-table {
  background-color: #393a3a;
  color: #fff;
}
</style>
