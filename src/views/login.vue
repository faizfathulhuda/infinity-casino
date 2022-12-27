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
            this.$router.push({path:'/',replace:true})
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
  <div class="flex flex-wrap full-height">
    <div class="w-[100%] sm:w-[40%]">
      <div class="justify-center">
        <img
          class="h-[160px] mx-[10%] sm:h-[170px] sm:mx-[10%] sm:mt-[60px] sm:mb-[40px]" 
          src="@/assets/image/img_logo.svg"
        >
        <div class="text-[20px] mx-[69px] text-center font-poppins font-medium sm:text-[30px] sm:mt-[41px] sm:mx-[3%]">
          Login Account
        </div>
        <div class="mx-[10%] sm:mx-[10%] mt-10">
          <p class="font-poppins font-normal text-[16px] mb-1">
            Username
          </p>
          <input
            v-model="credential.username"
            :class="[`placeholder:text-[#686868] h-[40px] w-[100%] text-[14px] rounded-[10px] border-solid border px-[10px] bg-white
                      sm:h-[50px] sm:text-[20px] ${errors.username.status ? 'border-[#F41616]' : 'border-black'}`]"
            placeholder="Input your username"
          >
          <p
            v-if="errors.username.status"
            class="font-poppins font-normal text-[#F41616] mt-[2px] text-[10px] sm:text-[15px] sm:mb-[5px]"
          >
            {{ errors.username.message }}
          </p>
        </div>
        <div class="mx-[10%] sm:mx-[10%] mt-10">
          <p class="font-poppins font-normal text-[16px] mb-1">
            Password
          </p>
          <div :class=" ['pl-[16px] h-[40px] w-[100%] text-[14px] sm:h-[50px] flex item-center  rounded-[10px] border-solid border ',errors.password.status?'border-[#F41616]':'border-black' ]">
            <input
              v-model="credential.password"
              class=" w-[100%] placeholder:text-[#686868] focus:outline-none text-[14px] sm:text-[20px]"
              placeholder="Input your password"
              :type="showPassword?'text': 'password'"
            >
            <div
              class="btn bg-transparent border-none hover:bg-transparent"
              @click="handlePasswordVisibility"
            >
              <img
                class="w-[25px] mt-[-6px] sm:mt-0"
                :src="showPassword? require('../assets/icons/ic_eye_opened.svg'):require('../assets/icons/ic_eye_closed.svg')"
              >
            </div>
          </div>
          <p
            v-if="errors.password.status"
            class="font-poppins font-normal text-[#F41616] mt-[2px] text-[10px] sm:text-[15px] sm:mb-[5px]"
          >
            {{ errors.password.message }}
          </p>
        </div>
        <div class="mx-[10%] sm:mx-[10%] mt-10">
          <button
            class="btn normal-case w-[100%] mt-[21px] sm:text-[25px] sm:mt-[5px] bg-[#393A3A] hover:bg-[#393A3A] "
            :class="isLoading? 'loading':''"
            @click="login"
          >
            Login
          </button>
        </div>
      </div>
    </div>
    <div class="hidden sm:block sm:w-[60%] sm:shrink sm:bg-[#C21010]">
      <div class="sm:mx-[25%]">
        <img
          class="sm:w-[500px] sm:h-[550px] mb-[240px] sm:my-[130px]"
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
