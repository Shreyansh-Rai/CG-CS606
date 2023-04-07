export class WebGLRenderer 
{
	constructor() 
	{
		this.domElement = document.createElement("canvas");
		this.gl =
			this.domElement.getContext("webgl",{preserveDrawingBuffer: true}) ||
			this.domElement.getContext("experimental-webgl");

		if (!this.gl) throw new Error("WebGL is not supported");

		this.setSize(50, 50);
		this.clear(1.0, 1.0, 1.0, 1.0);
	}

	getDim()
	{
		return [Math.floor(this.domElement.width),Math.floor(this.domElement.height)]
	}

	setSize(width, height) 
	{
		this.domElement.width = width;
		this.domElement.height = height;
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	}

	clear(r, g, b, a) 
	{
		this.gl.clearColor(r, g, b, a);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	}

	setAnimationLoop(animation) 
	{
		function renderLoop() {
			animation();
			window.requestAnimationFrame(renderLoop);
		}

		renderLoop();
	}

	// render function executes all the time
	// can be thought of as the main game loop
	// @param {scene} - Scene to render
	// @param {shader} - Shader to use
	// for each primitive in the scene, updates the transform matrix and renders the primitve
	render(scene, shader) 
	{
		var canvasWidth = Math.floor(this.domElement.width)
		var canvasHeight = Math.floor(this.domElement.height)
		scene.primitives.forEach(function (primitive) {
			primitive.transform.updateModelTransformMatrix();

			shader.bindArrayBuffer(
				shader.vertexAttributesBuffer,
				primitive.vertexPositions
			);
			
			shader.fillAttributeData(
				"aPosition",
				primitive.vertexPositions,
				3,
				3 * primitive.vertexPositions.BYTES_PER_ELEMENT,
				0
			);
			shader.setUniform3f('uResolution',[canvasWidth,canvasHeight,0.0])
			shader.setUniform4f("uColor", primitive.color);
			shader.setUniformMatrix4fv("uModelMatrix",primitive.transform.modelTransformMatrix)
			// if(primitive.type == 'pacman')
			// console.log(primitive.transform.modelTransformMatrix)
			// Draw
			
			shader.drawArrays(primitive.vertexPositions.length / 3);
		});
	}


	glContext() 
	{
		return this.gl;
	}

	getCanvas() 
	{
		return this.domElement;
	}


	// gets mouse click reduced to the form of clip space
	// uses the mouseEvent target attribute to calculate the mouse position in clip space of webGL canvas
	mouseToClipCoord(mouseEvent) 
	{
		// TO DO 
	}	
}
