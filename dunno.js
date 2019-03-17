var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
	window.setTimeout(callback, 1000 / 60);
};

var canvas = document.createElement("canvas");
var width = window.innerWidth - 4;
var height = window.innerHeight - 4;
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext("2d");
var pos = width;

var step = function () {
	ctx.fillStyle = "#000";
	ctx.fillRect(0,0,canvas.width, canvas.height);
	stars.forEach(function(star) {
		star.update(pos);
		star.render();
	});
	animate(step);
};

var stars = [];
for (var i = 0; i < (height * width) / 3250; i++) { // for having roughly the same amount of stars on any screen
	stars.push(new Star);
}


function Star() {
	this.x = Math.random() * width;
	this.y = Math.random() * (height + height / 2);
	this.radius = Math.random() * 4 + 1;
	this.speed = Math.random() * 7 + 3;
}

Star.prototype.update = function(x) {
	this.y -= this.speed * x / width;
	if (this.y < 0 - this.radius) {
		this.y = width + this.radius;
		this.x = Math.random() * width;
		// this.x = width + this.radius;
		// this.y = Math.random() * height;
		this.radius = Math.random() * 4 + 1;
		this.speed = Math.random() * 7 + 3;
	}
};

Star.prototype.render = function() {
	ctx.fillStyle = "#FFffFF";
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);	
	ctx.fill();
};

onmousemove = function(e){
	pos = width - e.clientX + 20;
}

document.addEventListener("DOMContentLoaded", function(event) { 
	document.body.appendChild(canvas);
	animate(step);
});