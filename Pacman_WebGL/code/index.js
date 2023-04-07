import { Scene, Triangle, Quadrilateral, WebGLRenderer, Shader, Circle, Transform } from './lib/threeD.js';
import {vertexShaderSrc} from './shaders/vertex.js';
import {fragmentShaderSrc} from './shaders/fragment.js';
import { grid,  grid2, grid3 } from './grid.js';
import { createGrid } from './createGrid.js';
import { createPellets } from './createPellets.js';
import { Pacman } from './lib/pacman.js';
import { createPacman } from './createPacman.js';
import { createGhost } from './createGhost.js';
import { handlePelletCol, refreshPellet, SuperChange } from './handlePelletCol.js';
import { handleMapRotate } from './handleMapRotate.js';
const renderer = new WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);

var mazeang = 0
var mazeor = 0
var canvw = renderer.getDim()[0];
var canvh = renderer.getDim()[1];
document.body.appendChild(renderer.domElement);
let grids = [grid,grid2,grid3]
var curgrid = 0;
const shader = new Shader(
	renderer.glContext(),
	vertexShaderSrc,
	fragmentShaderSrc
);

shader.use();

const chunksize = 50


function renderPellets(Pellets,scene)
{
    for(let i = 0; i<Pellets[0].length; i++)
    {
        for(let j = 0; j<Pellets.length; j++)
        {
            scene.add(Pellets[j][i]);
        }
    }
}

const triangle2 = new Triangle(
    [-100, -150],
    [210, 210],
    [10, 410],
    [255 / 255, 153 / 255, 0 / 255, 1]
);
function reinit()
{
    pellets = createPellets(chunksize,grids[curgrid]);
    pacman = createPacman(5,6,20,[1,1,0,1],chunksize,grids[curgrid]);
    ghost1 = createGhost(11,10,[0,1,0,1],chunksize);
    ghost2 = createGhost(12,10,[0,1,0,1],chunksize);
    ghost3 = createGhost(11,9,[0,1,0,1],chunksize);
    createGrid(scene,chunksize,grids[curgrid]);
    renderPellets(pellets,scene);
    scene.add(pacman)
    scene.add(ghost1)
    scene.add(ghost2)
    scene.add(ghost3)
    mazeang = 0
    mazeor = 0
    let toggle = false;
}
var pellets = createPellets(chunksize,grids[curgrid]);
console.log(grids[curgrid])
var pacman = createPacman(5,6,20,[1,1,0,1],chunksize,grids[curgrid]) //Row major

const scene = new Scene();
var ghost1 = createGhost(11,10,[0,1,0,1],chunksize)
var ghost2= createGhost(12,10,[0,1,0,1],chunksize)
var ghost3 = createGhost(11,9,[0,1,0,1],chunksize)
createGrid(scene,chunksize,grids[curgrid]);
renderPellets(pellets,scene);
scene.add(pacman)
scene.add(ghost1)
scene.add(ghost2)
scene.add(ghost3)
// scene.add(triangle2)
// scene.add(pman)

