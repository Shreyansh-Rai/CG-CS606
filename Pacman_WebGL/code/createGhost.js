import { Scene, Triangle, Quadrilateral, WebGLRenderer, Shader, Circle } from './lib/threeD.js';
import {vertexShaderSrc} from './shaders/vertex.js';
import {fragmentShaderSrc} from './shaders/fragment.js';
import { grid } from './grid.js';
import { Ghost } from './lib/ghost.js';
export function createGhost(i,j,color,chunksize){
    var x = i*chunksize + chunksize/2;
    var y = j*chunksize + chunksize/2;
    const chunk = new Ghost(
        [x,y],
        chunksize,
        color
    )
    return chunk;
}