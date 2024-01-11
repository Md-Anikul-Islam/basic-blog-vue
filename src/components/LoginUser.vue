<template>
  <div>
    <h1>Login</h1>
    <!-- Display error message if it exists -->
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    <form @submit.prevent="login">
      <label>Email/Phone:</label><br>
      <input type="user" v-model="user" required /><br><br>
      <label>Password:</label><br>
      <input type="password" v-model="password" required /><br><br>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginUser',
  data() {
    return {
      user: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    login() {
      const baseURL = process.env.VUE_APP_API_BASE_URL;
      const loginURL = `${baseURL}/login`;
      axios.post(loginURL, { user: this.user, password: this.password })
        .then(response => {
          if (response.status === 200 && response.data) {
            const { token, user } = response.data;
            localStorage.setItem('user-info', JSON.stringify(user));
            localStorage.setItem('auth-token', token);
            this.$router.push({ name: 'FriendList' });
          } else {
            console.error('Login failed. Invalid response:', response);
          }
        })
        .catch(error => {
          // Set the error message to display in the template
          this.errorMessage = error.response.data.message || 'Login failed. Please try again.';
          console.error('Login error:', error);
        });
    },
  },
};
</script>

<style scoped>
</style>
