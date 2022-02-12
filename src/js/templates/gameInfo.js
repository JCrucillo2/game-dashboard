function gameInfo({ key, game, price, rating, imageUrl }) {
    const template = `
    <div class="game-class" data-key="${key}">
        <img
            src="${imageUrl}"
            alt="${game}"
        />
        <div class="game-information">
            <p>${game}</p>
            <p>${rating}/5</p>
            <p>${price}</p>
        </div>
        <div class="action-buttons">
            <button id="edit" data-key="${key}">Edit</button>
            <button id="delete" data-key="${key}">Delete</button>
        </div>
    </div>
    `;

    const element = document.createRange().createContextualFragment(template)
        .children[0];

    addGameControls(element);

    return element;
}

function addGameControls(game) {
    game.querySelector("#edit").addEventListener("click", onEditGame);
    game.querySelector("#delete").addEventListener("click", onDeleteGame);
}

function onEditGame(e) {
    const key = e.target.dataset.key;
    sessionStorage.setItem("key", key);
    window.location.assign("update.html");
}

function onDeleteGame(e) {
    const key = e.target.dataset.key;
    sessionStorage.setItem("key", key);
    window.location.assign("delete.html");
}

export { gameInfo };
