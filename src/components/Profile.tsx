import React from "react";
import {useSelector} from "react-redux";

export const Profile = () => {
    const currentUser = useSelector((state) => {
        return state.user.currentUser;
    });

    return (
        <div>
                {currentUser.token ? (
                        <p className="login-message">{currentUser.userId}</p>
                ) : (
                    <p className="login-message">You are not logged in brother</p>
                )}
        </div>);
};