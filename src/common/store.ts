import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/user.slice.ts'
import gameReducer from './slices/game.slice.ts'

const store = configureStore({
    reducer: {
        user: userReducer,
        game: gameReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export default store