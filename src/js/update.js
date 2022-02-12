import {
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { ref as databaseRef, push, set, get } from "firebase/database";
import { db, storage } from "./libs/firebase/firebaseConfig";

document.forms["gameForm"].addEventListener("submit", onEditGame);
document
    .querySelector("#gameImage")
    .addEventListener("change", onImageSelected);

function onEditGame(e) {
    e.preventDefault();
    editGame();
}

// File Input Change Hnadler
function onImageSelected(e) {
    let file = e.target.files[0];

    document.querySelector(".display img").src = URL.createObjectURL(file);
}

function editGame() {
    const key = sessionStorage.getItem("key");

    // console.log(key);
    // read in the object RTD with that key
    //ref to the data...
    const game = document.querySelector("#gameName").value.trim();
    const price = document.querySelector("#gamePrice").value.trim();
    const rating = document.querySelector("#gameRating").value.trim();
    const file = document.querySelector("#gameImage").files[0];

    // set path to the storage bucket for the image
    const imageRef = storageRef(storage, `images/${file.name}`);
    // path to the RTD
    const dataRef = databaseRef(db, "game");
    // upload the image return
    const uploadResult = await uploadBytes(imageRef, file);
    // asking for the URL use in the src element in the storefront
    const imageUrl = await getDownloadURL(imageRef);
    console.log(imageUrl);
    const storagePath = uploadResult.metadata.fullPath;

    update(key, {
        imageUrl,
        storagePath,
        game,
        price,
        rating,
    });
}
