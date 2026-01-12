/**
 * Canvas renderer for the game
 */
export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = 800;
        this.height = 600;

        // Set canvas size
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    /**
     * Clear the canvas
     */
    clear() {
        this.ctx.fillStyle = '#2d5016'; // Golf course green
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    /**
     * Draw the course (walls, hole, starting area)
     */
    drawCourse(course) {
        const ctx = this.ctx;

        // Draw hole
        const hole = course.getHole();

        // Hole shadow
        ctx.beginPath();
        ctx.arc(hole.x + 2, hole.y + 2, hole.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fill();

        // Hole
        ctx.beginPath();
        ctx.arc(hole.x, hole.y, hole.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();

        // Hole flag
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(hole.x, hole.y);
        ctx.lineTo(hole.x, hole.y - 40);
        ctx.stroke();

        // Flag
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.moveTo(hole.x, hole.y - 40);
        ctx.lineTo(hole.x + 15, hole.y - 35);
        ctx.lineTo(hole.x, hole.y - 30);
        ctx.fill();

        // Draw starting area
        const start = course.getStartPosition();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(start.x, start.y, 30, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw walls
        const walls = course.getWalls();
        walls.forEach(wall => {
            // Wall shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(wall.x + 3, wall.y + 3, wall.width, wall.height);

            // Wall
            ctx.fillStyle = wall.color;
            ctx.fillRect(wall.x, wall.y, wall.width, wall.height);

            // Wall highlight
            ctx.strokeStyle = '#D2691E';
            ctx.lineWidth = 2;
            ctx.strokeRect(wall.x, wall.y, wall.width, wall.height);
        });
    }

    /**
     * Draw the ball
     */
    drawBall(ball) {
        const ctx = this.ctx;

        // Ball shadow
        ctx.beginPath();
        ctx.arc(ball.x + 3, ball.y + 3, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fill();

        // Ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();

        // Ball outline
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Ball highlight
        ctx.beginPath();
        ctx.arc(ball.x - 3, ball.y - 3, ball.radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
    }

    /**
     * Draw aim guide when aiming
     */
    drawAimGuide(ball, aimStart, aimCurrent) {
        const ctx = this.ctx;

        // Calculate direction and power
        const dx = aimStart.x - aimCurrent.x;
        const dy = aimStart.y - aimCurrent.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 5) return; // Don't draw if drag is too small

        // Limit display distance
        const maxDistance = 150;
        const displayDistance = Math.min(distance, maxDistance);
        const ratio = displayDistance / distance;

        const endX = aimStart.x - dx * ratio;
        const endY = aimStart.y - dy * ratio;

        // Draw power bar
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Draw arrow head
        const angle = Math.atan2(dy, dx);
        const arrowSize = 15;

        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(
            endX + arrowSize * Math.cos(angle - Math.PI / 6),
            endY + arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
            endX + arrowSize * Math.cos(angle + Math.PI / 6),
            endY + arrowSize * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();

        // Draw power indicator
        const powerPercent = Math.min((distance / maxDistance) * 100, 100);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Power: ${Math.round(powerPercent)}%`, ball.x, ball.y - 30);
    }

    /**
     * Draw game state message
     */
    drawMessage(message, x, y) {
        const ctx = this.ctx;

        // Background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(x - 150, y - 40, 300, 80);

        // Text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(message, x, y);
    }

    /**
     * Draw win message
     */
    drawWinMessage(strokes) {
        const ctx = this.ctx;
        const centerX = this.width / 2;
        const centerY = this.height / 2;

        // Semi-transparent overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, this.width, this.height);

        // Win message box
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(centerX - 200, centerY - 100, 400, 200);

        // Border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.strokeRect(centerX - 200, centerY - 100, 400, 200);

        // Text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('HOLE IN!', centerX, centerY - 40);

        ctx.font = 'bold 32px Arial';
        ctx.fillText(`${strokes} Stroke${strokes !== 1 ? 's' : ''}`, centerX, centerY + 20);

        ctx.font = '20px Arial';
        ctx.fillText('Click Restart to play again', centerX, centerY + 60);
    }

    /**
     * Get canvas coordinates from mouse/touch event
     */
    getCanvasCoordinates(event) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        let clientX, clientY;

        if (event.touches && event.touches.length > 0) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }

        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    }
}
