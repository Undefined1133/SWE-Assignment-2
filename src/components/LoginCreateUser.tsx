import React, {useState} from "react";
import "./LoginCreateUser.css"
import {UserService} from "../service/LoginCreateUserService.ts";

export const LoginCreateUser = () => {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [createUsername, setCreateUsername] = useState('');
    const [createPassword, setCreatePassword] = useState('');
    const loginService = new UserService();

    const login = () => {
        loginService.login(loginUsername, loginPassword).then(r => {
            console.log(r);
        });
    }

    const createUser = () => {
        loginService.createUser(createUsername, createPassword).then(r => {
            console.log(r);
        });
    }


    return (
        <div className="login-create-user-container">
            <div className="login-section">
                <p>Login :D</p>
                <label>Username :</label>
                <input
                    className="input-field"
                    value={loginUsername}
                    onChange={(v) => {
                        setLoginUsername(v.target.value);
                    }}
                />
                <label>Password :</label>
                <input
                    className="input-field"
                    value={loginPassword}
                    onChange={(v) => {
                        setLoginPassword(v.target.value);
                    }}
                />
                <button className="submit-button" onClick={login}>Submit</button>
            </div>

            <div className="create-user-section">
                <p>Create User :D</p>
                <label>Username :</label>
                <input
                    className="input-field"
                    value={createUsername}
                    onChange={(v) => {
                        setCreateUsername(v.target.value);
                    }}
                />
                <label>Password :</label>
                <input
                    className="input-field"
                    value={createPassword}
                    onChange={(v) => {
                        setCreatePassword(v.target.value);
                    }}
                />
                <button className="submit-button" onClick={createUser}>Submit</button>
            </div>
        </div>
    );
};