<script>
import {logo} from '@/assets/index'
import { useAuth } from '@/store/auth'
import {validationPassword}from'@/views/login/index'
export default {
  setup() {
    const auth = useAuth()
    return { auth }
  },
  data: () => ({
    logo,
    showPassword: false,
    form: {
      username: null,
      password:null
    },
    errors: {
      status: false,
      message:null
    },
    errorMessage: null,
    isLoading: false
  }),
  methods: {
    async login() {
      this.errorMessage = null
      try {
        this.isLoading = true
        await this.auth.login(this.credential)

        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        this.errorMessage = err.message
      }
    },
    handlePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    handleValidationPassword() {
      this.errors = validationPassword(this.form.password)
      if (this.errors.status) {
        return false
      } else {
        return true
      }
    },
    handleLogin() {
      if (this.handleValidationPassword() === true) {
        console.log('ada')
        this.$router.push({name:'Leaderboard'})
      } else {
        return false
      }
    }
  }
}
</script>

<template class="login">
  <div class="flex">
    <div class="mr-[67px]">
      <img
        class=" w-[468px] h-[173px] ml-[77px] mt-[134px] mb-[41px]" 
        src="@/assets/image/img_logo.svg"
      >
      <div class="w-[292px] font-poppins font-medium text-[30px] mt-[41px] ml-[149px] text-center ">
        Login Account
      </div>
    
      <div class="font-poppins font-normal text-[20px] ml-[78px] mt-[40px] mb-[5px]">
        Username
      </div>
      <input
        v-model="form.username"
        class="placeholder:text-[#686868] h-[50px] text-[20px] rounded-[10px] border-solid  py-[10px] pl-[16px] w-[450px] ml-[78px] border outline-inherit border-black"
        placeholder="Input your username"
      >
      <p class="font-poppins font-normal text-[20px] ml-[78px] mt-[30px] mb-[5px]">
        Password
      </p>
      <div :class=" ['pl-[16px] h-[50px] ml-[78px] flex w-[450px] item-center  rounded-[10px] border-solid border ',errors.status?'border-[#F41616]':'border-black' ]">
        <input
          v-model="form.password"
        
          class=" w-[420px]  placeholder:text-[#686868]  focus:outline-none text-[20px]"
          placeholder="Input your password"
          :type="showPassword?'text': 'password'"
        >
        <div
          class="btn flex px-2 bg-transparent border-none hover:bg-transparent"
          @click="handlePasswordVisibility"
        >
          <img :src="showPassword? require('../assets/icons/ic_eye_opened.svg'):require('../assets/icons/ic_eye_closed.svg')">
        </div>
      </div>
      <p
        v-if="errors.status"
        class="font-poppins font-normal text-[#F41616] text-[20px] ml-[78px] mb-[5px]"
      >
        {{ errors.message }}
      </p>
      <button
        class="btn normal-case text-[25px] mt-[35px] font-medium flex self-center w-[450px] ml-[77px] bg-[#393A3A] hover:bg-[#393A3A] "
        @click="handleLogin"
      >
        Login
      </button>
    </div>
    <div class=" h-screen  w-screen bg-red-800">
      <img
        class=" lg:ml-[161px] lg:mt-[181px] lg:mr-[173px]"
        src="../assets/image/img_login_side.svg"
      >
    </div>
  </div>
</template>
