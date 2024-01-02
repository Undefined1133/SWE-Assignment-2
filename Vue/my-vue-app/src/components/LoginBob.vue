
<template>
  <div>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>

<script>
import loginCreateUserService from '@/service/loginCreateUserService';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$store.commit('setUser', this.username);
      loginCreateUserService.login({
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>
