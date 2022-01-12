
let scene, camera, renderer, starGeo, stars;

function init() {
    //create scene object
    scene = new THREE.Scene();

    //setup camera with facing upward
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    //setup renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    starGeo = new THREE.Geometry();
    for (let i = 0; i < 6000; i++) {
        let star = new THREE.Vector3(
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300
        );
        star.velocity = 0;
        star.acceleration = 0.02;
        starGeo.vertices.push(star);
    }
    let sprite = new THREE.TextureLoader().load('data:image/png;base64,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');
    let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        map: sprite
    });
    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);
    animate();
}
//rendering loop
function animate() {
    starGeo.vertices.forEach(p => {
        p.velocity += p.acceleration
        p.y -= p.velocity;

        if (p.y < -200) {
            p.y = 200;
            p.velocity = 0;
        }
    });
    starGeo.verticesNeedUpdate = true;

    stars.rotation.y += 0.002;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
init();

