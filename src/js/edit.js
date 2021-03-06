import {
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import {
    ref as databaseRef,
    push,
    set,
    get,
    update,
    getDatabase,
    remove,
} from "firebase/database";
import { db, storage } from "./libs/firebase/firebaseConfig";

document.forms["gameForm"].addEventListener("submit", onEditGame);
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

function onEditGame(e) {
    e.preventDefault();
    editGame();
}

// File Input Change Handler
function onImageSelected(e) {
    let file = e.target.files[0];

    document.querySelector(".display img").src = URL.createObjectURL(file);
}

// function for prepopulating data if it exists
async function pageInit() {
    const key = sessionStorage.getItem("key");
    const gameRef = databaseRef(db, `game/${key}`);
    const gameSnapShot = await get(gameRef);

    if (gameSnapShot.exists()) {
        setFieldValues(gameSnapShot.val());
    }
}

pageInit();

function setFieldValues({ game, rating, price, imageUrl }) {
    const gameForm = document.forms["gameForm"];

    gameForm.elements["gameName"].value = game;
    gameForm.elements["gameRating"].value = rating;
    gameForm.elements["gamePrice"].value = price;

    document.querySelector("#uploadImage img").src = imageUrl;
}

// function for updating
async function editGame() {
    const key = sessionStorage.getItem("key");

    const game = document.querySelector("#gameName").value.trim();
    const price = document.querySelector("#gamePrice").value.trim();
    const rating = document.querySelector("#gameRating").value.trim();

    const file = document.querySelector("#gameImage").files[0];

    const gameRef = databaseRef(db, `game/${key}`);

    const imageRef = storageRef(storage, `images/${file.name}`);
    const uploadResult = await uploadBytes(imageRef, file);
    const imageUrl = await getDownloadURL(imageRef);
    const storagePath = uploadResult.metadata.fullPath;

    update(gameRef, {
        imageUrl,
        storagePath,
        game,
        price,
        rating,
    });
}
