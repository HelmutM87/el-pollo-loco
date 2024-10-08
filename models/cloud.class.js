/**
 * Represents a cloud object in the game, inheriting from MovableObject.
 */
class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    constructor() {
        super().loadImage(
            'img_pollo_locco/img/5_background/layers/4_clouds/1.png',
            'img_pollo_locco/img/5_background/layers/4_clouds/2.png'
        );
        this.x = 0 + Math.random() * 7500;
        this.animate();
    }

    /**
     * Initiates animation for the cloud object.
     * Moves the cloud to the left at regular intervals.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 20);
        this.moveLeft();
    }
}