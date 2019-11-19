// Adding rAF for smoother animation
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     || 
		function( callback ){
			window.setTimeout(callback, 1000 / 60);
		};
})();

// Basic canvas initialization
var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d");

var W = window.innerWidth,
		H = window.innerHeight,
		text = "I'm HOT!",
		skipCount = 4,
		gravity = 0.2,
		touched = false,
		mouse = {},
		minDist = 20,
		bounceFactor = 0.6;

canvas.height = H;
canvas.width = W;

document.addEventListener("mousemove", trackPos, false);

// We also need the mouse positions
function trackPos(e) {
	mouse.x = e.pageX;
	mouse.y = e.pageY;
}

// Creating a class for our particles
var Particle = function() {
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
		ctx.fillStyle = "rgba(255, 223, 0, " +this.a+")";
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

// We also need an array where are particles will be
var particles = [];

// Lets add some text on the canvas now
(function drawText() {
	ctx.fillStyle = "black";
	ctx.font = "100px Arial, sans-serif";
	ctx.textAlign = "center";
	ctx.fillText(text, W/2, H/2);
})();

// Now, we need to save the positions of black pixels and then 
// use these positions to draw the particles
(function getPixelPos() {
	// Here, we are using the getImageData function in 
	// which 3 values are returned. The width and height of
	// the image and the pixel data array. The data array is
	// width x height x 4 in size where the 4 depicts 4 values
	// for each pixel i.e. red, green, blue and alpha (RGBA).
	var imageData = ctx.getImageData(0, 0, W, W),
			data = imageData.data;
	
	// We'll now iterate over the data array going through
	// rows and columns
	// Instead of reading each pixel, we can skip over some
	// to increase the performance
	for (var i = 0; i < imageData.height; i += skipCount) {
		for (var j = 0; j < imageData.width; j += skipCount) {
			// The values in the data array rangle from 0 to
			// (height x width x 4) - 1 so we'll use that information
			// to get the color of each pixel
			
			var color = data[(j * imageData.width * 4) + (i * 4) - 1];
			
			// Now if the color is black, we'll do our stuff
			if(color == 255) {
				particles.push(new Particle());
				particles[particles.length - 1].setPos(i, j);
			}
		}
	}
})();

function clear() {
	ctx.clearRect(0, 0, W, H);
}

// Now for a twist, we'll make the particles fall when they 
// are hovered by mouse with realistic physics :) GRAVITY FTW!

// We'll do our animation stuff here
// Lets see if it works or not, it works! Time for some animation
function update() {
	clear();
	for (i = 0; i < particles.length; i++) {
		var p = particles[i];
		
		// For the burning effect, we'll increase the radius
		// of each particles whilst reducing its opacity.
		// As soon as the opacity goes below zero, we'll make the
		// particle reborn, LOVELY!
		p.r += 0.15;
		p.a -= 0.015;
			
		if(p.a < 0) {
			p.r = Math.random() * 6;
			p.a = Math.random();
		}
		
		// Logic for making them fall on hover 
		if(mouse.x > p.x - p.r && 
			 mouse.x < p.x + p.r &&
			 mouse.y > p.y - p.r &&
			 mouse.y < p.y + p.r)
			touched = true;
		
		//console.log(touched); // Working
		// We'll also make the nearby particles fall down
		// so we will need a minimum distance
		// We'll calculate the distance b/w mouse cursor
		// and the particles and then compare it with minDist
		
		if (touched == true) {
			var dist = Math.sqrt((p.x-mouse.x)*(p.x-mouse.x) + (p.y-mouse.y)*(p.y-mouse.y));
			
			if(dist <= minDist) 
				p.isFree = true;
			
			if(p.isFree == true) {
				// Add velocities and gravity
				p.y += p.vy;
				p.x += p.vx;
				
				// Take a moment and pause the codecast. Try hovering
				// particles and they'll fly away because no gravity 
				// is present, but it is still a cool effect ;)
				
				// Now they'll obey the rules of nature
				p.vy += gravity;
				
				// Note that particles go below the floor so we need
				// to make them bouncy and make them rebound as they
				// hit the floor and walls
				if(p.y + p.r > H) {
					p.vy *= -bounceFactor;
					p.y = H - p.r;
					
					// We also need a little friction on the floor
					// otherwise the particles will keep moving like
					// little ants :P
					if (p.vx > 0) 
						p.vx -= 0.1;
					else
						p.vx += 0.1;
				}
				
				// The codecast completes here. Try changing the colors
				// or size of particles and add your own text keywords!
				// Buh-bye :)
				
				// Collision with walls
				if(p.x + p.r > W) {
					p.vx *= -bounceFactor;
					p.x = W - p.r;
				}
				
				if (p.x - p.r < 0) {
					p.vx *= -bounceFactor;
					p.x = p.r;
				}
			}
		}
		
		ctx.globalCompositeOperation = "lighter";
		p.draw();
	}
}

(function animloop(){
	requestAnimFrame(animloop);
	update();
})();