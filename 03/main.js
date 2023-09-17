import * as THREE from 'three';

console.log('Aim - make some stars?')




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );
let cube;

// Axis helper helps me work in 3d space.
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

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


  for(let i = 0; i < stars.length; i++){
    const geometry = new THREE.SphereGeometry( 0.1, 10, 10 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    starObjects[i] = new THREE.Mesh( geometry, material );
    starObjects[i].position.x =stars[i].axisX
    starObjects[i].position.y =stars[i].axisY
    starObjects[i].position.z =stars[i].axisZ
    console.log(starObjects[i].position)
    //starObjects[i].set(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10))
    scene.add( starObjects[i] );
  }
}


let cameraZoomMode = 'out'
// Animation 
function animate() {	
  requestAnimationFrame( animate );

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


	renderer.render( scene, camera );
}
animate();