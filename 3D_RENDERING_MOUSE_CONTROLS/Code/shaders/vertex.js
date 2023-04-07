export const vertexShaderSrc = `      
	attribute vec3 aPosition;
	attribute vec3 aNormal;

	uniform mat4 uModelTransformMatrix;  
	uniform mat4 ViewMatrix;
	uniform mat4 ProjMatrix;

	varying vec3 vNormal;
	varying vec3 vViewDirection;
	void main () {             
		gl_Position =  ProjMatrix * ViewMatrix * uModelTransformMatrix * vec4(aPosition, 1.0);
		// gl_Position = uModelTransformMatrix * vec4(aPosition, 1.0);
        gl_PointSize = 10.0;
		vNormal = aNormal;
	}                        
`;