<template>
  <label for="modal-player2"><fa-icon
    class="mr-3 cursor-pointer"
    icon="edit"
    fixed-width
  /></label>
  <input
    id="modal-player2"
    type="checkbox"
    class="modal-toggle"
  >
  <div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <div class="card-actions justify-end">
        <label
          for="modal-player2"
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
                      sm:h-[50px] sm:text-[20px] ${error.playerName.status ? 'border-[#F41616]' : 'border-black'}`
            ]"
            placeholder="Input your username"
            type="text"
          >
          <p
            v-if="error.playerName.status"
            class="font-poppins font-normal text-[#F41616] mt-[2px] text-[10px] sm:text-[15px] sm:mb-[5px]"
          >
            {{ error.playerName.message }}
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
            for="modal-player2"
            class="btn w-[100%] bg-[#C21010] hover:bg-[#C21010] text-[20px] normal-case"
            @click="onPressButton"
          >
            Save
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paramName: { type: String, default: () => '' },
    paramBalance: { type: Number, default: () => null }
  },
  data: () => ({
    dataPlayer: {
      name: '',
      balance: null
    },
    error: {
      playerName: {
        status: false,
        message: ''
      },
      balance: {
        status: false,
        message: ''
      }
    }
  })
}
</script>
