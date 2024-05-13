import { Size, CELL_SIZE, BORDER_SIZE } from "./modules/size.mjs";
import { draw } from "./modules/draw.mjs";
import { game } from "./modules/game.mjs";
import { back, restart } from "./modules/restart.mjs";

let sizeForm = document.querySelector("#size");
let widthInput = document.querySelector("#width");
let heightInput = document.querySelector("#height");
let gameDiv = document.querySelector("#game");
let restartBtn = document.querySelector("#restartbtn")
let backBtn = document.querySelector("#backbtn")

/** @type {HTMLCanvasElement} */
let canvas = document.querySelector("#canvas");

/** @type {HTMLSpanElement} */
let currentlyPlayingSpan = document.querySelector("#playing");

/** @type {HTMLHeadingElement} */
let currentlyPlayingHeader = document.querySelector("#playingHeader");

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

/**
 * Initializes the game.
 * 
 * @param {Size} size The size of the gameplay area.
 */
function start(size) {
    console.log("Game started");

    console.table(size);

    sizeForm.style.display = "none";
    gameDiv.style.display = "flex";

    canvas.width = size.width * (CELL_SIZE + BORDER_SIZE) + 1;
    canvas.height = size.height * (CELL_SIZE + BORDER_SIZE) + 1;
    
    restartBtn.onclick = function(e) {
        e.preventDefault();

        restart(size);
    }
    backBtn.onclick = function(e) {
        e.preventDefault();

        back();
    }

    draw(canvas);
    game(canvas, currentlyPlayingSpan, size);
}

if (Number(params.width) !== NaN && Number(params.height) !== NaN && Number(params.width) > 0  && Number(params.height) > 0) {
    let size = new Size(Number(params.width), Number(params.height));

    start(size);
}

sizeForm.onsubmit = function(e) {
    e.preventDefault();
    
    let size = new Size(Number(widthInput.value), Number(heightInput.value));
    start(size);
}