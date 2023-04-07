import { Circle } from "./lib/circle.js";
import { Food } from "./lib/food.js";
import { Superfood } from "./lib/Superfood.js";
import { createGhost } from "./createGhost.js";
import { createPacman } from "./createPacman.js";
export function handleMapRotate(pellets, grid, pacman,dir,chunksize,mazeor){
    var i = pacman.getInd(chunksize)[0]
    var j = pacman.getInd(chunksize)[1]
    if(dir == 'r')
    {
        var temp = j
        j = i
        i = temp
        pellets = pellets[0].map((val, index) => pellets.map(row => row[index]).reverse())
        grid = grid[0].map((val, index) => grid.map(row => row[index]).reverse())
    }
    else{
        var temp = j
        j = i
        i = temp
        pellets = pellets[0].map((val, index) => pellets.map(row => row[row.length-1-index]));
        grid = grid[0].map((val, index) => grid.map(row => row[row.length-1-index]));
    }
    var pacman = createPacman(i,j,20,[1,1,0,1],chunksize,grid)
    return [pellets,grid,pacman]
}