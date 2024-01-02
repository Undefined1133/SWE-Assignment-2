import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store.ts';
import Game from "../../models/Game.ts";

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        currentGame: {} as Game,
        turns: 0
    },
    reducers: {
        setGame: (state, action: PayloadAction<Game>) => {
            state.currentGame = action.payload;
        },
        resetGame: (state) => {
            state.currentGame = {} as Game;
        },
        increaseScore: (state) => {
            state.currentGame.score += 1;
        },
        increaseTurns: (state) => {
            state.turns += 1;
        }

    }
})

export const { setGame, resetGame, increaseScore, increaseTurns } = gameSlice.actions
export const game = (state: RootState) => state.game.currentGame;

export default gameSlice.reducer