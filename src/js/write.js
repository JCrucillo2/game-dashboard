import {
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { ref as databaseRef, push, set, get } from "firebase/database";
import { db, storage } from "./libs/firebase/firebaseConfig";

function onImageSelected(e) {
    // selected file
    //
    let file = e.target.files[0];
    // console.log(file.name);

    // update the display with the requested image
    document.querySelector(".display img").src = URL.createObjectURL(file);

    // testUpload(file);
}

document
    .querySelector("#gameImage")
    .addEventListener("change", onImageSelected);

// async function testUpload(file) {
//     // storeRef path to the data
//     const imageRef = storageRef(storage, `crystals/tourmaline/${file.name}`);
//     // uploadBytes pass the file from the input file type(blob)
//     const confirmation = await uploadBytes(imageRef, file);
//     console.log(confirmation.metadata.fullPath);
// }
