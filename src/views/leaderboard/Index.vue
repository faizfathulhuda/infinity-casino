<template class="leaderboard">
  <div class="flex  sm:mx-[20%]">
    <div class="sm:w-[193px] h-[60%] w-[34%]  absolute bottom-0  ">
      <p class="font-Nunito relative font-extrabold text-[#627077]  text-center  sm:text-3xl">
        {{ leaderboardData[1]?.name }}
      </p>
      <div class="h-[100%] mt-[40px]   bg-gradient-to-r from-[#DB1212] to-[#F41616]">
        <img
          class="mx-[15%] w-[80%]"
          src="@/assets/icons/ic_2nd_place_medal.svg"
        >
        <p class="font-Nunito font-extrabold text-center mt-[10%]  text-[#ffffff] sm:text-3xl">
          {{ leaderboardData[1]?.balance }}
        </p>
      </div>
    </div>
    <div class="sm:w-[193px] h-[77%] w-[34%] sm:ml-[193px] absolute bottom-0 ml-[34%]">
      <p class="font-Nunito font-extrabold text-center  text-[#FFAC33] sm:text-3xl">
        {{ leaderboardData[0]?.name }}
      </p>
      <div class="h-[100%] mt-[40px]  bg-gradient-to-r from-[#DB1212] to-[#F41616]">
        <img
          class="mx-[15%] w-[80%]"
          src="@/assets/icons/ic_1st_place_medal.svg"
        >
        <p class="font-Nunito font-extrabold text-center mt-[10%]  text-[#ffffff] sm:text-3xl">
          {{ leaderboardData[0]?.balance }}
        </p>
      </div>
    </div>
    <div class="sm:w-[193px] h-[45%] w-[34%] sm:ml-[386px] absolute bottom-0 ml-[68%] ">
      <p class="font-Nunito font-extrabold text-center  text-[#7C4119] sm:text-3xl">
        {{ leaderboardData[2]?.name }}
      </p>
     
      <div class="h-[100%] mt-[40px] bg-gradient-to-r from-[#DB1212]  to-[#F41616]">
        <img
          class="mx-[15%] w-[80%]"
          src="@/assets/icons/ic_3rd_place_medal.svg"
        >
        <p class="font-Nunito font-extrabold text-center mt-[10%]  text-[#ffffff] sm:text-3xl">
          {{ leaderboardData[2]?.balance }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
export default {
  setup() {
    
  },
  data: () => ({
    leaderboardData: [],
    winner:''
  }),
  created() {
    this.fetchLeaderboard()
  },
  methods: {
    async fetchLeaderboard() {
      try {
        const { data } = await api.leaderboard.fetchLeaderboard()
        this.leaderboardData = data.data
        this.winner = this.leaderboardData[0]?.name.slice(0,5)
      } catch (err) {
        throw err
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
