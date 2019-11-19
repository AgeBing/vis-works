var Particle = function(ctx) {
	this.r = Math.random() * 6;
	// Initial position will be out of canvas
	// but we'll set them later
	this.x = -100;
	this.y = -100;
	
	// Lets give each particle a different velocity
	this.vy = -5 + parseInt(Math.random() * 10);
	this.vx = -5 + parseInt(Math.random() * 10);
	
	// A flag to inform if the particle is free to fall or not
	this.isFree = false;
	
	this.a = Math.random();
	
	// Function to draw them
	this.draw = function() {
		ctx.beginPath();
		// Lets add random opacity
		// ctx.fillStyle = "rgba(255, 223, 0, " +this.a+")";
		ctx.fillStyle = "rgba(250, 84, 28, " +this.a+")";
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
		ctx.fill();
		ctx.closePath();
	};
		
	// Finally a function to set particle's function
	this.setPos = function(x, y) {
		this.x = x;
		this.y = y;
	}
};


export default Particle