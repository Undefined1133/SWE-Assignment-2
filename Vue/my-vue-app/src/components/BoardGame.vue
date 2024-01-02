<!-- BoardGame.vue -->

<template>
  <div>
    <h2>Board Game</h2>
    <p>Turn {{ turns }}/10</p>
    <p>Score: {{ score }}</p>
    <button @click="initializeGame">Start New Game</button>
    <div
        class="board-container"
        :style="{ gridTemplateColumns: `repeat(${board.width}, 1fr)`, width: '300px' }"
        :key="boardKey"
    >
      <button
          v-for="position in boardPositions"
          :key="`${position.row}-${position.col}`"
          @click="handleSquareClick(position.row, position.col)"
          class="square-button"
      >
        {{ boardPiece(position) }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import GameService from '@/service/gameService';
import {Board} from "@/model/board.ts";

export default {
  setup() {
    const turns = ref(0);
    const score = ref(0);
    const selectedSquare = ref(null);
    const board = ref(null);
    const boardKey = ref(0);

    const gameService = new GameService();

    const initializeGame = () => {
      const generator = createGenerator();
      const newBoard = new Board(generator, 4, 5);
      newBoard.addListener(handleBoardEvent);
      board.value = newBoard;
      turns.value = 0;
      score.value = 0;
      gameService.createGame().then((response) => console.log(response));
    };

    const createGenerator = () => {
      const pieces = ["A", "B", "C"];

      return {
        next: () => pieces[Math.floor(Math.random() * pieces.length)],
      };
    };

    const handleSquareClick = (row, col) => {
      if (board.value && !isGameOver(turns.value)) {
        const selectedPosition = { row, col };

        if (!selectedSquare.value) {
          selectedSquare.value = selectedPosition;
        } else {
          const isSuccess = attemptMove(selectedSquare.value, selectedPosition);

          if (isSuccess) {
            turns.value += 1;
          }
          selectedSquare.value = null;
        }
      }
    };

    const attemptMove = (startPosition, endPosition) => {
      if (board.value.canMove(startPosition, endPosition)) {
        board.value.move(startPosition, endPosition);

        boardKey.value += 1;

        return true;
      }
      return false;
    };

    const handleBoardEvent = (event) => {
      if (event.kind === 'Match') {
        console.log('Match event:', event.match);
        score.value += 10;
      } else if (event.kind === 'Refill') {
        console.log('Refill event');
      }
    };

    const isGameOver = (turns) => {
      return turns >= 10;
    };

    const boardPositions = () => {
      return board.value ? board.value.positions() : [];
    };

    const boardPiece = (position) => {
      return board.value ? board.value.piece(position) : '';
    };

    onMounted(() => {
      initializeGame();
    });

    return {
      turns,
      score,
      boardPositions,
      boardPiece,
      initializeGame,
      handleSquareClick,
    };
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
