import { Scene, Triangle, Quadrilateral, WebGLRenderer, Shader, Circle } from './lib/threeD.js';
import {vertexShaderSrc} from './shaders/vertex.js';
import {fragmentShaderSrc} from './shaders/fragment.js';
// import { grid } from './grid.js';
import { Food } from './lib/food.js';
import { Superfood } from './lib/Superfood.js';
export function createPellets(chunksize,grid)
{
   
    var Pellets = makeArray(grid.length,grid[0].length)
    // const chunksize = 70
    for(let i = 0; i<grid[0].length; i++)
    {
        for(let j = 0; j<grid.length;j++)
        {
            if(grid[j][i] === 1)
            {
                var x = i*chunksize + chunksize/2;
                var y = j*chunksize + chunksize/2;
                var r = 5;
                const chunk = new Food(
                    [x,y],
                    r,
                    [255 / 255, 255 / 255, 255/ 255, 1],
                    "food"
                )
                Pellets[j][i] = chunk;
            }
            else if(grid[j][i] === 2)
            {
                var x = i*chunksize + chunksize/2;
                var y = j*chunksize + chunksize/2;
                var r = 10;
                const chunk = new Superfood(
                    [x,y],
                    r,
                    [255 / 255, 255 / 255, 255/ 255, 1],
                    "superfood"
                )
                Pellets[j][i] = chunk;
            }
            else{
                var x = i*chunksize + chunksize/2;
                var y = j*chunksize + chunksize/2;
                var r = 10;
                const chunk = new Food(
                    [x,y],
                    0 ,
                    [255 / 255, 255 / 255, 255/ 255, 1]
                    ,"food"
                )
                Pellets[j][i] = chunk;
            }
        }
    }
    return Pellets;
}
function makeArray(a,b) {
    var arr = new Array(a)
    for(var i = 0;i<a;i++)
        arr[i] = new Array(b)
    return arr
}