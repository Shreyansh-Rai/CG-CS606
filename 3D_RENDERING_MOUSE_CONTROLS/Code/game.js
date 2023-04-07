import { scaling_factor } from "./global_vars/sizes.js";
export class Game{

    constructor(colors_lst,vertexCoords){
        this.colors_lst = colors_lst;
        this.vertex_lst=vertexCoords;
        this.can_go_lst = []
        this.obj_lst = []
        this.type = 'game'
        this.curr_obj_index = -1
        this.next_random_index = -1
        this.curr_color = [0,0,0,0]
        this.scalingfactor = scaling_factor
        this.A = {x :0, y : 0, z : 0 }
        
    }
    initialize_obj_pos()
    {
        for(let i=0;i<this.vertex_lst.length;i++)
	         this.can_go_lst.push(true)
        // console.log('pehele',this.can_go_lst)
        for(var i =0;i<this.obj_lst.length;i++)
        {
        const vertex = this.vertex_lst[i]
        this.obj_lst[i].set_curr_vertex(i)
        this.can_go_lst[i] = false
        console.log("vertex: ",vertex)
        this.obj_lst[i].transform.updateModelTransformMatrix(
            [this.obj_lst[i].transform.translateTransform(vertex[0],vertex[1],vertex[2])]
        ) 
        }
        // console.log('baad mein',this.can_go_lst)
    }
    add_obj(obj)
    {
        this.obj_lst.push(obj)
    }
    get_pixel_color(clientX,clientY,renderer)
    {
        let curr_coordi = [clientX,clientY]
		console.log('selected pixel coordi',curr_coordi)

		const rect = renderer.gl.canvas.getBoundingClientRect();
		let mouseX = clientX - rect.left;
		let mouseY = clientY - rect.top;

		const pixelX = mouseX * renderer.gl.canvas.width / renderer.gl.canvas.clientWidth;
		const pixelY = renderer.gl.canvas.height - mouseY * renderer.gl.canvas.height / renderer.gl.canvas.clientHeight - 1;

		const curr_color = new Uint8Array(4)
		renderer.gl.readPixels(
			pixelX,            // x
			pixelY,            // y
			1,                 // width
			1,                 // height
			renderer.gl.RGBA,           // format
			renderer.gl.UNSIGNED_BYTE,  // type
			curr_color);             // typed array to hold result

		var color = [curr_color[0]/255,curr_color[1]/255,curr_color[2]/255,1]
		console.log('Selected pixel color: ', color)
        this.curr_color = color

    }

