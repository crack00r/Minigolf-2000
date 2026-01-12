# Minigolf-2000

A classic browser-based minigolf game built with vanilla JavaScript and HTML5 Canvas. Test your precision and skill by navigating obstacles to sink the ball in as few strokes as possible.

## Live Demo

Play now: [https://crack00r.github.io/Minigolf-2000/](https://crack00r.github.io/Minigolf-2000/)

## Game Preview

```
   _______________
  |               |
  |    ⚑ HOLE     |
  |               |
  |   [WALL]      |
  |               |
  |      [WALL]   |
  |               |
  |   [WALL]      |
  |               |
  |     ( o )     |
  |    START      |
  |_______________|
```

## How to Play

### Controls

- **Desktop**: Click and drag from the ball to aim, release to shoot
- **Mobile**: Touch and drag from the ball to aim, release to shoot
- **Restart**: Click the "Restart" button to reset the game

### Objective

Get the ball into the hole with as few strokes as possible. Navigate around obstacles and use the physics to your advantage.

### Gameplay Tips

- Longer drag = more power (up to 100%)
- The ball must be moving slowly enough to fall into the hole
- Walls have bounce physics - use angles strategically
- The aim guide shows your shot direction and power percentage

## Features

- **Physics-Based Gameplay**: Realistic ball movement with velocity, friction, and collision detection
- **Drag-and-Shoot Mechanics**: Intuitive aiming system with visual feedback
- **Obstacles**: Navigate around strategically placed wall barriers
- **Stroke Counter**: Track your performance and try to improve
- **Visual Feedback**:
  - Aim guide with power indicator
  - Ball shadows and highlights
  - Hole with flag marker
  - Win screen with stroke count
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Touch Support**: Full touch input handling for mobile play

## Technical Stack

- **Pure Vanilla JavaScript** (ES6 Modules)
- **HTML5 Canvas** for rendering
- **CSS3** for styling and responsive layout
- **No frameworks or dependencies** - just modern web standards

## Project Structure

```
Minigolf-2000/
├── index.html          # Main HTML structure
├── css/
│   └── style.css      # Styling and responsive design
└── js/
    ├── main.js        # Entry point and initialization
    ├── game.js        # Game controller and state management
    ├── ball.js        # Ball entity with physics properties
    ├── course.js      # Course layout, walls, and hole
    ├── renderer.js    # Canvas rendering engine
    ├── input.js       # Mouse and touch input handling
    └── physics.js     # Physics engine (Vector2D, collisions, friction)
```

## Local Development

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (required for ES6 modules)

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/crack00r/Minigolf-2000.git
cd Minigolf-2000
```

2. Start a local web server. Choose one:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

### No Build Step Required

This project uses vanilla JavaScript with ES6 modules - no build tools, bundlers, or transpilers needed. Just serve the files and play.

## Game Mechanics

### Physics System

- **Friction**: 0.98 multiplier per frame (ball gradually slows down)
- **Bounce Damping**: 0.7 multiplier on collisions (energy loss on impact)
- **Stop Threshold**: Ball stops when velocity falls below 0.1
- **Max Velocity**: 15 units (prevents excessive speed)

### Win Condition

The ball enters the hole when:
1. Distance from ball center to hole center < (hole radius - ball radius × 0.5)
2. Ball velocity < 2 units (must be moving slowly)

### Collision Detection

- **Wall Collisions**: Axis-Aligned Bounding Box (AABB) collision detection
- **Boundary Collisions**: Edge detection with velocity reversal
- **Bounce Physics**: Realistic angle reflection with damping

## Browser Compatibility

- Chrome 61+
- Firefox 60+
- Safari 10.1+
- Edge 16+

Requires support for:
- ES6 Modules
- HTML5 Canvas
- Touch Events

## License

MIT License - see [LICENSE](LICENSE) for details

## Credits

- **Built with**: [PAF (Perspective Agent Framework) v4.4](https://github.com/crack00r/paf)
- **Game Design**: PAF Multi-Agent Team
- **Development**: PAF Implementation Agents (Sarah, Dan, Tina)
- **Deployment**: Tony (PAF Deployment Agent)
- **Documentation**: Leo (PAF Technical Writer)
- **Powered by**: Claude AI (Anthropic)

---

**Developed by the PAF Multi-Agent System** | Enjoy the game!
