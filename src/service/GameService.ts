import {useDispatch, useSelector} from "react-redux";
import Game from "../models/Game.ts";

export class GameService {
    private dispatch = useDispatch();
    private currentUser = useSelector((state) => {
        return state.user.currentUser;
    });

    private baseUrl = 'http://localhost:9090/';
    async createGame () {
        const userJson = sessionStorage.getItem("user");
        if (!userJson) {
            throw new Error("No current logged in user :)")
        }

        const userObj = JSON.parse(userJson);
        console.log(userObj)

        if (!userObj.token) {
            throw new Error("Invalid token");
        }
        const response = await fetch(this.baseUrl + 'games?token=' + userObj.token, {
            method: 'POST'})

        if (response.ok) {
            return response.json();
        }
    }
    async updateGame(game: Game): Promise<void> {
        const { userId, token } = JSON.parse(sessionStorage.user);

        const response = await fetch(this.baseUrl + 'games/' + game.id + "?token=" + token , {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(game),
        });

        if (!response.ok) {
            throw new Error('Game update fail you noob :)');
        }
    }
}

