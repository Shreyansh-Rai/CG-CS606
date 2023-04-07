import { Scene, Triangle, Quadrilateral, WebGLRenderer, Shader, Circle } from './lib/threeD.js';
import {vertexShaderSrc} from './shaders/vertex.js';
import {fragmentShaderSrc} from './shaders/fragment.js';
// import { grid } from './grid.js';
// import { Pacman } from './lib/Pacman.js';
import { Pacman } from './lib/pacman.js';
export function createPacman(i,j,r,color,chunksize,gridcur){
    var x = i*chunksize + chunksize/2;
    var y = j*chunksize + chunksize/2;
    const chunk = new Pacman(
        [x,y],
        r,
        color,
        gridcur
    )
    return chunk;
}