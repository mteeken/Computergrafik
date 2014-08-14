/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Global Variables
var world,
        canvas,
        renderer,
        camera,
        controls,
        game;

//first function to be called
function onLoad() {
    game = new Game();
    init();
}

function init() {

    if (world == null) {
        //setup Render
        container = document.getElementById('window');
        document.body.appendChild(container);
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setSize(800, 600);
        container.appendChild(renderer.domElement);

        //Setup the main scene to be rendered
        world = new THREE.Scene();

        document.addEventListener('keydown', function(key) {
            game.onKeyDown(key);
        }, false);
    }

    //Camera
    camera = new THREE.PerspectiveCamera(300, 700 / 500, 0.1, 1000);
    camera.position.z = 10.1;
    camera.position.y = 0.1;
    camera.position.x = 0.1;

    //Light
    light = new THREE.SpotLight(0xffffff, 4, 30);
    light.position = camera.position;
    light2 = new THREE.PointLight(0xfff000, 1.5, 30);
    light2.position.set(10, 10, 10);
    world.add(light);
    world.add(light2);
    

    world.add(camera);

    //Controls
    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = true;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [65, 83, 68];
}