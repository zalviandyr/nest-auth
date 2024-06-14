<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <div class="flex justify-center" v-if="isLoading">
        <grid-loader color="#93c5fd" />
      </div>

      <div v-else>
        <h2 class="mb-6 text-2xl font-bold text-center text-gray-900">Hai, {{ name }}</h2>

        <div class="mb-4">
          <label for="username" class="block text-left text-gray-700">Your username is</label>
          <input type="text" id="username" v-model="username" disabled class="w-full p-2 mt-1 border rounded-md" />
        </div>

        <button type="submit" class="w-full p-2 text-red-500 hover:text-red-600" @click="logout">
          Logout
        </button>
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
      name: '',
      username: '',
    };
  },
  mounted() {
    const token = storeUser.get();

    this.axios.get('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      const data = response.data;

      this.name = data.name;
      this.username = data.username;
    })
  },
  methods: {
    logout() {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, logout',
        cancelButtonText: 'No, cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.doLogout();
        }
      });
    },

    doLogout() {
      storeUser.remove();
      this.$router.push('/login');
    }
  }
};
</script>
