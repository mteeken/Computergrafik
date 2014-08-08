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
    controls;

//first function to be called
function onLoad() {
    init();
    loadObjects();
}

function init() {    
    timer = new Timer();

    //setup Render
    container = document.getElementById( 'window' );
    document.body.appendChild( container );
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(800, 600);
    container.appendChild( renderer.domElement );

    //Setup the main scene to be rendered
    world = new THREE.Scene();
    light = new THREE.PointLight(0xff0000, 1, 100);
    light.position.set(30, 30, 30);
    light2 = new THREE.AmbientLight(0xffffff); // soft white light
    light3 = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    world.add(light3);
    world.add(camera);
    
    //Camera
    camera = new THREE.PerspectiveCamera(300, 700/500, 0.1, 1000);
    camera.position.z = 10.1;
    camera.position.y = 0.1;
    camera.position.x = 0.1;

    //Controls
/*    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = true;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [65, 83, 68]; 
*/
    //Event listenters
//    controls.addEventListener('change', draw);
    document.addEventListener('keydown', onKeyDown, false);
}


function loadObjects() {
    //Loading of the Game-Board
    var raster = new THREE.ColladaLoader();
    raster.options.convertUpAxis = true;
    raster.load('models/VierGewinnt.dae', gameLoaded);
}

function gameLoaded(collada) {
    console.log('gameLoaded');
    game = collada.scene;
    game.position.y = game.position.y - 0.01;
    //Hide Collider-Walls
    //game.children[0].children[0].visible = false;
    world.add(game);
    
    chipMng = new ChipManager();
    chipMng.createYellowChip();
}
