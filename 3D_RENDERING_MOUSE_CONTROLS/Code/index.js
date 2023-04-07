import { Scene, WebGLRenderer, Shader } from './lib/threeD.js';
import {vertexShaderSrc} from './shaders/vertex.js';
import {fragmentShaderSrc} from './shaders/fragment.js';
import * as dat from 'https://cdn.skypack.dev/dat.gui';
import { platformcolor } from './global_vars/colors.js';
import { Platform } from './objects/platform.js';
import { MouseControls } from './MouseControls.js';
import { LoadedObject } from './objects/LoadedObject.js';
import webglObjLoader from 'https://cdn.skypack.dev/webgl-obj-loader';
import { TotalObj } from './objects/total_obj.js';
import { vec3,vec4, mat4 } from 'https://cdn.skypack.dev/gl-matrix';
import arrow from './assets/arrow.js';
//loading assets
import { Game } from './game.js';
import car1 from './assets/car1.js';
import randomobject1 from './assets/randomobject1.js';
import { animation_interval } from './global_vars/sizes.js';
import gyro from './assets/gyro.js';
function get_index(color)
{	

	for(let i=0;i<game.obj_lst.length;i++)
	{
		const obj_color_id = game.obj_lst[i].color[0] + (game.obj_lst[i].color[1] << 8) + (game.obj_lst[i].color[2] << 16) + (game.obj_lst[i].color[3] << 24);
		const pixel_color_id = color[0] + (color[1] << 8) + (color[2] << 16) + (color[3] << 24);
		if(obj_color_id == pixel_color_id)
		{
			return i
		}

	}
}


// var tot_obj = new TotalObj()
const platform = new Platform(5, platformcolor)

var colors_lst =[]


var mesh = new OBJ.Mesh(car1);
const obj_1 = new LoadedObject(mesh,[1,0.2,0.5,1]);
colors_lst.push([1,0,0,1])

mesh = new OBJ.Mesh(gyro);
const obj_2 = new LoadedObject(mesh,[1,1,0.5,1]);
colors_lst.push([1,1,0,1])

mesh = new OBJ.Mesh(randomobject1);
const obj_3 = new LoadedObject(mesh,[0,1,0.8,1]);
colors_lst.push([0,1,1,1])

mesh = new OBJ.Mesh(arrow)
const pointer = new LoadedObject(mesh,[0,1,1,1]);
// colors_lst.push([0,1,1,1]);
var game = new Game(colors_lst,platform.vertexCoords)


//initiating scene
const scene = new Scene();
scene.add(obj_1)
scene.add(obj_2)
scene.add(obj_3)
scene.add(platform)
game.add_obj(obj_1)
game.add_obj(obj_2)
game.add_obj(obj_3)

// scene.add(pointer)
game.initialize_obj_pos()

const renderer = new WebGLRenderer();
renderer.setSize( 850, 850 );
document.body.appendChild( renderer.domElement );
let Mouse = new MouseControls(renderer.gl)

const shader = new Shader(renderer.glContext(), vertexShaderSrc, fragmentShaderSrc);
shader.use();

var ViewToggle = false;

var modify_mode = false
document.addEventListener("keydown", event => {

	if(event.key=='m')
	{
		if(modify_mode)
			modify_mode =false
		else
			modify_mode =true
		console.log('Are we in modify mode: ',modify_mode)
	}
	if(event.key == 'Enter')
	{
		console.log('movement begins')
		let scaling = 0;
		var curr_vertex = game.vertex_lst[game.obj_lst[game.curr_obj_index].curr_vertex_index]
		game.A.x = curr_vertex[0]
		game.A.y = curr_vertex[1]
		game.A.z = curr_vertex[2]
		const intervalId = setInterval(function() {
			// game.rotate_obj()
			game.move(scaling)
			scaling++;
			if (scaling > game.scalingfactor) {
				console.log("movement ends")
				scene.remove(pointer)
				clearInterval(intervalId);
				
			}
		}, animation_interval);
		
	}
	if(event.key == 'c')
	{
		console.log("topView")
		var Alt = mat4.create()
		mat4.lookAt(Alt, [0,60,1e-6], [0, 0, 0], [0, 1, 0])
		scene.viewMatrix = Alt;
		ViewToggle = !ViewToggle
	}


})
document.addEventListener("click", event => {
    
	if(modify_mode)
	{
		game.get_pixel_color(event.clientX,event.clientY,renderer)
		
		const curr_obj_index = get_index(game.curr_color)
		game.set_curr_obj(curr_obj_index)
		console.log('curr index in total array: ',curr_obj_index)
		
		game.get_random_index(game.obj_lst[curr_obj_index].curr_vertex_index)

		console.log('random index in total array: ',game.random_index)

		game.obj_lst[curr_obj_index].change_color([0,0,0,1])
		scene.add(pointer)
		game.rotate_obj(pointer)
		modify_mode= false
	}
})


renderer.setAnimationLoop( animation );

//Draw loop
function animation()
{

	renderer.clear(1,0.9,0.9,1);
	renderer.render(scene, shader);	
	if(ViewToggle == false)
	scene.viewMatrix = Mouse.alterView()
}
