/**
 * Represents a status bar for coins in the game, inheriting from DrawableObject.
 */
class CoinStatusBar extends DrawableObject {
    IMAGES = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 60;
        this.width = 150;
        this.height = 40;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage value of the status bar.
     * Updates the displayed image based on the current percentage.
     * @param {number} percentage - The percentage value to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image in the IMAGES array based on the current percentage.
     * @returns {number} - The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}