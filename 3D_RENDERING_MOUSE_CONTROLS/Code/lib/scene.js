import { vec3, mat4 } from 'https://cdn.skypack.dev/gl-matrix';

export class Scene
{
	constructor()
	{
		this.primitives = []
		this.viewMatrix = new Float32Array(16) //4x4 matrices.
		this.projMatrix = new Float32Array(16)
		this.cameraPosition = [0, 50, 30];
		mat4.lookAt(this.viewMatrix, [0, 20, 100], [0, 0, 0], [0, 1, 0]) //positioned at z axis init. and looking at origin.head towards y.
		mat4.perspective(this.projMatrix, Math.PI/4, 600/600, 0.1, 1000.0)
	}

	add()
	{
		for(let primitive of arguments){
			if( this.primitives && primitive )
			{
				this.primitives.push(primitive)
				// console.log(this.primitives)
			}
		}
	}

    remove(primitive) 
	{
		if (this.primitives && primitive) {
			let index = this.primitives.indexOf(primitive);
			if (index > -1) {
				this.primitives.splice(index, 1);
			}
		}
	}

	getPrimitives() 
	{
		return this.primitives;
	}


	getPrimitive(index) 
	{
		return this.primitives[index];
	}


	getPrimitiveIndex(primitive) 
	{
		return this.primitives.indexOf(primitive);
	}

	centroid()
	{
		// @ToDo : Return the centroid as per the requirements of mode-2
	}
}