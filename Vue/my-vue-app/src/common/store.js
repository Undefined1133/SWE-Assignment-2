import { createStore } from 'vuex';

export default createStore({
    state: {
        user: null,
        game: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setGame(state, game) {
            state.game = game;
        },
        resetUser(state){
            state.user = {};
        }
    },
});