    get_random_index(curr_index)
    {
 
        let random_index = Math.floor(Math.random()*this.vertex_lst.length)
        // console
        if(random_index==curr_index)
            this.get_random_index(curr_index)
        else
            this.random_index = random_index   
    }
    move(scaling)
    {
        let curr_vertex = this.vertex_lst[this.obj_lst[this.curr_obj_index].curr_vertex_index]
        let random_vertex = this.vertex_lst[this.random_index]
        
        var A = this.A
        var B = {x :random_vertex[0], y : random_vertex[1], z : random_vertex[2] }
        var distancebetweenpoints = Math.sqrt((A.x-B.x)**2 + (A.y-B.y)**2 + (A.z-B.z)**2) 

        var interpolationdistance = (distancebetweenpoints*scaling)/this.scalingfactor

        console.log("D",distancebetweenpoints,"d",interpolationdistance)
        console.log("A",A,B)
        var nextpoint = this.findPointC(A,B,interpolationdistance)

        

        console.log("CURR VERTEX: ",curr_vertex)
        console.log("RANDOM VERTEX", random_vertex)
        console.log("nextpoint", nextpoint)
        console.log("CURR VERTEX INDEX BEFORE MOVE: ",this.obj_lst[this.curr_obj_index].curr_vertex_index)


        if(this.can_go_lst[this.random_index]==true)
        {

            let t = [...this.obj_lst[this.curr_obj_index].transform.translate]
            // translateTransform mein joh coordi aenge waha direct tp marega no matter currently kaha hai
            this.obj_lst[this.curr_obj_index].transform.updateModelTransformMatrix([
    
                // this.obj_lst[this.curr_obj_index].transform.translateTransform(random_vertex[0]*scaling/this.scalingfactor,random_vertex[1]*scaling/this.scalingfactor,random_vertex[2]*scaling/this.scalingfactor)
                this.obj_lst[this.curr_obj_index].transform.translateTransform(nextpoint.x,nextpoint.y,nextpoint.z)
    
            ]
    
            )
            this.can_go_lst[this.obj_lst[this.curr_obj_index].curr_vertex_index] = true
            this.obj_lst[this.curr_obj_index].set_curr_vertex(this.random_index)
            this.can_go_lst[this.obj_lst[this.curr_obj_index].curr_vertex_index] = false
            
        }
        else
        {

            // moving the already exist object to new place
            // ye walla move pehele hoga
            let already_obj_index = -1

            for(let i=0;i<this.obj_lst.length;i++)
            {
                if(this.obj_lst[i].curr_vertex_index == this.random_index)
                {
                    already_obj_index = i
                }
            }
            console.log(already_obj_index)

            let already_randomV_index = -1

            for(let i=0;i<this.can_go_lst.length;i++)
            {
                if(this.can_go_lst[i]==true)
                {
                    already_randomV_index = i
                }
            }

            let already_random_vertex = this.vertex_lst[already_randomV_index]

            let t1 = [...this.obj_lst[already_obj_index].transform.translate]
            // translateTransform mein joh coordi aenge waha direct tp marega no matter currently kaha hai
            this.obj_lst[already_obj_index].transform.updateModelTransformMatrix([
    
                this.obj_lst[this.curr_obj_index].transform.translateTransform(nextpoint.x,nextpoint.y,nextpoint.z)
    
            ]
    
            )
            this.can_go_lst[this.obj_lst[already_obj_index].curr_vertex_index] = true
            this.obj_lst[already_obj_index].set_curr_vertex(this.random_index)
            this.can_go_lst[this.obj_lst[already_obj_index].curr_vertex_index] = false

            //------------------------------------------------------------------------------------------------

            // moving the object to place where another object already existed
            let t = [...this.obj_lst[this.curr_obj_index].transform.translate]
            // translateTransform mein joh coordi aenge waha direct tp marega no matter currently kaha hai
            this.obj_lst[this.curr_obj_index].transform.updateModelTransformMatrix([
    
                this.obj_lst[this.curr_obj_index].transform.translateTransform(nextpoint.x,nextpoint.y,nextpoint.z)
    
            ]
    
            )
            this.can_go_lst[this.obj_lst[this.curr_obj_index].curr_vertex_index] = true
            this.obj_lst[this.curr_obj_index].set_curr_vertex(this.random_index)
            this.can_go_lst[this.obj_lst[this.curr_obj_index].curr_vertex_index] = false

        }

        console.log("CURR VERTEX INDEX AFTER MOVE: ",this.obj_lst[this.curr_obj_index].curr_vertex_index)
        this.obj_lst[this.curr_obj_index].change_color(this.curr_color)
    }
    set_curr_obj(index)
    {
        this.curr_obj_index = index
    }
    rotate_obj(pointer=null)
    {
        let curr_vertex = this.vertex_lst[this.obj_lst[this.curr_obj_index].curr_vertex_index]
        let random_vertex = this.vertex_lst[this.random_index]
        console.log("Currently at :m", curr_vertex)
        console.log("Going to : ",random_vertex)
        // vatsal ke kehne par i have hardcoded the axis of the object to be right, ie x axis and then found the angle between x axis and the line joining 2 vectors
        // thus objects ki direction hardcode karni hai to be right when models banake load, depends on the model
        let dot_product = random_vertex[0]-curr_vertex[0]
        let mod = Math.sqrt(Math.pow((random_vertex[0]-curr_vertex[0]),2)+Math.pow((random_vertex[1]-curr_vertex[1]),2)+Math.pow((random_vertex[2]-curr_vertex[2]),2))
        let angle = Math.acos(dot_product/mod)
        // please insert angle here
        console.log('Angle: ',180*angle/Math.PI)
        if(random_vertex[2] >= -0.01 && curr_vertex[2] < 0.01) angle=angle*-1;
        let t = [...this.obj_lst[this.curr_obj_index].transform.translate]
        // translate to origin, rotate and then translate back to original place
        // translateTransform mein joh coordi aenge waha direct tp marega no matter currently kaha hai
        this.obj_lst[this.curr_obj_index].transform.updateModelTransformMatrix([
            this.obj_lst[this.curr_obj_index].transform.translateTransform(t[0],t[1],t[2]),
            this.obj_lst[this.curr_obj_index].transform.rotateTransform(angle),
            this.obj_lst[this.curr_obj_index].transform.translateTransform(0,0,0)
        ])
 
        pointer.transform.updateModelTransformMatrix([
            this.obj_lst[this.curr_obj_index].transform.translateTransform(t[0],t[1]+2,t[2]),
            this.obj_lst[this.curr_obj_index].transform.rotateTransform(angle),
            this.obj_lst[this.curr_obj_index].transform.translateTransform(0,0,0)
        ])
    }
    
    //Function for finding the interpolating points
    findPointC(A, B, d) {
        // Find the vector AB
        const AB = { x: B.x - A.x, y: B.y - A.y, z: B.z - A.z };
        
        // Find the length of AB
        const AB_length = Math.sqrt(AB.x ** 2 + AB.y ** 2 + AB.z ** 2);
        
        // Normalize the vector AB
        const AB_normalized = { x: AB.x / AB_length, y: AB.y / AB_length, z: AB.z / AB_length };
        
        // Find the vector AC
        const AC = { x: AB_normalized.x * d, y: AB_normalized.y * d, z: AB_normalized.z * d };
        
        // Find the point C by adding vector AC to point A
        const C = { x: A.x + AC.x, y: A.y + AC.y, z: A.z + AC.z };
        
        return C;
      }
}