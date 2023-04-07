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
		vec3.set(this.rotationAxis, 1, 1, 0);

		this.modelTransformMatrix = mat4.create();
		mat4.identity(this.modelTransformMatrix);

		this.tm = mat4.create();
		// this.updateModelTransformMatrix();
	}

	updateModelTransformMatrix(list)
	{
		// console.log(list)
		if(list!==undefined)
		{
			mat4.identity(this.tm);
			mat4.identity(this.modelTransformMatrix);
			var tm = mat4.create();
			mat4.identity(tm);
			mat4.identity(this.modelTransformMatrix);
			for(let i=0;i<list.length;i++){
				mat4.multiply(tm, tm, list[i]);
			}
			mat4.multiply(this.modelTransformMatrix, tm, this.modelTransformMatrix);
		}
		
	}

	translateTransform(x, y, z){
		let transform = mat4.create();
		vec3.set(this.translate, x, y, z);
		mat4.fromTranslation(transform, this.translate);
		return transform;
	}
	rotateTransform(angle){
		let transform = mat4.create();
		this.rotationAngle = angle
		mat4.fromRotation(transform, this.rotationAngle, [0, 1, 0])
		return transform;
	}
	rotateQuat(axis, angle){
		let q1 = quat2.create();
		let q2 = quat2.create();
		let transform = mat4.create();
		quat2.rotateAroundAxis(q2, q1, axis, angle)
		mat4.fromQuat2(transform, q2)
		return transform;
	}
	scaleTransform(s){
		let transform = mat4.create();
		vec3.set(this.scale, s, s, s);
		mat4.fromScaling(transform, this.scale)
		return transform;
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
