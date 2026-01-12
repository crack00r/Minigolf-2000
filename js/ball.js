import { Vector2D } from './physics.js';

/**
 * Ball entity
 */
export class Ball {
    constructor(x, y, radius = 10) {
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = new Vector2D(0, 0);
        this.color = '#ffffff';
    }

    /**
     * Update ball position based on velocity
     */
    update(deltaTime) {
        // Convert deltaTime from ms to seconds and cap it
        const dt = Math.min(deltaTime / 1000, 0.1);

        // Update position
        this.x += this.velocity.x * dt * 60;
        this.y += this.velocity.y * dt * 60;
    }

    /**
     * Check if ball has stopped moving
     */
    isStopped() {
        return this.velocity.length() < 0.1;
    }

    /**
     * Reset ball to starting position
     */
    reset() {
        this.x = this.startX;
        this.y = this.startY;
        this.velocity = new Vector2D(0, 0);
    }

    /**
     * Set velocity from direction and power
     */
    shoot(direction, power) {
        // Power is scaled down to reasonable velocity
        const maxPower = 200;
        const scaledPower = Math.min(power, maxPower) / maxPower;
        const velocity = 15 * scaledPower; // Max velocity of 15

        this.velocity = direction.normalize().multiply(velocity);
    }

    /**
     * Get ball position as Vector2D
     */
    getPosition() {
        return new Vector2D(this.x, this.y);
    }
}
