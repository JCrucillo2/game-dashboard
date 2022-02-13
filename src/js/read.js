import { ref, get } from "firebase/database";
import { db } from "./libs/firebase/firebaseConfig";
import { gameInfo } from "./templates/gameInfo";

let store = [];

async function pageInit() {
    const gameRef = ref(db, "game/");
    const gameSnapShot = await get(gameRef);
    const data = gameSnapShot.val();

    const cards = Object.values(data).map((game) => {
        const card = gameInfo(game);
        document.querySelector(".game-list").append(card);

        return null;

        // return gameInfo(game);
    });
}

pageInit();