// pman.transform.setRotate(Math.PI)
var mousetog = false;
let toggle = false;
document.addEventListener("keydown", event => {
    toggle = false;
    if(event.key == "m"){
		if(mousetog)
			mousetog = false;
		else
			mousetog = true;
	}
    if(event.key == 'ArrowRight'){
        pacman.move("r",pellets,chunksize,canvh,canvw);
    }
    if(event.key == 'ArrowLeft'){
        pacman.move("l",pellets,chunksize,canvh,canvw);
    }
    if(event.key == 'ArrowDown'){
        pacman.move("d",pellets,chunksize,canvh,canvw);
    }
    if(event.key == 'ArrowUp'){
        pacman.move("u",pellets,chunksize,canvh,canvw);
    }
    if(event.key == 'c')
    {
        curgrid = (curgrid+1)%3;
        scene.primitives = [];
        reinit();
    }
    let pxind = pacman.getInd(chunksize)[0]
    let pyind = pacman.getInd(chunksize)[1]
    if(pxind >= 0 && pyind>=0)
    if(pellets[pyind][pxind].type == "superfood")
    {
        toggle = true;
    }
    if(event.key!='c')
    {
        var ghosts = SuperChange(pxind,pyind,[ghost1,ghost2,ghost3],scene,chunksize,toggle,pacman)
        ghost1 = ghosts[0]
        ghost2 = ghosts[1]
        ghost3 = ghosts[2]
        handlePelletCol(pxind,pyind,scene,pellets,chunksize)
        if(mazeor == 1)
        {
            scene.primitives.forEach(function (primitive) {
                if(primitive.type == "ghost")
                primitive.transform.rotateTranslate(mazeang,chunksize*grids[curgrid].length,0)
            })
        }
        else if(mazeor ==2)
        {
            scene.primitives.forEach(function (primitive) {
                if(primitive.type == "ghost")
                primitive.transform.rotateTranslate(mazeang,chunksize*grids[curgrid][0].length,chunksize*grids[curgrid].length)
            })
        }
        else if(mazeor ==3)
        {
            scene.primitives.forEach(function (primitive) {
                if(primitive.type == "ghost")
                primitive.transform.rotateTranslate(mazeang,0,chunksize*grids[curgrid][0].length)
            })
        }
        else{
            scene.primitives.forEach(function (primitive) {
                if(primitive.type == "ghost")
                primitive.transform.rotateTranslate(mazeang,0,0)
            })
        }
        
    }
    if(event.key == ")" || event.key == "("){
		pacman.rotatePacman(event.key);
	}
    if(event.code == "BracketRight"){
		mazeang += Math.PI/2;
        mazeor+=1
        mazeor = mazeor%4
        
		if(mazeor == 1)
        {
            scene.primitives.forEach(function (primitive) {
                primitive.transform.rotateTranslate(mazeang,chunksize*grids[curgrid].length,0)
            })
        }
        else if(mazeor ==2)
        {
            scene.primitives.forEach(function (primitive) {
                primitive.transform.rotateTranslate(mazeang,chunksize*grids[curgrid][0].length,chunksize*grids[curgrid].length)
            })
        }
        else if(mazeor ==3)
        {
            scene.primitives.forEach(function (primitive) {
                primitive.transform.rotateTranslate(mazeang,0,chunksize*grids[curgrid][0].length)
            })
        }
        else{
            scene.primitives.forEach(function (primitive) {
                primitive.transform.rotateTranslate(mazeang,0,0)
            })
        }
        let objs = handleMapRotate(pellets,pacman.grid,pacman,'r',chunksize,mazeor);
        scene.remove(pacman);       
        pacman = objs[2]
        scene.add(pacman)
        pellets = objs[0]
        refreshPellet(scene,pellets,chunksize)
	}
	if(event.code == "BracketLeft"){
		mazeang -= Math.PI/2;
        mazeor-=1
        if(mazeor < 0) mazeor = 3
		if(mazeor == 1)
        {
            scene.primitives.forEach(function (primitive) {
                primitive.transform.rotateTranslate(Math.PI/2,chunksize*grids[curgrid].length,0)
            })
        }
        else if(mazeor ==2)
        {
            scene.primitives.forEach(function (primitive) {
                primitive.transform.rotateTranslate(Math.PI,chunksize*grids[curgrid][0].length,chunksize*grids[curgrid].length)
            })
        }
        else if(mazeor ==3)
        {
            scene.primitives.forEach(function (primitive) {
                primitive.transform.rotateTranslate(3*Math.PI/2,0,chunksize*grids[curgrid][0].length)
            })
        }
        else{
            scene.primitives.forEach(function (primitive) { 
                primitive.transform.rotateTranslate(0,0,0)
                
            })
        }
        let objs = handleMapRotate(pellets,pacman.grid,pacman,'l',chunksize,mazeor);
        scene.remove(pacman);
        pacman = objs[2]
        scene.add(pacman)
        pellets = objs[0]
        refreshPellet(scene,pellets,chunksize)
	}
})

function handlemouse(event) {
    let x = event.clientX
    let y = event.clientY
    if(mousetog)
    {
        console.log(x,y)
        pacman.teleport(chunksize,x,y)
    }
}
  
document.addEventListener("click", handlemouse);




renderer.setAnimationLoop(animation);

//Draw loop
function animation() 
{

	renderer.clear(0.0, 0.0, 0.0, 1);
	renderer.render(scene, shader);
}
