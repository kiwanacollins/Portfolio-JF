// 1. First verify Three.js is available
if (typeof THREE === 'undefined') {
    console.error('Three.js is not loaded!');
    throw new Error('Three.js is required');
}

// 2. Basic scene setup with error handling
class StarField {
    constructor() {
        this.init();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        this.camera.position.z = 1000;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);

        // Add to container
        const container = document.getElementById('stars-container');
        container.appendChild(this.renderer.domElement);

        // Initialize arrays
        this.stars = [];

        // Create stars
        this.createStars();
        
        // Setup events
        this.setupEventListeners();
        
        // Start animation
        this.animate();
    }

    createGlowingBall() {
        // Create a circle geometry for the glowing ball
        const size = Math.random() * 3 + 1; // Random size between 1 and 4
        const geometry = new THREE.CircleGeometry(size, 32);
        
        // Create a glowing material
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0.8 + Math.random() * 0.2, 0.8 + Math.random() * 0.2, 1),
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });

        const ball = new THREE.Mesh(geometry, material);

        // Add a glow effect
        const glowGeometry = new THREE.CircleGeometry(size * 2, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0.5, 0.5, 1),
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        ball.add(glow);

        return ball;
    }

    createStars() {
        for (let i = 0; i < 50; i++) {
            const star = this.createGlowingBall();
            
            // Random starting position
            star.position.x = (Math.random() - 0.5) * 2000;
            star.position.y = Math.random() * 2000 - 1000;
            star.position.z = (Math.random() - 0.5) * 2000;

            // Random velocity
            const velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 2,  // x: random direction
                -2 - Math.random() * 4,     // y: always downward
                (Math.random() - 0.5) * 2   // z: random direction
            );

            this.scene.add(star);
            this.stars.push({
                mesh: star,
                velocity: velocity,
                initialOpacity: 0.8 + Math.random() * 0.2,
                pulseSpeed: 0.5 + Math.random() * 2
            });
        }
    }

    resetStar(star) {
        star.mesh.position.x = (Math.random() - 0.5) * 2000;
        star.mesh.position.y = 1000; // Start from top
        star.mesh.position.z = (Math.random() - 0.5) * 2000;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001; // Current time in seconds

        this.stars.forEach(star => {
            // Update position
            star.mesh.position.add(star.velocity);

            // Pulsing glow effect
            const pulseValue = Math.sin(time * star.pulseSpeed) * 0.2 + 0.8;
            star.mesh.material.opacity = star.initialOpacity * pulseValue;
            star.mesh.children[0].material.opacity = 0.3 * pulseValue; // Glow opacity

            // Reset if star goes below screen
            if (star.mesh.position.y < -1000) {
                this.resetStar(star);
            }
        });

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        new StarField();
    } catch (error) {
        console.error('Failed to initialize StarField:', error);
    }
}); 