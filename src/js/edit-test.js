import {
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { ref as databaseRef, push, set, get, update } from "firebase/database";
import { db, storage } from "./libs/firebase/firebaseConfig";

document
    .querySelector("#gameImage")
    .addEventListener("change", onImageSelected);
document.querySelector("#back-btn").addEventListener("click", pageBack);

// back button functionality
function pageBack(e) {
    if (confirm("Pressing okay discards all changes. Continue?")) {
        location.href = "read.html";
    }
}

const gameForm = document.forms["gameForm"];

function onImageSelected(e) {
    let file = e.target.files[0];

    document.querySelector("#uploadImage img").src = URL.createObjectURL(file);
}

async function pageInit() {
    const key = sessionStorage.getItem("key");
    const gameRef = databaseRef(db, `game/${key}`);
    const gameSnapShot = await get(gameRef);

    if (gameSnapShot.exists()) {
        setFieldValues(gameSnapShot.val());
    }

    gameForm.addEventListener("submit", onUpdateGame);
}

function onUpdateGame(e) {
    e.preventDefault();
    updateGameData();
}

function setFieldValues({ game, rating, price, imageUrl }) {
    const gameForm = document.forms["gameForm"];
    gameForm.elements["gameName"].value = game;
    gameForm.elements["gameRating"].value = rating;
    gameForm.elements["gamePrice"].value = price;

    document.querySelector("#uploadImage img").src = imageUrl;
}

function updateGameData() {
    const game = gameForm.elements["gameName"].value.trim();
    const price = gameForm.elements["gamePrice"].value.trim();
    const rating = gameForm.elements["gameRating"].value.trim();
    const file = gameForm.elements["gameImage"].files;

    const key = sessionStorage.getItem("key");
    const gameRef = databaseRef(db, `game/${key}`);

    if (file.length !== 0) {
        async function editingGame() {
            const imageRef = storageRef(storage, `images/${key}/${file.name}`);
            const uploadResult = await uploadBytes(imageRef, file);
            const imageUrl = await getDownloadURL(imageRef);
            const storagePath = uploadResult.metadata.fullPath;

            update(gameRef, {
                storagePath,
            });
        }

        editingGame();
    }

    update(gameRef, {
        game,
        price,
        rating,
    });
}

pageInit();
