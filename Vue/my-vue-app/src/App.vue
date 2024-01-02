<!-- App.vue -->

<template>
  <div>
    <Login v-if="!user" />
    <BoardGame v-else />
  </div>
</template>

<script>
import Login from './components/LoginBob.vue';
import BoardGame from './components/BoardGame.vue';
import { useStore } from 'vuex';

export default {
  components: {
    Login,
    BoardGame,
  },
  setup() {
    const store = useStore();

    // Expose user from the store to the template
    const user = store.state.user;

    return {
      user,
    };
  },
};
</script>
