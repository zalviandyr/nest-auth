<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 class="mb-6 text-2xl font-bold text-center text-gray-900">Register</h2>

      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="name" class="block text-left text-gray-700">Name</label>
          <input type="text" id="name" v-model="name" :disabled="isLoading" class="w-full p-2 mt-1 border rounded-md" />

          <span v-if="errors.name" class="text-sm text-red-500">{{ errors.name }}</span>
        </div>

        <div class="mb-4">
          <label for="email" class="block text-left text-gray-700">Username</label>
          <input type="text" id="email" v-model="username" :disabled="isLoading" class="w-full p-2 mt-1 border rounded-md" />

          <span v-if="errors.username" class="text-sm text-red-500">{{ errors.username }}</span>
        </div>

        <div class="mb-4">
          <label for="password" class="block text-left text-gray-700">Password</label>
          <input type="password" id="password" v-model="password" :disabled="isLoading" class="w-full p-2 mt-1 border rounded-md" />

          <span v-if="errors.password" class="text-sm text-red-500">{{ errors.password }}</span>
        </div>

        <button type="submit" class="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          <pulse-loader v-if="isLoading" color="white" size="10px" />
          <span v-if="!isLoading">Register</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: {},
      isLoading: false,
      name: '',
      username: '',
      password: '',
    };
  },
  methods: {
    register() {

      if (this.name && this.username && this.password) {
        this.isLoading = true

        this.axios.post('/api/auth/register', {
          name: this.name,
          username: this.username,
          password: this.password
        }).then(response => {
          console.log('Registered:', response.data);
        }).catch(error => {
          console.error('Registration error:', error);
        }).finally(() => {
          this.isLoading = false
        });
      }

      this.errors = {};

      if (!this.name) {
        this.errors.name = 'Name is required.';
      }

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
