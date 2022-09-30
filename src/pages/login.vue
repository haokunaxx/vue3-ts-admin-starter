<script setup lang="ts">
import { ElForm, ElInput, ElButton } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UseUserStore } from '@/store/user/user.index'
interface LoginResponse {
  code: number
  data: {
    token: string
    message: string
  }
}
interface LoginRequest {
  email: string
  password: string
}
const email = ref(''),
  password = ref('')

const redirect = ref('')

const userStore = UseUserStore()

const router = useRouter()
const { query } = router.currentRoute.value
const handleLogin = () => {
  // login
  userStore
    .login({
      email: email.value,
      password: password.value
    })
    .then(() => {
      console.log(111)
      if (query.redirect) {
        console.log(router)
        router.push({
          path: query.redirect as string
        })
      } else {
        router.push({
          path: '/charts'
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  // if (email.value.length > 0 && password.value.length > 0) {
  //   request<LoginResponse, LoginRequest>({
  //     url: 'login',
  //     method: 'post',
  //     data: {
  //       email: email.value,
  //       password: password.value
  //     }
  //   }).then(res => {
  //     console.log(res)
  //     if (query.redirect) {
  //       router.push({
  //         path: query.redirect as string
  //       })
  //     }
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }
}
</script>

<template>
  <div>
    <div class="form-wrap">
      <el-form>
        <el-input v-model="email"></el-input>
        <el-input v-model="password"></el-input>
        <el-button @click="handleLogin">login</el-button>
      </el-form>
    </div>
  </div>
</template>
