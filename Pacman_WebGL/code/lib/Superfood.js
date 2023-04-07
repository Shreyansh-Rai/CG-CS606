import { Transform } from "./transform.js";


export class Superfood
{
	constructor(vert1,a,color,state) 
	{
        vert1 = [vert1[0],vert1[1],0]
        var vertices =[]
        for(var i=0.0; i<360;i++)
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
		this.vertexPositions = new Float32Array(vertices);

        this.radius = a;
        this.type = state;
		this.color = color;
		this.transform = new Transform();
	}
    getRadius()
    {
        return this.radius;
    }
    setCol(color)
    {
        this.color = color;
    }
}   
