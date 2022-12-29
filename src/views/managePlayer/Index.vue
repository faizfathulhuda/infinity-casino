<script>
import { POSITION, useToast } from 'vue-toastification'

import { useManagePlayer } from '@/store/managePlayer'
import addPlayerForm from '@/views/Component/addPlayerFormModal'
import deletePlayerModal from '@/views/Component/deletePlayerModal'
import editPlayerForm from '@/views/Component/editPlayerFormModal'
export default {
  components: { addPlayerForm, editPlayerForm, deletePlayerModal },
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
    dataPlayer: {
      name: null,
      balance: null
    }
  }),
  created() {
    this.fetchPlayer()
  },
  methods: {
    async fetchPlayer() {
      console.log(this.search)
      this.isLoading = true
      try {
        await this.managePlayer.fetchUsers({
          limit: this.limit,
          page: this.page,
          search: this.search
        })
        this.items = this.managePlayer.getUsers
        console.log(this.items)
        this.isLoading = false
      } catch (err) {
        this.toast.error(err.response.data.message, { timeout: 5000, position: POSITION.TOP_RIGHT })
        this.isLoading = false
        this.errorMessage = err.message
      }
    },
    testing() {
      console.log('masuk')
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

    <table class="table table-zebra w-full">
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
            <editPlayerForm
              :param-name="item.name"
              :param-balance="item.balance"
              :id-player="item.id"
              @update-list="fetchPlayer"
            />
            <deletePlayerModal
              :id-player="item.id"
              @update-list="fetchPlayer"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
.header-table {
  background-color: #393a3a;
  color: #fff;
}
</style>
