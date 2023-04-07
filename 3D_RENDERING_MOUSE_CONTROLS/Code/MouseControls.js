/*
After going through a lot of documentation : 
var myObject = {
  myMethod: function() {
    var context = this;
    console.log(context); // will log myObject
  }
};

var myButton = document.getElementById('myButton');
myButton.addEventListener('click', myObject.myMethod);

In this example, when myMethod is called as an event listener for myButton, 
this will refer to myButton. However, by assigning this to a variable within myMethod, 
we can still reference myObject within the function.
*/

import { vec3, mat4, quat2,quat } from 'https://cdn.skypack.dev/gl-matrix';

export class MouseControls{
    constructor(gl){
        var context = this;
        this.CurCam = [0,50,30]
        this.Cam = this.CurCam
        this.x_p = 0.0;
        this.y_p = 0.0;
        this.z_p = 0.0;
        this.deltax = 0.0;
        this.deltay = 0.0;
        this.deltaz = 0.0;
        this.thetax = 0.0;
        this.thetay = 0.0;
        this.Held = 0;
        this.AlterViewTo = mat4.create();
        this.Zoom = 1;
        this.canvas = gl.canvas;
        this.canvas.addEventListener("mousedown", function (e) { if(e.button == 0) context.Press(e); });
        this.canvas.addEventListener("mouseup", function (e) { if(e.button == 0) context.Release(e); });
        this.canvas.addEventListener("mouseout", function (e) { context.Release(e); });
        this.canvas.addEventListener("mousemove", function (e) { context.Move(e); });
        this.canvas.addEventListener("wheel", function (e) { context.Scroll(e); });
    }

    alterView(){
        // Update the thetax and thetay based on the deltax and deltay changes
        this.thetax += this.deltax;
        this.thetay += this.deltay;

        // Create some variables to hold the necessary matrices and vectors
        let q1 = quat2.create();
        let q2 = quat2.create();
        let m1 = mat4.create();
        let v1 = vec3.create();
        let v2 = vec3.create();

        //TODO Make QUATERNION WORK!!!!!!

        // Set the camera position vector and duplicate it to another vector
        vec3.set(v1, ...this.Cam);
        vec3.set(v2, ...this.Cam);

        // Rotate the camera around the Y and X axes based on the thetax and thetay changes
        quat2.rotateAroundAxis(q2, q1, [0, 1, 0], this.thetax);
        quat2.rotateAroundAxis(q2, q2, [1, 0, 0], this.thetay);

        // Create a rotation matrix from the q2 quaternion
        mat4.fromQuat2(m1, q2);
        // Transform the camera position vector by the rotation matrix
        /*
        the camera position is being updated based on the angle of rotation around the x and y axes.
        When the camera position is transformed using the view matrix, the resulting vector will have 
        a positive z value because the camera is looking down the negative z axis. However, in order 
        to position the camera correctly in the scene, the x and y values need to be negated so that 
        the camera moves in the opposite direction of the rotation.
        */
        vec3.transformMat4(v2, v2, m1); //gives 3X1 vector representing the new camorientation.
        this.CurCam = [-v2[0],-v2[1],v2[2]]
        mat4.lookAt(this.AlterViewTo, this.CurCam, [0, 0, 0], [0, 1, 0])
        // console.log("CurCam : ",this.CurCam)
        //Eulerian AlterView To Transforms. Scale the matrix and rotate.
        // let Eulerian = mat4.create();
        mat4.scale(this.AlterViewTo, this.AlterViewTo, [this.Zoom, this.Zoom, this.Zoom]); 
        // mat4.rotateX(Eulerian, Eulerian, this.thetay);
        // mat4.rotateY(Eulerian, Eulerian, this.thetax);
        // mat4.multiply(this.AlterViewTo,this.AlterViewTo, Eulerian);
        // vec3.transformMat4(v1, v1, Eulerian)

        return this.AlterViewTo;
    }
    // alterView2(){ //bug fixing.
    //     // Update the thetax and thetay based on the deltax and deltay changes
    //     this.thetax += this.deltax;
    //     this.thetay += this.deltay;

