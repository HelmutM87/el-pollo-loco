/**
 * Represents the game world, managing the character, enemies, objects, and interactions.
 */
class World {
    character = new Character();
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    bottles = level1.bottles;
    coins = level1.coins;
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    liveStatusBar = new LiveStatusBar();
    bottleStatusBar = new BottleStatusBar();
    endbossStatusBar = new EndbossStatusBar();
    coinStatusBar = new CoinStatusBar();
    throwableObjects = [];
    canPressD = true;
    canPressRightArrow = true;
    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/glass.mp3');
    background_music = new Audio('audio/background-music.mp3');
    battle_music = new Audio('audio/hen-attac-background-music.mp3');
    win_music = new Audio('audio/winner-song.mp3');
    lose_music = new Audio('audio/loser-song.mp3');
    isBattleMusicPlaying = false;
    isMuted = false;

    /**
     * Constructs a new World instance.
     * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.isBattleMusicPlaying = false;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
            }
        });
    }

    /**
     * Sets the world reference for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the main game loop, checking for collisions and handling object throws.
     */
    run() {
        if (!isMuted) {
            this.background_music.play();
        }
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 80);
    }

    /**
     * Switches the background music to battle music when the Endboss is encountered.
     */
    switchToBattleMusic() {
        if (!this.isBattleMusicPlaying) {
            this.background_music.pause();
            if (!isMuted) {
                this.battle_music.play();
            }
            this.isBattleMusicPlaying = true;
        }
    }

    /**
     * Checks if the player is attempting to throw a bottle and handles the throw action.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.canPressD && this.character.bottleDepot > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.character.decreaseBottleDepot();
            this.bottleStatusBar.setStock(this.character.bottleDepot);
            this.canPressD = false;
            setTimeout(() => {
                this.canPressD = true;
            }, 500);
        }
    }

    /**
     * Checks for collisions between the character and various objects in the game.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isTrampling(enemy)) {
                if (enemy instanceof Endboss) {
                } else {
                    this.character.jump();
                    enemy.isKilled(index);
                    setTimeout(() => {
                        this.deleteEnemy(index);
                    }, 800);
                }
            } else if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.liveStatusBar.setPercentage(this.character.energy);
                if (enemy instanceof Endboss) {
                    this.canPressRightArrow = false;
                }
            } else if (enemy instanceof Endboss && !this.character.isColliding(enemy)) {
                this.canPressRightArrow = true;
            }
        });

        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.pickCoin(coin);
                if (!isMuted) {
                    this.coin_sound.play();
                }
                level1.coins.splice(index, 1);
                this.liveStatusBar.setPercentage(this.character.energy);
            }
        });

        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.pickBottle();
                if (!isMuted) {
                    this.bottle_sound.play();
                }
                level1.bottles.splice(index, 1);
                this.bottleStatusBar.setStock(this.character.bottleDepot);
            }
        });

        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy)) {
                    bottle.splash();
                    if (enemy instanceof Endboss) {
                        if (enemy.energy < 1) {
                            this.deleteEndboss();
                            this.winningGame();
                        } else {
                            enemy.hit(2);
                            this.endbossStatusBar.setPercentage(enemy.energy);
                            this.switchToBattleMusic();
                        }
                    } else {
                        enemy.isKilled(enemyIndex);
                        setTimeout(() => {
                            this.deleteEnemy(enemyIndex);
                        }, 800);
                    }
                }
            });
        });
    }

    /**
     * Draws the game world, updating the canvas at each frame.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.bottles);
        this.ctx.translate(-this.camera_x, 0);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.liveStatusBar);
        this.addToMap(this.endbossStatusBar);
        this.addToMap(this.bottleStatusBar);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds multiple objects to the game map.
     * @param {Array} objects - The array of objects to add.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the game map.
     * @param {MovableObject} mo - The object to add.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally.
     * @param {MovableObject} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips the image back to its original orientation.
     * @param {MovableObject} mo - The object to flip back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Deletes an enemy from the game.
     * @param {number} index - The index of the enemy to delete.
     */
    deleteEnemy(index) {
        if (!(this.level.enemies[index] instanceof Endboss)) {
            level1.enemies.splice(index, 1);
        }
    }

    /**
     * Deletes the Endboss from the game.
     */
    deleteEndboss() {
        this.level.enemies = this.level.enemies.filter(enemy => !(enemy instanceof Endboss));
    }

    /**
     * Toggles the audio on or off.
     */
    toggleAudio() {
        isMuted = !isMuted;
        world.background_music.muted = isMuted;
        world.battle_music.muted = isMuted;
        world.win_music.muted = isMuted;
        world.lose_music.muted = isMuted;

        const muteButton = document.getElementById('my_mute_button');
        if (isMuted) {
            muteButton.src = '/images/mute.png';
        } else {
            muteButton.src = '/images/audio.png';
        }
    }

    /**
     * Handles the winning game scenario, stopping all intervals and playing the win music.
     */
    winningGame() {
        clearAllIntervals();
        this.battle_music.pause();
        this.background_music.pause();
        if (!isMuted) {
            this.win_music.play();
        }
        document.getElementById('canvas').classList.add("d-none");
        document.getElementById('canvas_navbar_header').classList.add("d-none");
        document.getElementById('canvas_navbar_footer').classList.add("d-none");
        document.getElementById('start_screen').classList.remove("z-index1");
        document.getElementById('won').classList.remove("d-none");
        document.getElementById('start_screen').classList.remove("start_screen");
        document.getElementById('start_screen').classList.add("end_screen_won");
    }
}