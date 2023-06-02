import * as THREE from 'three';             
console.log('CHECK 1')

import {PvertexShader} from './shaders/vertex.js'
console.log('CHECK 2')
import {PfragmentShader} from './shaders/fragment.js'

import {BPvertexShader} from './shaders/BPvertex.js'
console.log('CHECK 2')
import {BPfragmentShader} from './shaders/BPfragment.js'

console.log('CHECK 3')
import {GvertexShader} from './shaders/gouraudVert.js'
console.log('CHECK 4')
import {GfragmentShader} from './shaders/gouraudFrag.js'
console.log('CHECK 5')
import * as dat from 'https://cdn.skypack.dev/dat.gui';

const ShaderSettings  = {
	Ambient : 0.45,
	Diffuse: 0.5,
    Specular : 0.5,
    Shininess : 12.0,
    lx : 10,
    ly : 10,
    lz : 32,
}

const gui = new dat.GUI();

var setVert = GvertexShader;
var setFrag = GfragmentShader;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var held = false;
const renderer = new THREE.WebGLRenderer(
    {
        antialias: true
    }
);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var U = {
    checkerTexture : {
        value : new THREE.TextureLoader().load('./textures/checker.png')
    },
    lightdir : {
        value : new THREE.Vector3(ShaderSettings.lx,ShaderSettings.ly,ShaderSettings.lz)
    },
    lightdir2 : {
        value : new THREE.Vector3(-16.82,-7.81,-5.73)
    },
    Coefs :{
        value : new THREE.Vector4(ShaderSettings.Ambient,
            ShaderSettings.Diffuse,ShaderSettings.Specular,ShaderSettings.Shininess)
    }
}
//creating sphere
var sphere = new THREE.Mesh( 
    new THREE.SphereGeometry(5, 50, 50), 
    new THREE.ShaderMaterial({
        vertexShader  : setVert,
        fragmentShader : setFrag,
        uniforms : U
}) );
scene.add( sphere );
camera.position.z = 10;



const mouse = {
    x : undefined,
    y : undefined,
    downx : undefined,
    downy : undefined,
}
addEventListener('keydown', (event)=>
{   
    if(event.key == 's' || event.key =='S')
    {
        if(setFrag == GfragmentShader && setVert == GvertexShader)
        {
            setVert = PvertexShader;
            setFrag = PfragmentShader;
        }
        else{
            setVert = GvertexShader;
            setFrag = GfragmentShader;
        }
        ReRenderSphere()
    }
    if(event.key == 'b' || event.key =='B')
    {
        if(setFrag == GfragmentShader && setVert == GvertexShader)
        {
            setVert = BPvertexShader;
            setFrag = BPfragmentShader;
        }
        else if(setFrag == PfragmentShader && setVert == PvertexShader){
            setVert = BPvertexShader;
            setFrag = BPfragmentShader;
        }
        else{
            setVert = GvertexShader;
            setFrag = GfragmentShader;
        }
        ReRenderSphere()
    }
})
addEventListener('mousedown', (event) => {
    if(event.button == 0)
    {
        held = true;
        mouse.downx =(event.clientX/innerWidth) * 2 - 1;
        mouse.downy = (event.clientY/innerHeight) * 2 + 1
    }
})
addEventListener('mouseup', ()=>{
    held = false;
})
addEventListener('mousemove' ,(event) => {
    if(held)
    {
        mouse.x = (event.clientX/innerWidth) * 2 - 1;
        mouse.y = (event.clientY/innerHeight) * 2 + 1;
    }
})

gui.add(ShaderSettings, 'Ambient', 0, 1).step(0.01).onChange(function ()
{
    U.Coefs.value = new THREE.Vector4(ShaderSettings.Ambient,
        ShaderSettings.Diffuse,ShaderSettings.Specular,ShaderSettings.Shininess)
});
gui.add(ShaderSettings, 'Diffuse', 0, 1).step(0.01).onChange(function ()
{
    U.Coefs.value = new THREE.Vector4(ShaderSettings.Ambient,
        ShaderSettings.Diffuse,ShaderSettings.Specular,ShaderSettings.Shininess)
});
gui.add(ShaderSettings, 'Specular', 0, 1).step(0.01).onChange(function ()
{
    U.Coefs.value = new THREE.Vector4(ShaderSettings.Ambient,
        ShaderSettings.Diffuse,ShaderSettings.Specular,ShaderSettings.Shininess)
});
gui.add(ShaderSettings, 'Shininess', 0, 32).step(0.01).onChange(function ()
{
    U.Coefs.value = new THREE.Vector4(ShaderSettings.Ambient,
        ShaderSettings.Diffuse,ShaderSettings.Specular,ShaderSettings.Shininess)
});
gui.add(ShaderSettings, 'lx', -32, 32).step(0.01).onChange(function ()
{
    U.lightdir.value = new THREE.Vector3(ShaderSettings.lx,ShaderSettings.ly,ShaderSettings.lz)
});
gui.add(ShaderSettings, 'ly', -32, 32).step(0.01).onChange(function ()
{
    U.lightdir.value = new THREE.Vector3(ShaderSettings.lx,ShaderSettings.ly,ShaderSettings.lz)
});
gui.add(ShaderSettings, 'lz', -32, 32).step(0.01).onChange(function ()
{
    U.lightdir.value = new THREE.Vector3(ShaderSettings.lx,ShaderSettings.ly,ShaderSettings.lz)
});
function ReRenderSphere()
{
    var rotx = sphere.rotation.x;
    var roty = sphere.rotation.y;
    var rotz = sphere.rotation.z;
    scene.remove(sphere);
        sphere = new THREE.Mesh( 
            new THREE.SphereGeometry(5, 50, 50), 
            new THREE.ShaderMaterial({
                vertexShader  : setVert,
                fragmentShader : setFrag,
                uniforms :U
        }) );
        scene.add(sphere);
        sphere.rotation.x = rotx;
        sphere.rotation.y = roty;
        sphere.rotation.z = rotz;
}
function animate() {
    requestAnimationFrame( animate );
    if(mouse.x != undefined && held)
    {
        sphere.rotation.y += (mouse.x - mouse.downx)*0.05 ;
        sphere.rotation.x += (mouse.y - mouse.downy)*0.05 ;

    }
	renderer.render( scene, camera );
}
animate();