export const vertexShaderSrc = `      
	attribute vec3 aPosition;
    uniform mat4 uModelMatrix;
    uniform vec3 uResolution;
	void main () {
		vec4 Position = uModelMatrix*vec4(aPosition,1);
		vec3 zeroToOne = Position.xyz / uResolution;
		vec3 zeroToTwo = zeroToOne * 2.0;         
		vec3 clipSpace = zeroToTwo - 1.0;
		gl_Position =  vec4(clipSpace*vec3(1,-1,0), 1.0);
        gl_PointSize = 10.0; 
	}                          
`;