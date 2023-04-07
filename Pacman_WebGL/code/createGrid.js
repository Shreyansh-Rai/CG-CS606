import { Scene, Triangle, Quadrilateral, WebGLRenderer, Shader, Circle } from './lib/threeD.js';
import {vertexShaderSrc} from './shaders/vertex.js';
import {fragmentShaderSrc} from './shaders/fragment.js';
import { grid } from './grid.js';
function makeArray(a,b) {
    var arr = new Array(a)
    for(var i = 0;i<a;i++)
        arr[i] = new Array(b)
    return arr
}
export const getCordFromTile= function (i, j,chunksize){
    return [
        { x: i*chunksize,    y: j*chunksize},     // top-left
        { x: i*chunksize,   y: j*chunksize+chunksize},     // top-right
        { x: i*chunksize+chunksize,   y: j*chunksize+chunksize}, // bottom-right
        { x: i*chunksize+chunksize,    y: j*chunksize}  // bottom-left
    ]
}
export function createGrid(scene,chunksize,grid)
{
    // const chunksize = 70;
    for(let i = 0; i<grid[0].length; i++)
    {
        for(let j = 0; j<grid.length;j++)
        {
            // console.log(grid[i][j])
            if(grid[j][i] === 0)
            {
                const chunk = new Quadrilateral(
                    [i*chunksize,j*chunksize],
                    [i*chunksize,j*chunksize+chunksize],
                    [i*chunksize+chunksize,j*chunksize+chunksize],
                    [i*chunksize+chunksize,j*chunksize],
                    [200 / 255, 0 / 255, 0/ 255, 1]
                )
                scene.add(chunk);
            }
            else{
                const chunk = new Quadrilateral(
                    [i*chunksize,j*chunksize],
                    [i*chunksize,j*chunksize+chunksize],
                    [i*chunksize+chunksize,j*chunksize+chunksize],
                    [i*chunksize+chunksize,j*chunksize],
                    [0 / 255, 0/ 255, 100 / 255, 1]
                )
                scene.add(chunk);
            }
        }
    }
}