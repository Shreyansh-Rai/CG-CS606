import { Transform } from "../lib/transform.js";
import { sidesize } from "../global_vars/sizes.js";


export class Platform {
    constructor(n, color){
        this.n = n;
        this.color = color;
        this.side = sidesize;
        this.angles = 2*Math.PI/this.n;
        this.radius = this.side/(2*Math.sin(Math.PI/this.n))
        this.normals = [0,1,0];

        this.vertexPositions;
        this.vertexCoords;
        this.generatePlatform();
        this.transform = new Transform();

        
    }

    // Generated an Equilateral Polygon
    generatePlatform(){
        var vertices = [];
        var onlyvertices = [];
        
        for(var i = 0;i<this.n;i++){
            var center = [0,0,0];
            vertices = vertices.concat(center);
            vertices = vertices.concat(this.normals)

            var xcoord = this.radius*Math.cos(this.angles*i);
            var ycoord = this.radius*Math.sin(this.angles*i);
            onlyvertices.push([xcoord,0,ycoord]);
            vertices = vertices.concat([xcoord,0,ycoord]);
            vertices = vertices.concat(this.normals)

            var xcoord = this.radius*Math.cos(this.angles*(i+1));
            var ycoord = this.radius*Math.sin(this.angles*(i+1));
            vertices = vertices.concat([xcoord,0,ycoord]);
            vertices = vertices.concat(this.normals)
        }

        this.vertexCoords = onlyvertices;
        this.vertexPositions = new Float32Array(vertices);
    }
    generate_random_vertex(index)
    {
        let random_index = Math.floor(Math.random()*this.n)
        if(random_index==index)
            return this.generate_random_vertex(index)
        else
            return random_index 
    }
}
