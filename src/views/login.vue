<script>
import { POSITION, useToast } from 'vue-toastification'

import { useAuth } from '@/store/auth'
import {validationPassword, validationUsername}from'@/views/login/validation'
export default {
  setup() {
    const auth = useAuth()
    const toast = useToast()    
    return { auth,toast }
    
  },
  data: () => ({
    showPassword: false,
    credential: {
      username: null,
      password:null
    },
    errors: {
      username: {
        status: false,
        message:null  
      },
      password: {
        status: false,
        message:null  
      }
    },
    errorMessage: null,
    isLoading: false
  }),
  methods: {
    async login() {
      if (this.handleValidationPassword() & this.handleValidationUsername()) {
        this.isLoading = true
        try {
          await this.auth.login(this.credential)
          this.isLoading = false
          if (this.auth.token) {
            this.$router.push({ path: '/' })
          }
        } catch (err) {
          this.isLoading = false
          this.toast.error(err.response.data.message,{timeout:5000,position:POSITION.TOP_RIGHT})
          this.errorMessage = err.message
        }
      }
    },
    handlePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    handleValidationPassword() {
      this.errors = { ...this.errors, password: validationPassword(this.credential.password) }
      if (this.errors.password.status) {
        return false
      } else {
        return true
      }
    },
    handleValidationUsername() {
      this.errors = {...this.errors,username: validationUsername(this.credential.username)}
      if (this.errors.username.status) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<template>
  <div class="flex full-height">
    <div class="ml-[15%] mr-[15%] sm:mr-[67px] sm:ml-0 ">
      <div class="justify-center">
        <img
          class=" h-[183px] sm:w-[468px] sm:h-[173px] sm:ml-[77px] sm:mt-[134px] sm:mb-[41px]" 
          src="@/assets/image/img_logo.svg"
        >
        <div class=" w-[292px] text-[20px] mx-[69px] text-center font-poppins font-medium sm:text-[30px] sm:mt-[41px] sm:ml-[149px]  ">
          Login Account
        </div>
        <p class="font-poppins font-normal text-[16px] w-[145px] h-[40px] ml-[46px] mt-[9px] sm:text-[20px] sm:ml-[78px] sm:mt-[40px] sm:mb-[5px]">
          Username
        </p>
        <input
          v-model="credential.username"
          :class="[`placeholder:text-[#686868] h-[48px] w-[340px] text-[14px] ml-[46px] mr-[44px] 
                    sm:h-[50px] sm:text-[20px] rounded-[10px] border-solid  py-[10px] pl-[16px]
                    sm:w-[450px] sm:ml-[78px] border ${errors.username.status ? 'border-[#F41616]' : 'border-black'}`]"
          placeholder="Input your username"
        >
        <!-- error indicator -->
        <p
          v-if="errors.username.status"
          class="font-poppins font-normal  text-[#F41616] mt-[2px] text-[10px] ml-[46px] sm:text-[20px] sm:ml-[78px] sm:mb-[5px]"
        >
          {{ errors.username.message }}
        </p>

        <p
          class="font-poppins font-normal text-[16px] w-[145px] h-[40px] ml-[46px] mt-[9px]
       sm:text-[20px] sm:ml-[78px] sm:mt-[30px] sm:mb-[5px]"
        >
          Password
        </p>
        <div :class=" ['pl-[16px] h-[48px] w-[340px] text-[14px] ml-[46px] mr-[44px] sm:h-[50px] sm:ml-[78px] flex sm:w-[450px] item-center  rounded-[10px] border-solid border ',errors.password.status?'border-[#F41616]':'border-black' ]">
          <input
            v-model="credential.password"
            class=" w-[420px] placeholder:text-[#686868]  focus:outline-none text-[14px] sm:text-[20px]"
            placeholder="Input your password"
            :type="showPassword?'text': 'password'"
          >
          <div
            class="btn bg-transparent border-none hover:bg-transparent"
            @click="handlePasswordVisibility"
          >
            <img
              class="w-[25px] "
              :src="showPassword? require('../assets/icons/ic_eye_opened.svg'):require('../assets/icons/ic_eye_closed.svg')"
            >
          </div>
        </div>
        <!-- error indicator -->
        <p
          v-if="errors.password.status"
          class="font-poppins font-normal text-[#F41616] mt-[2px] text-[10px] ml-[46px] sm:text-[20px] sm:ml-[78px] sm:mb-[5px]"
        >
          {{ errors.password.message }}
        </p>
        <button
          class="btn normal-case w-[340px] mx-[45px] mt-[21px] sm:text-[25px] sm:mt-[35px] font-medium flex self-center sm:w-[450px] sm:ml-[77px] bg-[#393A3A] hover:bg-[#393A3A] "
          :class="isLoading? 'loading':''"
          @click="login"
        >
          Login
        </button>
      </div>
    </div>
    <div class="sm:h-full sm:w-screen sm:bg-red-800">
      <div class="sm:mx-[161px]">
        <img
          class=" invisible sm:visible sm:w-[512px] sm:h-[575px] mb-[240px] sm:mt-[181px]"
          src="../assets/image/img_login_side.svg"
        >
      </div>
    </div>
  </div>
</template>

<style>
.full-height {
  height: 100vh;
}
</style>
