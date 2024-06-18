/**
 * Represents the status bar for the Endboss, displaying its health percentage.
 * Inherits from DrawableObject.
 */
class EndbossStatusBar extends DrawableObject {
    IMAGES = [
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green100.png',
    ];

    percentage = 100;

    /**
     * Constructs an instance of EndbossStatusBar.
     * Initializes position, dimensions, and loads images.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 550;
        this.y = 3;
        this.width = 150;
        this.height = 41;
        this.setPercentage(100); 
    }

    /**
     * Sets the health percentage and updates the displayed image accordingly.
     * @param {number} percentage - The health percentage to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image to be displayed based on the current health percentage.
     * @returns {number} - Index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
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