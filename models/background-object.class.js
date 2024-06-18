/**
 * Represents a background object in the game.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates an instance of BackgroundObject.
     * @param {string} imagePath - The path to the image of the background object.
     * @param {number} x - The x-coordinate where the background object will be placed.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.y = 480 - this.height; 
        this.x = x;
    }
}