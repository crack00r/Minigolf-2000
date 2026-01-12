import { Ball } from './ball.js';
import { Course } from './course.js';
import { Renderer } from './renderer.js';
import { InputHandler } from './input.js';
import {
    applyFriction,
    checkWallCollision,
    resolveWallCollision,
    checkHoleCollision
} from './physics.js';

/**
 * Game states
 */
export const GameState = {
    READY: 'READY',
    AIMING: 'AIMING',
    ROLLING: 'ROLLING',
    FINISHED: 'FINISHED'
};

/**
 * Main game controller
 */
export class Game {
    constructor(canvas) {
        // Set up renderer
        this.renderer = new Renderer(canvas);

        // Create course
        this.course = new Course(this.renderer.width, this.renderer.height);

        // Create ball at starting position
        const startPos = this.course.getStartPosition();
        this.ball = new Ball(startPos.x, startPos.y, 10);

        // Set up input handler
        this.input = new InputHandler(canvas, this);

        // Game state
        this.state = GameState.READY;
        this.strokes = 0;
        this.lastTime = 0;

        // Bind restart button
        this.setupRestartButton();
    }

    /**
     * Set up restart button
     */
    setupRestartButton() {
        const restartBtn = document.getElementById('restartBtn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.restart());
        }
    }

    /**
     * Update stroke count display
     */
    updateStrokeDisplay() {
        const strokeElement = document.getElementById('strokeCount');
        if (strokeElement) {
            strokeElement.textContent = this.strokes;
        }
    }

    /**
     * Set game state
     */
    setState(newState) {
        this.state = newState;
    }

    /**
     * Increment stroke count
     */
    incrementStrokes() {
        this.strokes++;
        this.updateStrokeDisplay();
    }

    /**
     * Restart game
     */
    restart() {
        this.ball.reset();
        this.strokes = 0;
        this.state = GameState.READY;
        this.updateStrokeDisplay();
    }

    /**
     * Main game loop
     */
    update(currentTime) {
        // Calculate delta time
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Update game based on state
        if (this.state === GameState.ROLLING) {
            // Update ball physics
            this.ball.update(deltaTime);

            // Apply friction
            applyFriction(this.ball.velocity);

            // Check boundary collisions
            this.course.checkBoundaries(this.ball);

            // Check wall collisions
            const walls = this.course.getWalls();
            walls.forEach(wall => {
                if (checkWallCollision(this.ball, wall)) {
                    resolveWallCollision(this.ball, wall);
                }
            });

            // Check if ball is in hole
            const hole = this.course.getHole();
            if (checkHoleCollision(this.ball, hole)) {
                this.setState(GameState.FINISHED);
            }

            // Check if ball has stopped
            if (this.ball.isStopped() && this.state !== GameState.FINISHED) {
                this.setState(GameState.READY);
            }
        }

        // Render
        this.render();

        // Continue loop
        requestAnimationFrame((time) => this.update(time));
    }

    /**
     * Render the game
     */
    render() {
        // Clear canvas
        this.renderer.clear();

        // Draw course
        this.renderer.drawCourse(this.course);

        // Draw ball
        this.renderer.drawBall(this.ball);

        // Draw aim guide if aiming
        if (this.state === GameState.AIMING) {
            const dragState = this.input.getDragState();
            if (dragState.isDragging && dragState.start && dragState.current) {
                this.renderer.drawAimGuide(
                    this.ball,
                    dragState.start,
                    dragState.current
                );
            }
        }

        // Draw win message if finished
        if (this.state === GameState.FINISHED) {
            this.renderer.drawWinMessage(this.strokes);
        }
    }

    /**
     * Start the game loop
     */
    start() {
        this.lastTime = performance.now();
        requestAnimationFrame((time) => this.update(time));
    }
}
