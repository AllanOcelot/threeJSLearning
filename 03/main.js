import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

console.log('Aim - make some stars?')




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );



// Axis helper helps me work in 3d space.
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Controls for orbit cam
const controls = new OrbitControls( camera, renderer.domElement );


const stars = [];
stars.length = 30;



camera.position.z = 5;

genereateStarData();

function genereateStarData(){
  for(let i = 0; i < stars.length; i++){
    let localStarData = {
      axisX: Math.ceil(Math.random() * 50) * (Math.round(Math.random()) ? 1 : -1),
      axisY: Math.ceil(Math.random() * 50) * (Math.round(Math.random()) ? 1 : -1),
      axisZ: Math.ceil(Math.random() * 50) * (Math.round(Math.random()) ? 1 : -1)
    }
    stars[i] = localStarData
    console.log(stars)
  }
  generateStars()
}




function generateStars(){
  const starObjects = [];
  const lightObjects = [];


  for(let i = 0; i < stars.length; i++){
    const geometry = new THREE.SphereGeometry( 0.1, 10, 10 );
    const material = new THREE.MeshBasicMaterial( { color: '#ffffff' , opacity: '0.9'} );
    starObjects[i] = new THREE.Mesh( geometry, material );
    starObjects[i].position.x =stars[i].axisX
    starObjects[i].position.y =stars[i].axisY
    starObjects[i].position.z =stars[i].axisZ

    lightObjects[i] = new THREE.PointLight( 0xff0000, 1, 100 );
    lightObjects[i].position.set( stars[i].axisX, stars[i].axisY, stars[i].axisZ );
    scene.add( lightObjects[i] );

    //starObjects[i].set(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10))
    scene.add( starObjects[i] );
  }
}

function autoZoom(){  
  if(cameraZoomMode === 'out'){
    if(camera.position.z <= 50){
      camera.position.z += 0.05;
    }else{
      cameraZoomMode = 'in'
    }
  }else{
    if(camera.position.z >= 5){
      camera.position.z -= 0.05;
    }else
    {
      cameraZoomMode = 'out'
    }
  }
}


let cameraZoomMode = 'out'
// Animation 
function animate() {	
  requestAnimationFrame( animate );

  camera.lookAt(0,0,0)
  controls.update();
	renderer.render( scene, camera );
}
animate();