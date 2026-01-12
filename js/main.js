import { Game } from './game.js';

/**
 * Entry point - Initialize game when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Get canvas element
    const canvas = document.getElementById('gameCanvas');

    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }

    // Create and start game
    const game = new Game(canvas);
    game.start();

    console.log('Minigolf-2000 started!');
});
