import {Transform} from './transform.js';

export class Ghost
{
	constructor(center,chunksize,color) 
	{
        console.log(center, " ", chunksize)
		this.vertexPositions = new Float32Array([
			//  x , y,  z
			center[0], center[1] - chunksize/2, 0.0,
			center[0]+chunksize/2, center[1] + chunksize/2, 0.0,
			center[0]-chunksize/2, center[1]+chunksize/2, 0.0,
		]);

		this.type = "ghost";
		this.color = color;
		this.transform = new Transform();
	}
}