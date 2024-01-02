import axios from 'axios';
import store from "@/common/store";

const baseUrl = 'http://localhost:9090/';

export default {
    async login(username, password) {
        try {
            const response = await axios.post(`${baseUrl}login`, { username, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 403) {
                console.error("403 Error while logging in: ", response.data);
            } else {
                store.commit("setUser", response.data);
            }
        } catch (error) {
            console.error("Error while logging in: ", error.message);
        }
    },

    async logout() {
        try {
            const userSession = JSON.parse(sessionStorage.getItem('user'));

            if (!userSession || !userSession.token) {
                throw new Error('Invalid token');
            }

            const response = await axios.post(`${baseUrl}logout`, { token: userSession.token });

            if (response.status === 403) {
                console.error("403 Error while logging out: ", response.data);
            } else {
                store.commit("resetUser");
            }
        } catch (error) {
            console.error("Error while logging out: ", error.message);
        }
    },

    async createUser(username, password) {
        try {
            const response = await axios.post(`${baseUrl}users`, { username, password });

            if (response.status === 400) {
                console.error("400 Error while creating user: ", response.data);
            } else {
                return response.data;
            }
        } catch (error) {
            console.error("Error while creating user: ", error.message);
            return null;
        }
    },
};
