// put setup code here
function setup() {
	//Create canvas
	var canvas = createCanvas(400, 400);
	//Get coordinates to place the canvas in the middle of the screen
	var canvasXPos = (windowWidth - width) / 2; //'windowWidth' and 'windowHeight' store thw width and hwight of the inner window
	var canvasYPos = (windowHeight - height) / 2; //The 'width' and' height' variables contain the width and height of the display window as defined by createCanvas()
	//Place the canvas in the middle of the screen
	canvas.position(canvasXPos, canvasYPos);

	background(255, 0, 200);


}

// put drawing code here
function draw() {

}

//p5 examples: https://p5js.org/examples/
//p5 reference: https://p5js.org/reference/

//Khan Academy Documentation: https://www.khanacademy.org/computing/computer-programming/pjs-documentation