import { CELL_SIZE, Size } from "./size.mjs";
import { Vector2 } from "./vector2.mjs";

/**
 * Converts given pixel X, Y coordinates into cell X, Y coordinates
 * 
 * @param {Number} clickedX The X pos where the user clicked
 * @param {Number} clickedY The Y pos where the user clicked
 * @param {Number} canvas_width The width of the canvas.
 * @param {Number} canvas_height The height of the canvas.
 * @param {Size} field_size The size of the field.
 * @return {Vector2} The clicked cell in Vector2 format
 */
export function clicked_cell(clickedX, clickedY, canvas_width, canvas_height, field_size) {
    clickedY += document.body.scrollTop;

    let cellX = Math.min(Math.max(Math.floor(clickedX / (CELL_SIZE + 1)), 0), field_size.width);
    let cellY = Math.min(Math.max(Math.floor(clickedY / (CELL_SIZE + 1)), 0), field_size.height); // Constrains number to be within canvas width
    
    let cell = new Vector2(cellX, cellY)

    return cell
}