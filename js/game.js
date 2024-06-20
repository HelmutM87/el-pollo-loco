let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;
window.my_mute = false;
window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
window.addEventListener("load", function () {
    bindKeyEvents();
});

/**
 * Initializes and starts the game.
 */
function init() {
    initLevel();
    setTimeout(() => {
        canvas = document.getElementById('canvas');
        document.getElementById('play_button').classList.add("d-none");
        document.getElementById('canvas_navbar_footer').classList.remove("d-none");
        document.getElementById('canvas').classList.remove("d-none");
        document.getElementById('my_mute_button').classList.remove("d-none");
        document.getElementById('mobile_buttons').classList.remove("d-none");
        world = new World(canvas, keyboard);
        bindTouchEvents();
    }, 1500);
}

/**
 * Checks if the device is in landscape orientation.
 */
function checkOrientation() {
    const orientationWarning = document.getElementById('orientationWarning');
    if (orientationWarning) {
        if (window.innerWidth > window.innerHeight)
            orientationWarning.style.display = 'none';
        else
            orientationWarning.style.display = 'block';
    }
}

/**
 * Binds key events for keyboard controls.
 */
function bindKeyEvents() {
    window.addEventListener("keydown", (e) => {
        if (e.keyCode == 39) keyboard.RIGHT = true;
        if (e.keyCode == 37) keyboard.LEFT = true;
        if (e.keyCode == 38) keyboard.UP = true;
        if (e.keyCode == 40) keyboard.DOWN = true;
        if (e.keyCode == 32) keyboard.SPACE = true;
        if (e.keyCode == 68) keyboard.D = true;
        world.character.handleKeyPress();
    });

    window.addEventListener("keyup", (e) => {
        if (e.keyCode == 39) keyboard.RIGHT = false;
        if (e.keyCode == 37) keyboard.LEFT = false;
        if (e.keyCode == 38) keyboard.UP = false;
        if (e.keyCode == 40) keyboard.DOWN = false;
        if (e.keyCode == 32) keyboard.SPACE = false;
        if (e.keyCode == 68) keyboard.D = false;
        world.character.handleKeyUp();
    });
}

/**
 * Binds touch events for mobile controls.
 */
function bindTouchEvents() {
    document.getElementById('go_left_button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
        world.character.handleKeyPress();
    });

    document.getElementById('go_left_button').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
        world.character.handleKeyUp();
    });

    document.getElementById('go_right_button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
        world.character.handleKeyPress();
    });

    document.getElementById('go_right_button').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
        world.character.handleKeyUp();
    });

    document.getElementById('jump_button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
        world.character.handleKeyPress();
    });

    document.getElementById('jump_button').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
        world.character.handleKeyUp();
    });

    document.getElementById('throw_button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
        world.character.handleKeyPress();
    });

    document.getElementById('throw_button').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
        world.character.handleKeyUp();
    });
}

/**
 * Handles game winning scenario.
 */
function winningGame() {
    if (world)
        world.winningGame();
    document.getElementById('mobile_buttons').classList.add("d-none");
}

/**
 * Handles game losing scenario.
 */
function losingGame() {
    clearAllIntervals();
    document.getElementById('canvas_navbar_footer').classList.add("d-none");
    document.getElementById('canvas').classList.add("d-none");
    document.getElementById('mobile_buttons').classList.add("d-none");
    document.getElementById('start_screen').classList.remove("start_screen");
    document.getElementById('start_screen').classList.add("end_screen_lost");
    document.getElementById('lost').classList.remove("d-none");
}


window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = true;
    if (e.keyCode == 37) keyboard.LEFT = true;
    if (e.keyCode == 38) keyboard.UP = true;
    if (e.keyCode == 40) keyboard.DOWN = true;
    if (e.keyCode == 32) keyboard.SPACE = true;
    if (e.keyCode == 68) keyboard.D = true;
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 38) keyboard.UP = false;
    if (e.keyCode == 40) keyboard.DOWN = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
    if (e.keyCode == 68) keyboard.D = false;
});

/**
 * Clears all intervals.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Opens the info screen.
 */
function openInfo() {
    document.getElementById('info').classList.remove("d-none");
}

/**
 * Closes the info screen.
 */
function closeInfo() {
    document.getElementById('info').classList.add("d-none");
}

/**
 * Resets the game to its initial state.
 */
function resetGame() {
    clearAllIntervals();
    if (world) {
        stopBackgroundMusics();
        if (world.character && world.character.game_over_sound) {
            world.character.game_over_sound.pause();
            world.character.game_over_sound.currentTime = 0;
        }
        world = null;
    }
    resetGraphicElements();
    keyboard = new Keyboard();
}

/**
 * Restarts the game.
 * - Clears all intervals.
 * - Stops background music.
 * - Resets the world and keyboard objects.
 * - Resets the graphic elements to their initial state.
 * - Calls the init function to restart the game.
 */
function restartGame() {
    clearAllIntervals();
    if (world) {
        stopBackgroundMusics();
        if (world.character && world.character.game_over_sound) {
            world.character.game_over_sound.pause();
            world.character.game_over_sound.currentTime = 0;
        }
        world = null;
    }
    resetGraphicElements();
    keyboard = new Keyboard();
    init();

}

/**
 * Stops all background musics and resets their current time.
 */
function stopBackgroundMusics() {
    if (world.background_music) world.background_music.pause();
    if (world.battle_music) world.battle_music.pause();
    if (world.win_music) world.win_music.pause();
    if (world.lose_music) world.lose_music.pause();
    if (world.background_music) world.background_music.currentTime = 0;
    if (world.battle_music) world.battle_music.currentTime = 0;
    if (world.win_music) world.win_music.currentTime = 0;
    if (world.lose_music) world.lose_music.currentTime = 0;
}

/**
 * Resets the graphic elements to their initial state.
 */
function resetGraphicElements() {
    document.getElementById('canvas').classList.add("d-none");
    document.getElementById('canvas_navbar_footer').classList.add("d-none");
    document.getElementById('canvas_navbar_header').classList.remove("d-none");
    document.getElementById('my_mute_button').classList.add("d-none");
    document.getElementById('mobile_buttons').classList.add("d-none");
    document.getElementById('start_screen').classList.remove("z-index1");
    document.getElementById('start_screen').classList.remove("end_screen_won");
    document.getElementById('start_screen').classList.remove("end_screen_lost");
    document.getElementById('start_screen').classList.add("start_screen");
    document.getElementById('lost').classList.add("d-none");
    document.getElementById('won').classList.add("d-none");
    document.getElementById('play_button').classList.remove("d-none");
}

/**
 * Stops the audio and resets its current time.
 */
Audio.prototype.stop = function () {
    this.pause();
    this.currentTime = 0;
};

/**
 * Opens the impressum screen.
 * - Makes the impressum element visible.
 */
function openImpressum() {
    document.getElementById('impressum').classList.remove("d-none");
}

/**
 * Closes the impressum screen.
 * - Hides the impressum element.
 */
function closeImpressum() {
    document.getElementById('impressum').classList.add("d-none");
}