import { vec3, mat4 } from 'https://cdn.skypack.dev/gl-matrix';

export class Transform
{
	constructor()
	{
		this.translate = vec3.create();
		vec3.set(this.translate, 0, 0, 0);
		
		this.scale = vec3.create();
		vec3.set(this.scale, 1, 1, 1);
		
		this.rotationAngle = 0;
		this.rotationAxis = vec3.create();
		vec3.set(this.rotationAxis, 1, 0, 0);

		this.modelTransformMatrix = mat4.create();
		mat4.identity(this.modelTransformMatrix);

		this.updateModelTransformMatrix();
		
	}

	updateModelTransformMatrix()
	{
		// //@TODO
		// // 1. Reset the transformation matrix
		// this.reset();
		// // 2. Use the current transformations values to calculate the latest transformation matrix
		// mat4.translate(this.modelTransformMatrix,this.modelTransformMatrix,this.translate);
		// mat4.scale(this.modelTransformMatrix,this.modelTransformMatrix,this.scale);
		// // mat4.rotate(this.modelTransformMatrix,this.modelTransformMatrix,this.rotationAngle,this.rotationAxis)
		// this.modelTransformMatrix = mat4.rotate(this.modelTransformMatrix,this.modelTransformMatrix,this.rotationAngle,this.rotationAxis)
	}
	rotateTranslate(angle,x,y)
	{
		this.rotationAngle = angle
		let Rotational = mat4.create()
		mat4.fromRotation(Rotational, this.rotationAngle, [0, 0, 1])
		vec3.set(this.translate, x, y, 0)
		mat4.fromTranslation(this.modelTransformMatrix, this.translate)
		mat4.multiply(this.modelTransformMatrix,this.modelTransformMatrix,Rotational)
	}
	translateTransform(x, y){
		vec3.set(this.translate, x, y, 0)
		mat4.fromTranslation(this.modelTransformMatrix, this.translate)
		
	}
	rotateTransform(angle){
		this.rotationAngle = angle
		mat4.fromRotation(this.modelTransformMatrix, this.rotationAngle, [0, 0, 1])
	}
	scaleTransform(initX, initY, x, y, times)
	{
		
	}
	translateRotateTransform(initX, initY, x, y, angle){
		let translationToOrigin = mat4.create();
		let rotation = mat4.create();
		let translationToInitial = mat4.create();
		let translationToNewPoint = mat4.create();

		vec3.set(this.translate, initX, initY, 0)
		mat4.fromTranslation(translationToOrigin, this.translate)

		this.rotationAngle = angle
		mat4.fromRotation(rotation, this.rotationAngle, [0, 0, 1])

		vec3.set(this.translate, -initX, -initY, 0)
		mat4.fromTranslation(translationToInitial, this.translate)

		vec3.set(this.translate, x, y, 0)
		mat4.fromTranslation(translationToNewPoint, this.translate)

		mat4.multiply(this.modelTransformMatrix, translationToOrigin, rotation)
		mat4.multiply(translationToNewPoint, translationToNewPoint, translationToInitial)
		mat4.multiply(this.modelTransformMatrix, this.modelTransformMatrix, translationToNewPoint)
	}
	translateRotateScaleTransform(initX, initY, x, y, angle,times){
		let translationToOrigin = mat4.create();
		let rotation = mat4.create();
		let translationToInitial = mat4.create();
		let translationToNewPoint = mat4.create();
		let scaling = mat4.create()
		let tempMatrix = mat4.create();
		mat4.identity(tempMatrix);

		vec3.set(this.translate, initX, initY, 0)
		mat4.fromTranslation(translationToOrigin, this.translate)

		this.rotationAngle = angle
		mat4.fromRotation(rotation, this.rotationAngle, [0, 0, 1])
		
		vec3.set(this.scale,times,times,1)
		mat4.fromScaling(scaling,this.scale)

		vec3.set(this.translate, -initX, -initY, 0)
		mat4.fromTranslation(translationToInitial, this.translate)

		vec3.set(this.translate, x, y, 0)
		mat4.fromTranslation(translationToNewPoint, this.translate)

		mat4.multiply(tempMatrix,tempMatrix,translationToNewPoint)
		mat4.multiply(tempMatrix,tempMatrix,translationToOrigin);
		mat4.multiply(tempMatrix,tempMatrix,rotation)
		mat4.multiply(tempMatrix,tempMatrix,scaling)
		mat4.multiply(tempMatrix,tempMatrix,translationToInitial)
		mat4.copy(this.modelTransformMatrix,tempMatrix);
	}
	setRotate(angle)
	{
		this.rotationAngle = angle
		vec3.set(this.rotationAxis,0,0,1);
	}
	setScale(sz=[1,1,1])
	{
		vec3.set(this.scale,sz[0],sz[1],sz[2]);
	}
	setTranslate(dt=[0,0,0])
	{
		vec3.set(this.translate,dt[0],dt[1],dt[2]);
	}

	reset()
	{
		mat4.identity(this.modelTransformMatrix);
	}
}