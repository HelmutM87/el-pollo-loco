/**
 * Represents a background object in the game.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
}