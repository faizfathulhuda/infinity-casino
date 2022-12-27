<template class="leaderboard">
  <div class="flex">
    <div class="sm:w-[193px] absolute bottom-0 sm:ml-[282px]">
      <p class="font-Nunito relative font-extrabold text-[#627077]  text-center  sm:text-3xl">
        {{ leaderboardData[1]?.name?leaderboardData[1]?.name:'second player' }}
      </p>
      <div class="sm:h-[400px] sm:mt-[40px]   bg-gradient-to-r from-[#DB1212] to-[#F41616]">
        <img
          class="mx-[28px] sm:w-[140px]"
          src="@/assets/icons/ic_2nd_place_medal.svg"
        >
      </div>
    </div>
    <div class="sm:w-[193px] absolute bottom-0 sm:ml-[474px]">
      <p class="font-Nunito font-extrabold text-center  text-[#FFAC33] sm:text-3xl">
        {{ leaderboardData[0]?.name }}
      </p>
      <div class="sm:h-[500px] sm:mt-[40px]  bg-gradient-to-r from-[#DB1212] to-[#F41616]">
        <img
          class="sm:mx-[28px] sm:w-[140px]"
          src="@/assets/icons/ic_1st_place_medal.svg"
        >
      </div>
    </div>
    <div class="w-[193px] absolute bottom-0 sm:ml-[667px] ">
      <p class="font-Nunito font-extrabold text-center  text-[#7C4119] text-3xl">
        {{ leaderboardData[2]?.name?leaderboardData[2]?.name:'thrid player' }}
      </p>
      <div class="h-[300px] sm:mt-[40px] bg-gradient-to-r from-[#DB1212]  to-[#F41616]">
        <img
          class="mx-[28px] sm:w-[140px]"
          src="@/assets/icons/ic_3rd_place_medal.svg"
        >
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
