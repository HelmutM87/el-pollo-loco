let level1;

/**
 * Initializes the game level by creating instances of various game objects
 * and adding them to the level.
 */
function initLevel() {

    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new BabyChicken(),
            new BabyChicken(),
            new BabyChicken(),
            new BabyChicken(),
            new BabyChicken(),
            new BabyChicken(),
            new Endboss()
        ],

        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud()
        ],

        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ],

        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ],

        [
            new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', -719 * 2),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', -719 * 2),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', -719 * 2),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', -719 * 2),

            new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', -719),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 0),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 719 * 4),

            new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719 * 5),

            new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 6),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719 * 6),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719 * 6),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 719 * 6),

            new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 7),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719 * 7),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719 * 7),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719 * 7),

            new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 8),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719 * 8),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719 * 8),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 719 * 8),

            new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 9),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719 * 9),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719 * 9),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719 * 9),

            new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 10),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719 * 10),
            new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719 * 10),

            new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 719 * 10)
        ]
    );
}