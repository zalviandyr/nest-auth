<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 class="mb-6 text-2xl font-bold text-center text-gray-900">Login</h2>

      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="block text-left text-gray-700">Username</label>
          <input type="text" id="username" v-model="username" :disabled="isLoading" class="w-full p-2 mt-1 border rounded-md" />

          <span v-if="errors.username" class="text-sm text-red-500">{{ errors.username }}</span>
        </div>

        <div class="mb-4">
          <label for="password" class="block text-left text-gray-700">Password</label>
          <input type="password" id="password" v-model="password" :disabled="isLoading" class="w-full p-2 mt-1 border rounded-md" />

          <span v-if="errors.password" class="text-sm text-red-500">{{ errors.password }}</span>
        </div>

        <button type="submit" class="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          <pulse-loader v-if="isLoading" color="white" size="10px" />
          <span v-else>Login</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <RouterLink to="/register" class="text-blue-500 hover:underline">
          Create an account
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { storeUser } from '@/utils/storage';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      errors: {},
      isLoading: false,
      username: '',
      password: '',
    };
  },
  methods: {
    login() {

      if (this.username && this.password) {
        this.isLoading = true

        this.axios.post('/api/auth/login', {
          username: this.username,
          password: this.password
        }).then(response => {
          const data = response.data;
          storeUser.set(data.access_token);

          Swal.fire({
            icon: 'success',
            title: 'Welcome back!',
            position: 'top-end',
            showConfirmButton: false,
            toast: true,
            timer: 3000,
            timerProgressBar: true,
          });

          this.$router.push({
            path: '/',
            replace: true
          })
        }).catch(error => {
          const statusCode = error.response.status
          if (statusCode === 401) {
            this.errors.password = 'Invalid username or password.';
          }

          console.error('Login error:', error);
        }).finally(() => {
          this.isLoading = false
        });
      }

      this.errors = {};

      if (!this.username) {
        this.errors.username = 'Username is required.';
      }

      if (!this.password) {
        this.errors.password = 'Password is required.';
      }
    }
  }
};
</script>
