import React, {useState} from "react";
import {useSelector} from "react-redux";


export const HighScores = () => {
    const currentUser = useSelector((state) => {
        return state.user.currentUser;
    });

    return (

        <div>
            {currentUser.token ? (
                <p className="login-message">Personal High Scores</p>

            ) : (
                <p className="login-message">Overall High Scores :O</p>
            )}
        </div>);
};