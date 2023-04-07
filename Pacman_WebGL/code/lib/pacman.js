import { Transform } from "./transform.js";
import { getCordFromTile } from "../createGrid.js";
// var sz = 3

export class Pacman
{ 
	constructor(vert1,a,color,grid) 
	{
        this.or = 0;
        this.grid = grid
        vert1 = [vert1[0],vert1[1],0]
        var vertices =[]
        for(var i=145.0; i<405.0;i++)
        {
            vertices = vertices.concat(vert1);
            var j = i * Math.PI/180;
            var vert = [
                a*Math.sin(j)+vert1[0],
                a*Math.cos(j)+vert1[1],
                0
            ]
            vertices = vertices.concat(vert);
            var j = (i+1) * Math.PI/180;
            var vert = [
                a*Math.sin(j)+vert1[0],
                a*Math.cos(j)+vert1[1],
                0
            ]
            vertices = vertices.concat(vert);
            
        }
        this.radius = a;
		this.vertexPositions = new Float32Array(vertices);
        this.posX = 0;
        this.posY = 0; //orginal center.
        this.center = [vert1[0],vert1[1]];
        this.type = "pacman";
		this.color = color;
        this.angle = 0;
		this.transform = new Transform();
	}
    getCenter() {
        return this.center
    }
    getInd(chunksize)
    {
        let i = Math.floor((this.posX + this.center[0] - chunksize/2)/chunksize )
        let j = Math.floor((this.posY + this.center[1] - chunksize/2)/chunksize)
        return [i,j]
    }
    checkwall(x,y,chunksize)
    {
        console.log(this.radius)
        let i = (x - chunksize/2)/chunksize 
        let j = (y - chunksize/2)/chunksize
        //check j,i
        console.log(i,j)
        if(this.grid[j][i] !=0)
        return true;
        else return false;
    }
    move(direction,pellets,chunksize,canvasHeight,canvasWidth)
    {
        console.log(this.center)
        var i = this.getInd(chunksize)[1];
        var j = this.getInd(chunksize)[0];
        if(direction == "r" && this.checkwall(this.posX + chunksize+ this.center[0],this.posY+this.center[1],chunksize))
        {
            this.posX = this.posX + chunksize;
            console.log(this.posX+this.center[0]," ",this.posY+this.center[1]);   
            this.transform.translateTransform(this.posX,this.posY);
            this.or = 0;
        }
        if(direction == "l" && this.checkwall(this.posX - chunksize+ this.center[0],this.posY+this.center[1],chunksize))
        {
            this.posX -= chunksize;
            this.angle = Math.PI;
            console.log(this.posX+this.center[0]," ",this.posY+this.center[1]);
            this.or = 2;
            this.transform.translateRotateTransform(this.center[0], this.center[1], -this.posX, -this.posY, this.angle)
        }
        if(direction == "u" && this.checkwall(this.posX + this.center[0],this.posY - chunksize +this.center[1],chunksize))
        {
            this.posY -= chunksize
            this.angle = 3*Math.PI/2
            console.log(this.posX+this.center[0]," ",this.posY+this.center[1]);
            this.or = 3
            this.transform.translateRotateTransform(this.center[0], this.center[1], -this.posY, this.posX, this.angle)
        }
        if(direction == "d" && this.checkwall(this.posX + this.center[0],this.posY + chunksize +this.center[1],chunksize) )
        {
            this.posY += chunksize
            this.angle = Math.PI/2
            console.log(this.posX+this.center[0]," ",this.posY+this.center[1]);
            this.or = 1
            this.transform.translateRotateTransform(this.center[0], this.center[1], this.posY, -this.posX, this.angle)
        }
        
    }
    teleport(chunksize,delx, dely)
    {
        this.posX = Math.floor(delx/chunksize) * chunksize - this.center[0] + Math.floor(chunksize/2)
        this.posY = Math.floor(dely/chunksize) * chunksize - this.center[1] + Math.floor(chunksize/2)
        console.log(this.center[0]," MY CENT", this.center[1])
        console.log(this.posX, " GO HERE",this.posY)
        
        if(this.checkwall(this.posX + this.center[0],this.posY+this.center[1],chunksize))
        {
            this.transform.translateTransform(this.posX,this.posY);
        }
        else{
            alert("who goes there!");
        }
    }
    getframeOrd(x, y){
        if(this.or == 0)
        return [x,y]
        else if(this.or == 1)
        return [y,-x]
        else if(this.or ==2)
        return [-x,-y]
        else
        return [-y,x]
    }
    rotatePacman(key){
        console.log(this.or)
        if(key == ")"){
            this.angle += Math.PI/2;
            this.or = (this.or+1)%4;
            var posxSign = this.getframeOrd(this.posX,this.posY)[0];
            var posySign = this.getframeOrd(this.posX,this.posY)[1];
            this.transform.translateRotateTransform(this.center[0], this.center[1], posxSign, posySign, this.angle)
        }
        if(key == "("){
            this.angle -= Math.PI/2;
            this.or = (this.or + 3)%4;
            var posxSign = this.getframeOrd(this.posX,this.posY)[0];
            var posySign = this.getframeOrd(this.posX,this.posY)[1];
            this.transform.translateRotateTransform(this.center[0], this.center[1], posxSign, posySign, this.angle)
        }
    }
}
