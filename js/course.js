/**
 * Course layout and obstacles
 */
export class Course {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        // Starting position (bottom center)
        this.startPosition = {
            x: width / 2,
            y: height - 80
        };

        // Hole position (top center area)
        this.hole = {
            x: width / 2,
            y: 100,
            radius: 20
        };

        // Wall obstacles - make it interesting
        this.walls = [
            // Left wall obstacle
            {
                x: 150,
                y: 200,
                width: 100,
                height: 20,
                color: '#8B4513'
            },
            // Right wall obstacle
            {
                x: width - 250,
                y: 350,
                width: 100,
                height: 20,
                color: '#8B4513'
            },
            // Center barrier
            {
                x: width / 2 - 50,
                y: height / 2 - 10,
                width: 100,
                height: 20,
                color: '#8B4513'
            }
        ];

        // Course boundaries (invisible walls)
        this.boundaries = {
            left: 0,
            right: width,
            top: 0,
            bottom: height
        };
    }

    /**
     * Check if point is within course bounds
     */
    isInBounds(x, y) {
        return x >= 0 && x <= this.width && y >= 0 && y <= this.height;
    }

    /**
     * Get starting position
     */
    getStartPosition() {
        return { ...this.startPosition };
    }

    /**
     * Get hole
     */
    getHole() {
        return { ...this.hole };
    }

    /**
     * Get all walls
     */
    getWalls() {
        return this.walls;
    }

    /**
     * Check boundary collisions and resolve
     */
    checkBoundaries(ball) {
        let collided = false;

        // Left boundary
        if (ball.x - ball.radius < this.boundaries.left) {
            ball.x = this.boundaries.left + ball.radius;
            ball.velocity.x = -ball.velocity.x * 0.7;
            collided = true;
        }

        // Right boundary
        if (ball.x + ball.radius > this.boundaries.right) {
            ball.x = this.boundaries.right - ball.radius;
            ball.velocity.x = -ball.velocity.x * 0.7;
            collided = true;
        }

        // Top boundary
        if (ball.y - ball.radius < this.boundaries.top) {
            ball.y = this.boundaries.top + ball.radius;
            ball.velocity.y = -ball.velocity.y * 0.7;
            collided = true;
        }

        // Bottom boundary
        if (ball.y + ball.radius > this.boundaries.bottom) {
            ball.y = this.boundaries.bottom - ball.radius;
            ball.velocity.y = -ball.velocity.y * 0.7;
            collided = true;
        }

        return collided;
    }
}
