/**
 * Vector2D class for 2D physics calculations
 */
export class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Add another vector to this vector
     */
    add(v) {
        return new Vector2D(this.x + v.x, this.y + v.y);
    }

    /**
     * Subtract another vector from this vector
     */
    subtract(v) {
        return new Vector2D(this.x - v.x, this.y - v.y);
    }

    /**
     * Multiply vector by a scalar
     */
    multiply(scalar) {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    /**
     * Get the length (magnitude) of the vector
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Get normalized vector (length = 1)
     */
    normalize() {
        const len = this.length();
        if (len === 0) return new Vector2D(0, 0);
        return new Vector2D(this.x / len, this.y / len);
    }

    /**
     * Get distance between two points
     */
    static distance(v1, v2) {
        const dx = v2.x - v1.x;
        const dy = v2.y - v1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Copy vector
     */
    copy() {
        return new Vector2D(this.x, this.y);
    }
}

/**
 * Physics constants
 */
export const FRICTION = 0.98;
export const BOUNCE_DAMPING = 0.7;
export const STOP_THRESHOLD = 0.1;
export const MAX_VELOCITY = 15;

/**
 * Check if ball collides with a wall
 */
export function checkWallCollision(ball, wall) {
    const { x, y, radius } = ball;

    // Check collision with rectangular wall
    const closestX = Math.max(wall.x, Math.min(x, wall.x + wall.width));
    const closestY = Math.max(wall.y, Math.min(y, wall.y + wall.height));

    const distanceX = x - closestX;
    const distanceY = y - closestY;
    const distanceSquared = distanceX * distanceX + distanceY * distanceY;

    return distanceSquared < (radius * radius);
}

/**
 * Resolve collision with a wall
 */
export function resolveWallCollision(ball, wall) {
    const { x, y, radius, velocity } = ball;

    // Determine which side of the wall we hit
    const ballCenterX = x;
    const ballCenterY = y;
    const wallCenterX = wall.x + wall.width / 2;
    const wallCenterY = wall.y + wall.height / 2;

    const dx = ballCenterX - wallCenterX;
    const dy = ballCenterY - wallCenterY;

    const halfWidth = wall.width / 2;
    const halfHeight = wall.height / 2;

    // Calculate overlap on each axis
    const overlapX = halfWidth + radius - Math.abs(dx);
    const overlapY = halfHeight + radius - Math.abs(dy);

    if (overlapX < overlapY) {
        // Horizontal collision (left or right side)
        if (dx > 0) {
            ball.x = wall.x + wall.width + radius;
        } else {
            ball.x = wall.x - radius;
        }
        ball.velocity.x = -ball.velocity.x * BOUNCE_DAMPING;
    } else {
        // Vertical collision (top or bottom side)
        if (dy > 0) {
            ball.y = wall.y + wall.height + radius;
        } else {
            ball.y = wall.y - radius;
        }
        ball.velocity.y = -ball.velocity.y * BOUNCE_DAMPING;
    }
}

/**
 * Check if ball is in the hole
 */
export function checkHoleCollision(ball, hole) {
    const distance = Vector2D.distance(
        new Vector2D(ball.x, ball.y),
        new Vector2D(hole.x, hole.y)
    );

    // Ball must be slow enough and close enough to fall in
    const isCloseEnough = distance < hole.radius - ball.radius * 0.5;
    const isSlowEnough = ball.velocity.length() < 2;

    return isCloseEnough && isSlowEnough;
}

/**
 * Apply friction to ball
 */
export function applyFriction(velocity) {
    velocity.x *= FRICTION;
    velocity.y *= FRICTION;

    // Stop ball if velocity is very low
    if (velocity.length() < STOP_THRESHOLD) {
        velocity.x = 0;
        velocity.y = 0;
    }
}
