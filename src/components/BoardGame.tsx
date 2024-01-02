import React, { useState, useEffect } from "react";
import { Board } from "../board.ts";
import { useDispatch, useSelector } from "react-redux";
import { setGame } from "../common/slices/game.slice.ts";
import "./BoardGame.css";
import {GameService} from "../service/GameService.ts";

export const BoardGame = () => {
    const dispatch = useDispatch();
    const [board, setBoard] = useState(null);
    const [turns, setTurns] = useState(0);
    const [score, setScore] = useState(0); // Added score state
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [boardKey, setBoardKey] = useState(0); // Add state for the board key
    const gameService = new GameService();

    useEffect(() => {
        if (!board) {
            initializeGame();
        }
    }, [board]);

    const initializeGame = () => {
        const generator = createGenerator();
        const newBoard = new Board(generator, 4, 5);
        newBoard.addListener(handleBoardEvent);
        setBoard(newBoard);
        setTurns(0);
        setScore(0);
        gameService.createGame().then(r => console.log(r));
    };


    const handleSquareClick = (row, col) => {
        if (board && !isGameOver(turns)) {
            const selectedPosition = { row, col };

            if (!selectedSquare) {
                setSelectedSquare(selectedPosition);
            } else {
                const isSuccess = attemptMove(selectedSquare, selectedPosition);

                if (isSuccess) {
                    setTurns(turns + 1);
                }
                setSelectedSquare(null);
            }
        }
    };

    const attemptMove = (startPosition, endPosition) => {
        if (board.canMove(startPosition, endPosition)) {
            board.move(startPosition, endPosition);

            setBoardKey((prevKey) => prevKey + 1);

            return true;
        }
        return false;
    };

    const handleBoardEvent = (event) => {
        if (event.kind === "Match") {
            console.log("Match event:", event.match);
            setScore((prevScore) => prevScore + 10); // Increment score by 10 for each match
        } else if (event.kind === "Refill") {
            console.log("Refill event");
        }
    };

    const createGenerator = () => {
        const pieces = ["A", "B", "C"];
        return {
            next: () => pieces[Math.floor(Math.random() * pieces.length)],
        };
    };

    const isGameOver = (turns) => {

        return turns >= 10;
    };

    return (
        <div>
            <h2>Board Game</h2>
            <p>Turn {turns}/10</p>
            <p>Score: {score}</p>
            <button onClick={initializeGame}>Start New Game</button>
            {board && !isGameOver(turns) && board.positions && (
                <div
                    className="board-container"
                    style={{
                        gridTemplateColumns: `repeat(${board.width}, 1fr)`,
                        width: "300px",
                    }}
                    key={boardKey}
                >
                    {board.positions().map((position) => (
                        <button
                            key={`${position.row}-${position.col}`}
                            onClick={() => handleSquareClick(position.row, position.col)}
                            className="square-button"
                        >
                            {board.piece(position)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
