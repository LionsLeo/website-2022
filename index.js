import * as THREE from './three.js-dev/build/three.module.js'
import {GLTFLoader} from './three.js-dev/examples/jsm/loaders/GLTFLoader.js'
import {GUI} from './three.js-dev/dat.gui.module.js'
import {OrbitControls} from './three.js-dev/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

let INTERSECTED
var mymess1,mymess2,mymess3

// const gui = new GUI()  //enable this to use dat gui
// const gltfFolder = gui.addFolder("Model")

//working model
// const loader = new GLTFLoader()
// loader.load('gltf/gltf/wraith.gltf', function(gltf){
//     console.log(gltf)
//     const root = gltf.scene
//     gltfFolder.add(root.position,"x",-50,50,0.1).name("X-position")
//     gltfFolder.add(root.position,"y",-50,50,0.1).name("Y-position")
//     gltfFolder.add(root.position,"z",-50,50,0.1).name("Z-position")
//     root.scale.set(0.1,0.1,0.1)
//     scene.add(root)
// },function(xhr){
//     console.log((xhr.loaded/xhr.total*100)+"% loaded")
// }, function(error){
//     console.log('An Error Occured')
// })

const loader = new GLTFLoader()
loader.load('land/land.glb', function(gltf){
    console.log(gltf)
    const root = gltf.scene
    root.rotation.y = 1.15
    root.scale.set(0.1,0.1,0.1)
    scene.add(root)
    //console.log(root.name)
},function(xhr){
    console.log((xhr.loaded/xhr.total*100)+"% loaded")
}, function(error){
    console.log('An Error Occured')
})


const loader1 = new GLTFLoader()
loader1.load('land/land_left.glb', function(gltf){
    console.log(gltf)
    const root = gltf.scene
    root.rotation.y = 1.15
    root.scale.set(0.1,0.1,0.1)
    scene.add(root)
    root.name = "left city"
    mymess1 = root.name
},function(xhr){
    console.log((xhr.loaded/xhr.total*100)+"% loaded")
}, function(error){
    console.log('An Error Occured')
})
loader1.castShadow=true

const loader2 = new GLTFLoader()
loader2.load('land/land_center.glb', function(gltf){
    console.log(gltf)
    const root = gltf.scene
    root.rotation.y = 1.15
    root.scale.set(0.1,0.1,0.1)
    scene.add(root)
    root.name = "center city"
    mymess2 = root.name
},function(xhr){
    console.log((xhr.loaded/xhr.total*100)+"% loaded")
}, function(error){
    console.log('An Error Occured')
})

const loader3 = new GLTFLoader()
loader3.load('land/land_right.glb', function(gltf){
    console.log(gltf)
    const root = gltf.scene
    root.rotation.y = 1.15
    root.scale.set(0.1,0.1,0.1)
    scene.add(root)
    root.name = "right city"
    mymess3 = root.name
},function(xhr){
    console.log((xhr.loaded/xhr.total*100)+"% loaded")
}, function(error){
    console.log('An Error Occured')
})

scene.add( new THREE.AxesHelper(500))

const light = new THREE.DirectionalLight(0xffffff,10)
light.position.set(2,2,5)
light.castShadow = true;
scene.add(light)

const light1 = new THREE.DirectionalLight(0xffffff,10)
light1.position.set(-2,-2,5)
light1.castShadow = true;
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
camera.position.set(0,0.5,0.1)
camera.rotation.x = -1.1
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = false
controls.enablePan = true
controls.enableRotate = false
controls.enableZoom = false
controls.mouseButtons = {
	LEFT: THREE.MOUSE.PAN,
	MIDDLE: THREE.MOUSE.DOLLY,
	RIGHT: THREE.MOUSE.ROTATE
}
controls.touches = {
	ONE: THREE.TOUCH.PAN,
	TWO: THREE.TOUCH.ROTATE
}

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