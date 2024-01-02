// Import the Vuex store and the action names
import store from "@/common/store";

export default {
    methods: {
        async createGame() {
            try {
                // Call your createGame service
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
                // Check if game creation was successful
                if (response) {
                    // Commit the 'setGame' mutation to update the game state in the store
                    store.commit("setGame", response);

                    // Do any other necessary actions after successful game creation
                } else {
                    // Handle unsuccessful game creation
                    console.error("Game creation failed.");
                }
            } catch (error) {
                console.error("Error during game creation:", error.message);
            }
        },
    },
};
