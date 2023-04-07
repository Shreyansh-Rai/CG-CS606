export class WebGLRenderer
{
	constructor()
	{
		this.domElement = document.createElement("canvas");		

		this.gl =
			this.domElement.getContext("webgl",{preserveDrawingBuffer: true, alpha: false, premultipliedAlpha: false}) ||
			this.domElement.getContext("experimental-webgl");
		if (!this.gl) throw new Error("WebGL is not supported");

		this.setSize(50,50);
		this.clear(1.0,1.0,1.0,1.0);
	}	

	setSize(width, height)
	{
		this.domElement.width = width;
		this.domElement.height = height;
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	}

	clear(r,g,b,a)
	{
		this.gl.clearColor(r, g, b, a);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		// this.gl.enable(this.gl.CULL_FACE);
    	this.gl.enable(this.gl.DEPTH_TEST);
	}

	setAnimationLoop(animation) 
	{
		function renderLoop()
		{
			animation();
			window.requestAnimationFrame(renderLoop);
		}	

		renderLoop();
		  
	}

	render(scene, shader) 
	{
		shader.setUniformMatrix4fv("ProjMatrix", scene.projMatrix);
		shader.setUniformMatrix4fv("ViewMatrix", scene.viewMatrix);
		

		scene.primitives.forEach( function (primitive) {
							// primitive.transform.updateModelTransformMatrix();
							shader.setUniformMatrix4fv("uModelTransformMatrix", primitive.transform.modelTransformMatrix);

							shader.bindIndexBuffer(
								shader.indexBuffer,
								primitive.indices
							)
			
							shader.gl.bindBuffer(shader.gl.ARRAY_BUFFER, shader.vertexAttributesBuffer);
							
							//populate the buffer data Static Draw for optimisations.
							shader.gl.bufferData(
								shader.gl.ARRAY_BUFFER,
								primitive.vertexPositions,
								shader.gl.STATIC_DRAW
							);
							
							var positionAttribLocation = shader.attribute("aPosition");
							var normalAttribLocation = shader.attribute("aNormal");
			
							shader.gl.vertexAttribPointer(
								positionAttribLocation, //Look at the positions in vertex shader aPosition.
								3, // x y z of position
								shader.gl.FLOAT, 
								shader.gl.FALSE,
								6 * Float32Array.BYTES_PER_ELEMENT, // each vertex shader has apos and anorm so 3X2 = 6 elements.
								0 // vertex positions stored first and hence no offset
							);
			
							shader.gl.vertexAttribPointer(
								normalAttribLocation, //Look at the normals in vertex shader aNormals.
								3, // x y z of Normals 
								shader.gl.FLOAT, 
								shader.gl.FALSE, //no normalisation.
								6 * Float32Array.BYTES_PER_ELEMENT, // each vertex shader has apos and anorm so 3X2 = 6 elements. and this refers to the very same vertex shader element sort of. (helps to think that way)
								3 * Float32Array.BYTES_PER_ELEMENT // since the normals have 3*float position values before them in the buffer it tells the renderer to skip that to find normals.
							);
			
							shader.gl.enableVertexAttribArray(positionAttribLocation);
							shader.gl.enableVertexAttribArray(normalAttribLocation);
			
							shader.setUniform4f("uColor", primitive.color);
			
			if(primitive.type == 'model'){
				
				shader.drawElements(primitive.indices.length);
			}
			else{

				shader.drawArrays(primitive.vertexPositions.length / 6);
				//Earlier we had /3 in the pacman implementation but now since we are trying to make vertex shader hold normals also we need to look at chunks of 6.
			}
			
		});
	}

	glContext()
	{
		return this.gl;
	}

	mouseToClipCoord(mouseX,mouseY) {

		// @ToDo
	}
}