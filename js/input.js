import { Vector2D } from './physics.js';
import { GameState } from './game.js';

/**
 * Input handler for mouse and touch events
 */
export class InputHandler {
    constructor(canvas, game) {
        this.canvas = canvas;
        this.game = game;
        this.isDragging = false;
        this.dragStart = null;
        this.dragCurrent = null;

        this.setupEventListeners();
    }

    /**
     * Set up mouse and touch event listeners
     */
    setupEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => this.handleStart(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleEnd(e));

        // Touch events
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleStart(e);
        }, { passive: false });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.handleMove(e);
        }, { passive: false });

        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.handleEnd(e);
        }, { passive: false });
    }

    /**
     * Handle start of drag (mouse down / touch start)
     */
    handleStart(event) {
        const coords = this.game.renderer.getCanvasCoordinates(event);
        const ball = this.game.ball;

        // Check if we clicked on the ball
        const distance = Vector2D.distance(
            new Vector2D(coords.x, coords.y),
            new Vector2D(ball.x, ball.y)
        );

        if (distance <= ball.radius + 10 && this.game.state === GameState.READY) {
            this.isDragging = true;
            this.dragStart = coords;
            this.dragCurrent = coords;
            this.game.setState(GameState.AIMING);
        }
    }

    /**
     * Handle drag movement (mouse move / touch move)
     */
    handleMove(event) {
        if (!this.isDragging) return;

        const coords = this.game.renderer.getCanvasCoordinates(event);
        this.dragCurrent = coords;
    }

    /**
     * Handle end of drag (mouse up / touch end)
     */
    handleEnd(event) {
        if (!this.isDragging) return;

        const ball = this.game.ball;
        const dx = this.dragStart.x - this.dragCurrent.x;
        const dy = this.dragStart.y - this.dragCurrent.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Only shoot if drag was significant
        if (distance > 5) {
            const direction = new Vector2D(dx, dy);
            ball.shoot(direction, distance);
            this.game.incrementStrokes();
            this.game.setState(GameState.ROLLING);
        } else {
            // Cancel aim if drag was too small
            this.game.setState(GameState.READY);
        }

        this.isDragging = false;
        this.dragStart = null;
        this.dragCurrent = null;
    }

    /**
     * Get current drag state for rendering
     */
    getDragState() {
        return {
            isDragging: this.isDragging,
            start: this.dragStart,
            current: this.dragCurrent
        };
    }
}
