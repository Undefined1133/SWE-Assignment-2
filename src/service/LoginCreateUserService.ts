import {resetUser, setUser} from "../common/slices/user.slice.ts";
import {useDispatch} from "react-redux";


export class UserService {
    private dispatch = useDispatch();

    private baseUrl = 'http://localhost:9090/';
     async getUsers (userSession: string) {
        const userToken = (JSON.parse(userSession) as { token: string })?.token;
        const response = await fetch(this.baseUrl + 'users?token=' + userToken);
        if (response.ok) {
            return response.json();
        } else if (response.status === 403) {
            console.error('Unauthorized access to getUsers');
            return null;
        } else {
            console.error('Error in getUsers:', response.statusText);
            return null;
        }
    }

     async login (username: string, password:  string)  {
        const response = await fetch(this.baseUrl + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username : username, password: password})
        })
        if (response.status === 403){
            console.error("403 Error while logging in :) " + await response.json())
        }else{
            this.dispatch(setUser(await response.json()))
        }
    }

    async logout (){
        const userJson = sessionStorage.getItem("user");
        if (!userJson) {
            throw new Error("No current logged in user :)")
        }

        const userObj = JSON.parse(userJson);
        console.log(userObj)

        if (!userObj.token) {
            throw new Error("Invalid token");
        }


        const response = await fetch(this.baseUrl + 'logout?token=' + userObj.token,  {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        }});

        if (response.status === 403){
            console.error("403 Error while logging out :) " + await response.json())
        }else{
            this.dispatch(resetUser());
        }
    }


    async createUser (username: string, password:  string)  {
        const response = await fetch(this.baseUrl + 'users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username : username, password: password})
        })
        if (response.status === 400){
            console.error("400 Error while logging in :) " + await response.json())
        }else{
            return response.json();
        }
    }
}