let scene, camera, renderer, globe;

function initGlobe() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Set aspect ratio to 1 for now
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    updateRendererSize();
    document.getElementById('globe-container').appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(5, 64, 64); // Increased segments for smoother appearance
    const texture = new THREE.TextureLoader().load('https://cdn.pixabay.com/photo/2011/12/13/17/07/earth-11048_1280.jpg');
    const material = new THREE.MeshPhongMaterial({
        map: texture,
        bumpMap: new THREE.TextureLoader().load('https://plus.unsplash.com/premium_photo-1681488098851-e3913f3b1908?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFwfGVufDB8fDB8fHww'),
        bumpMap: new THREE.TextureLoader().load(''),
        bumpScale: 0.05,
    });

    globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    updateGlobeSize();
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.005;
    renderer.render(scene, camera);
}

function updateRendererSize() {
    const container = document.getElementById('globe-container');
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

function updateGlobeSize() {
    const container = document.getElementById('globe-container');
    const minDimension = Math.min(container.clientWidth, container.clientHeight);
    const scale = minDimension / 800; // Adjusted base size
    globe.scale.set(scale, scale, scale);
    camera.position.z = 10 / scale;
}

function onWindowResize() {
    updateRendererSize();
    updateGlobeSize();
}

window.addEventListener('resize', onWindowResize);

initGlobe();
