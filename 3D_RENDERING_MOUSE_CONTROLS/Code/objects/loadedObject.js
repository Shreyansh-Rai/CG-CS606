import { Transform } from "../lib/transform.js";

export class LoadedObject {
    constructor(mesh,color){
        this.color = color;
        this.mesh = mesh;
        this.vertexPositions;
        this.vertexCoords=[];
        this.curr_vertex_index = -1
        this.type = 'model'
        this.vertices=this.mesh.vertices;
        this.indices=this.mesh.indices;

        this.convertmesh();
        this.transform = new Transform();

        
    }
    set_curr_vertex(index)
    {
        this.curr_vertex_index = index
    }

    convertmesh(){
        var vertices = [];

        for(var i = 0;i<this.mesh.vertices.length-1;i = i+3){
            var vertex = [this.mesh.vertices[i]*2,this.mesh.vertices[i+1]*2,this.mesh.vertices[i+2]*2]
            // console.log(vertex)

            vertices = vertices.concat(vertex);
            this.vertexCoords.push(vertex);

            var normal = [this.mesh.vertexNormals[i],this.mesh.vertexNormals[i+1],this.mesh.vertexNormals[i+2]]
            // console.log(normal)
            
            vertices = vertices.concat(normal)
        }


        this.vertexPositions = new Float32Array(vertices);
    }
    change_color(new_color)
    {
        this.color = new_color
    }

}