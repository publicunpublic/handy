<!DOCTYPE html>
<html>
<head>
	<title>Mouse Trail</title>
	<style>
		html, body {
			margin: 0;
			padding: 0;
			overflow: hidden;
			width: 100%;
			height: 100%;
		}
	</style>
</head>
<body>
	<canvas id="canvas"></canvas>
	<script>
		// Define variables
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var imgCount = 11; // Number of images to use
var imgPaths = []; // Array to store image paths
var imgIndex = 0; // Current image index
var trail = []; // Array to store trail positions
var trailLength = 10; // Number of trail positions to store
var trailSize = 50; // Size of trail image
var mouseX, mouseY; // Mouse coordinates

// Add canvas to page
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";
document.body.appendChild(canvas);

// Load images
for (var i = 0; i < imgCount; i++) {
  imgPaths.push("path/to/image_" + i + ".png");
}
var images = [];
var loadedImages = 0;
for (var i = 0; i < imgCount; i++) {
  images[i] = new Image();
  images[i].onload = function() {
    loadedImages++;
    if (loadedImages == imgCount) {
      requestAnimationFrame(draw);
    }
  };
  images[i].src = imgPaths[i];
}

// Handle mouse movements
document.addEventListener("mousemove", function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Handle touch events
document.addEventListener("touchmove", function(e) {
  e.preventDefault();
  var touch = e.changedTouches[0];
  mouseX = touch.clientX;
  mouseY = touch.clientY;
});

// Draw function
function draw() {
  // Clear canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Add current position to trail
  trail.push({
    x: mouseX,
    y: mouseY
  });
  if (trail.length > trailLength) {
    trail.shift();
  }

  // Draw trail
  for (var i = 0; i < trail.length; i++) {
    var img = images[(imgIndex + i) % imgCount];
    ctx.drawImage(img, trail[i].x - trailSize / 2, trail[i].y - trailSize / 2, trailSize, trailSize);
  }

  // Update image index
  imgIndex = (imgIndex + 1) % imgCount;

  // Request next frame
  requestAnimationFrame(draw);
}

	</script>
</body>
</html>
