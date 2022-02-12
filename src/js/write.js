import {
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { ref as databaseRef, push, set, get } from "firebase/database";
import { db, storage } from "./libs/firebase/firebaseConfig";
import { nanoid } from "nanoid";

document.forms["gameForm"].addEventListener("submit", onAddGame);
document
    .querySelector("#gameImage")
    .addEventListener("change", onImageSelected);

// Loading Form Submit Event
function onAddGame(e) {
    e.preventDefault();
    uploadNewGame();
}

// File Input Change Hnadler
function onImageSelected(e) {
    // selected file
    let file = e.target.files[0];
    // console.log(file.name);

    // update the display with the requested image
    document.querySelector(".display img").src = URL.createObjectURL(file);
}

// Upload form fields to storage bucket and RTD
async function uploadNewGame() {
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

    // random key firebase generates
    const itemRef = await push(dataRef);

    set(itemRef, {
        key: itemRef.key,
        sku: nanoid(),
        imageUrl,
        storagePath,
        game,
        price,
        rating,
    });
}
