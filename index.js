import * as THREE from './three.js-dev/build/three.module.js'
import {GLTFLoader} from './three.js-dev/examples/jsm/loaders/GLTFLoader.js'
import {GUI} from './three.js-dev/dat.gui.module.js'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
//const gui = new GUI()  //enable this to use dat gui

const loader = new GLTFLoader()
loader.load('gltf/gltf/wraith.gltf', function(gltf){
    console.log(gltf)
    const root = gltf.scene;
    root.scale.set(0.1,0.1,0.1)
    scene.add(root)
},function(xhr){
    console.log((xhr.loaded/xhr.total*100)+"% loaded")
}, function(error){
    console.log('An Error Occured')
})


scene.add( new THREE.AxesHelper(500))

const light = new THREE.DirectionalLight(0xffffff,2)
light.position.set(2,2,5)
scene.add(light)

const light1 = new THREE.DirectionalLight(0xffffff,0.5)
light1.position.set(-2,-2,5)
scene.add(light1)

// const geometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({
//     color: 'red'
// })
// const boxMesh = new THREE.Mesh(geometry,material)
// scene.add(boxMesh)

//Boiler Plate Code
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height,0.1,100)
camera.position.set(0,3.5,6)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
}) 

renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()