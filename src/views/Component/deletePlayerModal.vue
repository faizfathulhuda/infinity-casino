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
        class="mx-[10%]"
        src="@/assets/image/img_delete_player.svg"
      >
      <div class="font-poppins mx-[10%]  whitespace-normal text-center font-normal text-[20px]">
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
          @click="onPressButton"
        >
          Yes
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({})
}
</script>
