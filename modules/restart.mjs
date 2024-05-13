import { Size } from "./size.mjs";

/**
 * Restarts the game.
 * 
 * @param {Size} gridSize The size of the grid to restart at.
 */
export function restart(gridSize) {
    window.location.search = "?width=" + gridSize.width + "&height=" + gridSize.height
    location.reload();
}

/**
 * Goes back to size select screen.
 */
export function back() {
    window.location.search = "?";
    location.reload();
}