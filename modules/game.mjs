import { CELL_TYPE } from "./cell_type.mjs";
import { clicked_cell } from "./clicked_cell.mjs";
import { draw, draw_shapes, show_winner_text, update_currently_playing } from "./draw.mjs";
import { CELL_SIZE, Size } from "./size.mjs";

let win = false;

/**
 * Does game logic.
 * 
 * @param {HTMLCanvasElement} canvas The canvas the game is drawed on.
 * @param {HTMLSpanElement} currentlyPlayingSpan The span to write currently playing player to.
 * @param {Size} size The size of the field.
 */
export function game(canvas, currentlyPlayingSpan, size) {
    let field = [];

    let canvasRect = canvas.getBoundingClientRect();
    let currentPlayer = CELL_TYPE.X

    for (let x = 0; x < size.width / (CELL_SIZE + 1); x++) {
        field.push([]);
        for (let y = 0; y < size.height / (CELL_SIZE + 1); y++) {
            field[x].push(CELL_TYPE.EMPTY);
        }
    }

    canvas.onclick = function(e) {
        let mouseX = e.clientX - canvasRect.left;
        let mouseY = e.clientY - canvasRect.top;

        let cell = clicked_cell(mouseX, mouseY, canvas.width, canvas.height, size);
        console.table(cell)

        if (field[cell.x][cell.y] === CELL_TYPE.EMPTY && !win) {
            field[cell.x][cell.y] = currentPlayer;
        } else {
            return;
        }

        checkWin(field);

        currentPlayer = currentPlayer + 1;
        if (currentPlayer > CELL_TYPE.LAST){
            currentPlayer = CELL_TYPE.X;
        } // To allow potential extension for more players

        update_currently_playing(currentPlayer, currentlyPlayingSpan);
        
        if (win) {
            let winningPlayer = currentPlayer + 1;
            if (winningPlayer > CELL_TYPE.LAST){
                winningPlayer = CELL_TYPE.X;
            }

            show_winner_text(winningPlayer)
        }

        console.log(field);

        draw(canvas);
        draw_shapes(canvas, field, size);
    }
}

/**
 * Checks if the game is won and sets win to true if it is.
 * 
 * @param {number[][]} field The field to check.
 */
export function checkWin (field) {
    let height = field.length - 1;
    let width = field[0].length - 1;
    let winLength = 0;

    if (width >= 4 && height >= 4) {        
        winLength = 4;
    } else {
        winLength = Math.min(height, width);
    }

    let winner = CELL_TYPE.EMPTY;

    outer:
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (field[x][y] === CELL_TYPE.EMPTY) {
                continue;
            }

            let right = true;
            let down = true;
            let downRight = true;
            let upRight = true;

            for (let i = 1; i <= 4; i++) {
                if (field[x][y] !== getCell(field, x + i, y)) {
                    right = false;
                }

                if (field[x][y] !== getCell(field, x, y + i)) {
                    down = false;
                }

                if (field[x][y] !== getCell(field, x + i, y + i)) {
                    downRight = false;
                }

                if (field[x][y] !== getCell(field, x + 1, y - 1)) {
                    upRight = false;
                }
            }

            if (right || down || downRight || upRight) {
                console.log("někdo vyhrál lol");
                win = true;
                break outer;
            }
        }
    }
}

/**
 * Gets the cell at the given coordinates, or CELL_TYPE.EMPTY when it is out of range.
 * 
 * @param {number[][]} field The field to check.
 * @param {number} x The X coordinate.
 * @param {number} y The Y coordinate.
 * @returns {number} The cell at the given coordinates in the field.
 */
export function getCell(field, x, y) {
    let height = field.length - 1;
    let width = field[0].length - 1;

    if (x < 0 || x >= width || y < 0 || y >= height) {
        return CELL_TYPE.EMPTY;
    } else {
        return field[x][y];
    }
}
