import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store.ts';
import User from "../../models/User.ts";
import {act} from "react-dom/test-utils";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {} as User,
        token: "",
    },
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            sessionStorage.setItem("user", JSON.stringify(action.payload))
            console.log("I am here " + state.currentUser.token)
        },
        resetUser: (state) => {
            state.currentUser = {} as User;
            sessionStorage.clear();
        },
        setUserToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    }
})

export const { setUser, resetUser, setUserToken } = userSlice.actions
export const user = (state: RootState) => state.user;

export default userSlice.reducer