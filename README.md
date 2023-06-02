# CG-CS606
# Assignment 1 Refer to the Report attached [CG_A1_IMT2020501_Report.pdf](https://github.com/Shreyansh-Rai/CG-CS606/files/11636639/CG_A1_IMT2020501_Report.pdf)

# Assingment 2 Refer to the Report Attached https://github.com/Shreyansh-Rai/CG-CS606/blob/main/3D_RENDERING_MOUSE_CONTROLS/CG%20Report.pdf

# Assignment 3 To run install vite. run :  npm install and npx vite. this will start the server where you can interact with the project
### I have implemented the Phong, Blinn-Phong and Gouraud Shaders from scratch in this Code. There is also texture mapping to a sphere.
### All of this is done at a very low level using glsl and no other module like three js was used here. 
<img width="1240" alt="2 lights blinn phong" src="https://github.com/Shreyansh-Rai/CG-CS606/assets/75561611/b68115f9-f36a-484d-a772-2ecaa04a7a09">
<img width="1159" alt="Gouraud" src="https://github.com/Shreyansh-Rai/CG-CS606/assets/75561611/77d5f46d-59ba-4c6e-b856-303cd8d3704f">
<img width="1220" alt="Phong" src="https://github.com/Shreyansh-Rai/CG-CS606/assets/75561611/a2ed53a4-069a-4ba5-a710-136f4402e85c">

#### Attached are some photos of the same Note that the blinn Phong implementation also has an extra light source.

# Assignment 4 To run install vite. run :  npm install and npx vite. this will start the server where you can interact with the project.
### The pendulums are built as scenegraphs. this helps in controlling there motion and also detecting collisions with the other pendulum.
### The Animation is implemented using "loophooks" that apply a function f(dt) given some dt time interval and I have made it so modular that any animation can define a transition function and use the loophooks to update the state after each dt time interval.
### The physics is realistic time varying equation of the pendulum using the small angle approximation and the user can control the gravity, max displacement from center, lighting intensities positions etc.
### The light is implemented so that it will always follow the moving object.
<img width="1440" alt="Screenshot1" src="https://github.com/Shreyansh-Rai/CG-CS606/assets/75561611/34010477-5dea-4e20-ae78-4ed82be160ff">
