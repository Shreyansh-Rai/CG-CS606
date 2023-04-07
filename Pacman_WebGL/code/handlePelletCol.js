import { Circle } from "./lib/circle.js";
import { Food } from "./lib/food.js";
import { Superfood } from "./lib/Superfood.js";
import { createGhost } from "./createGhost.js";
export function handlePelletCol(i,j,scene,pellets,chunksize){
    let r = pellets[j][i].radius;
    let type = pellets[j][i].type;
    scene.remove(pellets[j][i]);
    var x = i*chunksize + chunksize/2;
    var y = j*chunksize + chunksize/2;
    if(type == "food")
    {
        const chunk = new Food(
            [x,y],
            r ,
            [255 / 255, 255 / 255, 0/ 255, 1],
            "eaten"
        )
        pellets[j][i] = chunk;
        scene.add(pellets[j][i])
    }
    else if(type == "superfood"){
        const chunk = new Superfood(
            [x,y],
            r ,
            [255 / 255, 255 / 255, 0/ 255, 1],
            "eaten"
        )
        pellets[j][i] = chunk;
        console.log("SUPER")
        scene.add(pellets[j][i])
    }
    else{ //for every eaten pellets
        const chunk = new Superfood(
            [x,y],
            r ,
            [255 / 255, 255 / 255, 0/ 255, 1],
            "eaten"
        )
        pellets[j][i] = chunk;
        scene.add(pellets[j][i])
    }
}

export function refreshPellet(scene,pellets,chunksize){
    for(var  j = 0; j<pellets.length; j++)
    {
        for(var i = 0; i<pellets[0].length; i++)
        {
            let r = pellets[j][i].radius;
            let type = pellets[j][i].type;
            var x = i*chunksize + chunksize/2;
            var y = j*chunksize + chunksize/2;
            
            if(type == "eaten") { //for every eaten pellets
                scene.remove(pellets[j][i]);
                const chunk = new Superfood(
                    [x,y],
                    r ,
                    [255 / 255, 255 / 255, 0/ 255, 1],
                    "eaten"
                )
                pellets[j][i] = chunk;
                scene.add(pellets[j][i])
            }
        }
    }
}
export function SuperChange(i,j,ghosts,scene,chunksize,bool,pacman)
{
    if(bool)
    {
        console.log("Change")
        scene.remove(ghosts[0])
        scene.remove(ghosts[1])
        scene.remove(ghosts[2])
        const ghost1 = createGhost(11,10,[0,1,1,1],chunksize)
        const ghost2= createGhost(12,10,[0,1,1,1],chunksize)
        const ghost3 = createGhost(11,9,[0,1,1,1],chunksize)
        scene.add(ghost1)
        scene.add(ghost2)
        scene.add(ghost3)
        pacman.transform.translateRotateScaleTransform(pacman.center[0], pacman.center[1], pacman.posX, pacman.posY,pacman.angle, 1.5)
        return [ghost1,ghost2,ghost3]
    }
    else{
        console.log("Change back")
        scene.remove(ghosts[0])
        scene.remove(ghosts[1])
        scene.remove(ghosts[2])
        const ghost1 = createGhost(11,10,[0,1,0,1],chunksize)
        const ghost2= createGhost(12,10,[0,1,0,1],chunksize)
        const ghost3 = createGhost(11,9,[0,1,0,1],chunksize)
        scene.add(ghost1)
        scene.add(ghost2)
        scene.add(ghost3)

        return [ghost1,ghost2,ghost3]
    }
    return ghosts
}