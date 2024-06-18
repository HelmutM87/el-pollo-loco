/**
 * Represents a drawable object with basic properties and methods for drawing and animation.
 */
class DrawableObject {
    img;
    imageCache = {}; 
    currentImage = 0; 
    x = 120; 
    y = 280; 
    height = 150;
    width = 100;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Loads an image from the given path.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object onto the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading image', e);
            console.log('Could not load Image', this.img.src);
        }
    }

    /**
     * Plays an animation using the provided array of image paths.
     * @param {string[]} images - Array of image paths for the animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Checks if this object is colliding with another movable object.
     * @param {MovableObject} mo - The movable object to check collision against.
     * @returns {boolean} - True if colliding, false otherwise.
     */
    isColliding(mo) {
        if (!mo) {
            return false;
        }

        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Checks if this object is trampling (colliding and above ground) another movable object.
     * @param {MovableObject} mo - The movable object to check trampling against.
     * @returns {boolean} - True if trampling, false otherwise.
     */
    isTrampling(mo) {
        return this.isColliding(mo) && this.isAboveGround();
    }

    /**
     * Draws a blue frame around the object's bounding box for debugging purposes.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof BabyChicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Draws a red frame around the object's actual visible area (considering offset) for debugging purposes.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    drawOffset(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof BabyChicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.stroke();
        }
    }

    /**
     * Preloads images from the given array into the image cache.
     * @param {string[]} array - Array of image paths to preload.
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Increases the energy attribute when a coin is picked.
     */
    pickCoin() {
        this.energy += 5;
    }

    /**
     * Increases the bottleDepot attribute when a bottle is picked.
     */
    pickBottle() {
        this.bottleDepot += 1;
    }
}