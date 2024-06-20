/**
 * Represents a coin object in the game, inheriting from DrawableObject.
 */
class Coin extends DrawableObject {
    height = 120;
    width = 120;
    y = 50;

    offset = {
        top: 0,
        left: 30,
        right: 30,
        bottom: 40
    };

    IMAGES_COINS_BLINKING = [
        'img_pollo_locco/img/8_coin/coin_1.png',
        'img_pollo_locco/img/8_coin/coin_2.png'
    ];

    coin_sound = new Audio('audio/coin.mp3');

    constructor() {
        super();
        this.loadImage('img_pollo_locco/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS_BLINKING);
        this.x = -1300 + Math.random() * 8000;
        this.y = 20 + Math.random() * 250;
        this.animate();
    }

    /**
     * Initiates the animation loop for the blinking animation of the coin.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS_BLINKING);
        }, 500);
    }
}