    //     // Create some variables to hold the necessary matrices and vectors
    //     let q1 = quat2.create();
    //     let q2 = quat2.create();
    //     let m1 = mat4.create();
    //     let v1 = vec3.create();
    //     let v2 = vec3.create();

    //     //TODO Make QUATERNION WORK!!!!!!

    //     // Set the camera position vector and duplicate it to another vector
    //     vec3.set(v1, ...this.Cam);
    //     vec3.set(v2, ...this.Cam);

    //     // Rotate the camera around the Y and X axes based on the thetax and thetay changes
    //     quat2.rotateAroundAxis(q2, q1, [0, 1, 0], this.thetax);
    //     quat2.rotateAroundAxis(q2, q2, [1, 0, 0], this.thetay);
        
    //     // Create a rotation matrix from the q2 quaternion
    //     mat4.fromQuat2(m1, q2);
    //     // Transform the camera position vector by the rotation matrix
    //     vec3.transformMat4(v2, v2, m1); //gives 3X1 vector representing the new camorientation.
    //     //DELETE IF DOES NOT WORK 
    //     let qtemp = quat.create();
    //     let qtempi = quat.create();
    //     quat.fromEuler(qtemp,-this.thetay*180/(2*Math.PI),0,-this.thetax*180/(2*Math.PI));
    //     quat.conjugate(qtempi,qtemp);
    //     mat4.fromQuat(m1,qtemp)
    //     let mq1 = mat4.create()
    //     let mq2 = mat4.create()
    //     mat4.fromQuat(mq1,qtemp)
    //     mat4.fromQuat(mq2,qtempi)
    //     mat4.multiply(m1,mq1,m1);
    //     mat4.multiply(m1,m1,mq2);
    //     /*
    //     the camera position is being updated based on the angle of rotation around the x and y axes.
    //     When the camera position is transformed using the view matrix, the resulting vector will have 
    //     a positive z value because the camera is looking down the negative z axis. However, in order 
    //     to position the camera correctly in the scene, the x and y values need to be negated so that 
    //     the camera moves in the opposite direction of the rotation.
    //     */
    //     this.CurCam = [-v2[0],-v2[1],v2[2]]
    //     console.log(this.CurCam)
    //     //Eulerian AlterView To Transforms. Scale the matrix and rotate.
    //     mat4.lookAt(this.AlterViewTo, this.Cam, [0, 0, 0], [0, 1, 0])
    //     let Eulerian = mat4.create();
    //     mat4.scale(this.AlterViewTo, this.AlterViewTo, [this.Zoom, this.Zoom, this.Zoom]); 
    //     mat4.rotateX(Eulerian, Eulerian, this.thetay);
    //     mat4.rotateY(Eulerian, Eulerian, this.thetax);
    //     mat4.multiply(this.AlterViewTo,this.AlterViewTo, m1);
    //     vec3.transformMat4(v1, v1, Eulerian)

    //     return this.AlterViewTo;
    // }
    Press = function (e) {
        this.Held = 1;
        this.x_p = e.pageX, this.y_p = e.pageY;
    }; //toggle held mode.

    Release = function (e) {
        this.Held = 0;
    }; //stop moving

    Move = function (e) {
        if (this.Held !=1) 
        {
            this.deltax = 0;
            this.deltay = 0;
        }

        else if(this.Held === 1)
        {
            //Scale to change the amount of rotation I used my screen resolution.
            this.deltax = (e.pageX - this.x_p) * 2 * Math.PI / 1920;
            this.deltay = (e.pageY - this.y_p) * 2 * Math.PI / 1080;
            this.thetax += this.deltax;
            this.thetay += this.deltay;

            this.x_p = e.pageX;
            this.y_p = e.pageY;
        }
    };
    Scroll = function (e) {

        let delta = e.deltaY > 0 ? 0.05 : -0.05;
        this.Zoom -= delta;
    }
}