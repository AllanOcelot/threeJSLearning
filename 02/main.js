import * as THREE from 'three';

console.log("Let's learn three js...");

const loader = new THREE.TextureLoader();


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  45,
  30000
);
camera.position.set(1200, -250, 20000);

let cube;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



function createCube(){
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
}

const materials = [
  new THREE.TextureLoader().load("/images/skybox1/1.png"),
  new THREE.TextureLoader().load("/images/skybox1/2.png"),
  new THREE.TextureLoader().load("/images/skybox1/3.png"),
  new THREE.TextureLoader().load("/images/skybox1/4.png"),
  new THREE.TextureLoader().load("/images/skybox1/5.png"),
  new THREE.TextureLoader().load("/images/skybox1/6.png"),
]

const textureCube = loader.load( [
	'/images/skybox1/1.png', '/images/skybox1/2.png',
	'/images/skybox1/3.png', '/images/skybox1/4.png',
	'/images/skybox1/5.png', '/images/skybox1/6.png'
] );


function createSkyBox(){
  const skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube });
  const skybox = new THREE.Mesh(skyboxGeo, material);

  scene.add(skybox);
}

createSkyBox();


createCube()

// Animation 
function animate() {	
  requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}
animate();