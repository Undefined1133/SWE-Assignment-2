import {Link, Route, Router, Routes, useLocation, useNavigate} from "react-router-dom";
import React from "react";
import {LoginCreateUser} from "./LoginCreateUser.tsx";
import {Profile} from "./Profile.tsx";
import {HighScores} from "./HighScores.tsx";
import {BoardGame} from "./BoardGame.tsx";
import "./MainComponent.css"
import {useSelector} from "react-redux";
import {UserService} from "../service/LoginCreateUserService.ts";


export const MainView = () => {

    const currentUser = useSelector((state) => {
        return state.user.currentUser;
    });
    const loginService = new UserService();

    const handleLogout = () => {
        // Dispatch the resetUser action to log out the user
        loginService.logout().then(r => console.log(r))
    };

    return (
        <div>
            <Link to="/login" className="link">Go to Login</Link>
            <Link to="/profile" className="link">Go to Profile</Link>
            <Link to="/highscore" className="link">Go to Highscores</Link>
            <Link to="/board" className="link">Go to Game</Link>
            <div className="logout-container">
                {currentUser.token ? (
                    <button className="logout-button" onClick={handleLogout}>
                        LOG OUT
                    </button>
                ) : (
                    <p className="login-message">Please log in</p>
                )}
            </div>
            <Routes>
                <Route path="/login" element={<LoginCreateUser />} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/highscore" element={<HighScores/>} />
                <Route path="/board" element={<BoardGame/>} />

            </Routes>
        </div>
    );
};