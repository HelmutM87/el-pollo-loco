/**
 * Represents a level in the game, containing various elements such as enemies, clouds, bottles, coins, and background objects.
 */
class Level {
    enemies;           
    clouds;            
    bottles;            
    coins;             
    backgroundObjects; 
    level_end_x = 7280; 

    /**
     * Constructs a new Level instance.
     * @param {Array} enemies - The enemies present in the level.
     * @param {Array} clouds - The clouds present in the level.
     * @param {Array} bottles - The bottles present in the level.
     * @param {Array} coins - The coins present in the level.
     * @param {Array} backgroundObjects - The background objects present in the level.
     */
    constructor (enemies, clouds, bottles, coins, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}