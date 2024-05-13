import { CELL_TYPE } from "./cell_type.mjs";
import { BORDER_COLOR, CANVAS_COLOR, O_COLOR, X_COLOR, ERROR_COLOR } from "./colors.mjs";
import { BORDER_SIZE, CELL_SIZE, LINE_OFFSET, SHAPE_OFFSET, Size } from "./size.mjs";

    /**
     * Draws the game on the given canvas.
     * @param {HTMLCanvasElement} canvas
     */
export function draw(canvas) {
    /** @type {CanvasRenderingContext2D} */
    let ctx = canvas.getContext("2d");
    
    ctx.fillStyle = CANVAS_COLOR;
    ctx.strokeStyle = BORDER_COLOR;
    ctx.lineWidth = BORDER_SIZE;

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let x = 0; x < canvas.width; x += CELL_SIZE + BORDER_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x + LINE_OFFSET, 0);
        ctx.lineTo(x + LINE_OFFSET, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += CELL_SIZE + BORDER_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y + LINE_OFFSET);
        ctx.lineTo(canvas.width, y + LINE_OFFSET);
        ctx.stroke();
    }
}

/**
 * Draws the given field to the given canvas.
 * @param {CanvasRenderingContext2D} canvas The canvas to draw on.
 * @param {Number[][]} field The field of shapes to draw.
 * @param {Size} size The size of the filed, in tiles.
 */
export function draw_shapes(canvas, field, size) {
    /** @type {CanvasRenderingContext2D} */
    let ctx = canvas.getContext("2d");
    ctx.lineWidth = BORDER_SIZE;

    for (let y = 0; y < size.height; y++) {
        for (let x = 0; x < size.width; x++) {
            switch (field[x][y]) {
                case CELL_TYPE.X:
                    ctx.strokeStyle = X_COLOR;

                    ctx.beginPath();
                    ctx.moveTo(x * (CELL_SIZE + BORDER_SIZE) + LINE_OFFSET + SHAPE_OFFSET,
                        y * (CELL_SIZE + BORDER_SIZE) + LINE_OFFSET + SHAPE_OFFSET);

                    ctx.lineTo((x + 1) * (CELL_SIZE + BORDER_SIZE) + LINE_OFFSET - SHAPE_OFFSET,
                        (y + 1) * (CELL_SIZE + BORDER_SIZE) + LINE_OFFSET - SHAPE_OFFSET);

                    ctx.moveTo(x * (CELL_SIZE + BORDER_SIZE) + LINE_OFFSET + SHAPE_OFFSET,
                        (y + 1) * (CELL_SIZE + BORDER_SIZE) + LINE_OFFSET - SHAPE_OFFSET);

                    ctx.lineTo((x + 1) * (CELL_SIZE + BORDER_SIZE) + LINE_OFFSET - SHAPE_OFFSET,
                        y * (CELL_SIZE + BORDER_SIZE) + LINE_OFFSET + SHAPE_OFFSET);
                    
                    ctx.stroke();
                break;
                
                case CELL_TYPE.O:
                    ctx.strokeStyle = O_COLOR;

                    ctx.beginPath();

                    ctx.arc(x * (CELL_SIZE + BORDER_SIZE) + (CELL_SIZE / 2) + LINE_OFFSET, y * (CELL_SIZE + BORDER_SIZE) + (CELL_SIZE / 2) + LINE_OFFSET,
                        (CELL_SIZE / 2) - SHAPE_OFFSET, 0, 2 * Math.PI);

                    ctx.stroke();
                break;

                default:
                    break;
            }
        }
    }
}

/**
 * Writes currently playing player into given span.
 * 
 * @param {Number} currentPlayer The currently playing player.
 * @param {HTMLSpanElement} currentlyPlayingSpan The span to write currently playing player into.
 */
export function update_currently_playing(currentPlayer, currentlyPlayingSpan) {
    let playingString = "";

    switch (currentPlayer) {
        case CELL_TYPE.X:
            playingString = "X";
            currentlyPlayingSpan.style.color = X_COLOR
        break;
    
        case CELL_TYPE.O:
            playingString = "O";
            currentlyPlayingSpan.style.color = O_COLOR
        break;

        default:
            playingString = "ERROR";
            currentlyPlayingSpan.style.color = ERROR_COLOR
        break;
    }

    currentlyPlayingSpan.textContent = playingString;
}

/**
 * Prints the winner of the game into the given header.
 * 
 * @param {number} winner The winner of the game.
 * @param {HTMLHeadingElement} currentlyPlayingHeader The header to write to.
 */
export function show_winner_text(winner, currentlyPlayingHeader) {
    let winnerString = "";
    let winnerColor = "";

    switch (winner) {
        case CELL_TYPE.X:
            winnerString = "X";
            winnerStyle = X_COLOR;
            break;
        case CELL_TYPE.O:
            winnerString = "O";
            winnerStyle = O_COLOR;
            break;

        default:
            winnerString = "ERROR";
            winnerColor = ERROR_COLOR;
            break;
    }

    currentlyPlayingHeader.innerHTML = "<span>" + winnerString + "</span> wins!";
    currentlyPlayingHeader.querySelector("span").style.color = winnerColor;
}