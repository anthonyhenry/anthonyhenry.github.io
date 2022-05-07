// 9 colors min, 14 max
// 360/9 = 40
//
// H: 0-320 ; Diff: 
// S: 30-100 ; Diff: 60
// B: 40-100 ; Diff: 10

// function getRandomColor(){
// 	//Choose random HSB values
// 	var randomH = random(0, 320);
// 	var randomS = random(30, 100);
// 	var randomB = random(30, 100); change to 40 if needed

// 	const hDifference = 20;
// 	const sDifference = 30;
// 	const bDifference = 15;

// 	for(var i = 0; i < H.length; i++)
// 	{
// 		fill(randomH, randomS, randomB);

// 		//Hot[Hot.length] = randomH;
//         //Soggy[Soggy.length] = randomS;
//         //Boogers[Boogers.length] = randomB;
// 	}
// }

//Custom random function since random() is not accessible outside p5s functions
function generateRandomNumber(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomHue(){
	return Math.floor(Math.random() * 321);
}

function getRandomSaturation(){
	return Math.floor(Math.random() * (100 - 30 + 1) + 30);
}

function getRandomBrightness(){
	return Math.floor(Math.random() * (100 - 30 + 1) + 30);
}

function colorBackground(){
	//Get random colors for the background
	let backgroundH = getRandomHue();
	let backgroundS = getRandomSaturation();
	let backgroundB = getRandomBrightness();
	//Add the background values to the HSB arrays
	H.push(backgroundH);
	S.push(backgroundS);
	B.push(backgroundB);

	console.log("Background: " + backgroundH + ", " + backgroundS + ", " + backgroundB);
}

function getRandomColor(){
	//Choose random HSB color values
	let randomH = getRandomHue();
	let randomS = getRandomSaturation();
	let randomB = getRandomBrightness();

	//Gap values - determines how different each piece of the puzzle must be from a similar color
	let hGap;
	const sGap = 30;
	const bGap = 15;
	
	//Check if the hue is green
	if(randomH > 75 && randomH < 150) //Green is 75-170
	{
		//Larger comparison threshold for green colors
		hGap = 40;
	}
	else
	{
		//Regular comparison threshold
		hGap = 20;
	}

	for(var i = 0; i < H.length; i++)
	{
		//Compare each color
		let hDifference = abs(randomH - H[i]);
		let sDifference = abs(randomS - S[i]);
		let bDifference = abs(randomB - B[i]);
		
		if(hDifference > hGap)
		{
			//Set the fill
			fill(randomH, randomS, randomB);
			//Add the new color to the color arrays
			H.push(randomH);
			S.push(randomS);
			B.push(randomB);
			return;
		}
		else if(sDifference > sGap)
		{
			//Set the fill
			fill(randomH, randomS, randomB);
			//Add the new color to the color arrays
			H.push(randomH);
			S.push(randomS);
			B.push(randomB);
			return;
		}
		else if(bDifference > bGap)
		{
			//Set the fill
			fill(randomH, randomS, randomB);
			//Add the new color to the color arrays
			H.push(randomH);
			S.push(randomS);
			B.push(randomB);
			return;
		}
		else
		{
			//Try again
			getRandomColor();
			return;
		}
	}


}


function drawSkull(){

	//Set color
	getRandomColor();
	//Turn off stroke
	noStroke();

	//Cranium
	const craniumWidth = 190;
	const craniumYPos = 145;
	ellipse(200, craniumYPos, craniumWidth, craniumWidth - 30);

	//Cheeks
	const cheekYPos = craniumYPos + 63;
	const cheekWidth = craniumWidth - 15;
	ellipse(200, cheekYPos, cheekWidth, 90);

	//Jaw
	const topJawWidth = craniumWidth/3.5;
	const jawLength = craniumYPos + 153;
	const bottomJawWidth = craniumWidth/2.5;
	quad(200 - topJawWidth, craniumYPos, 200 + topJawWidth, craniumYPos , 200 + bottomJawWidth, jawLength, 200 - bottomJawWidth, jawLength);
}

//Arrays for HSB values
let H = [];
let S = [];
let B = [];


// put setup code here
function setup() {
	//Create canvas
	var canvas = createCanvas(400, 400);
	//Get coordinates to place the canvas in the middle of the screen
	var canvasXPos = (windowWidth - width) / 2; //'windowWidth' and 'windowHeight' store thw width and height of the inner window
	var canvasYPos = (windowHeight - height) / 2; //The 'width' and' height' variables contain the width and height of the display window as defined by createCanvas()
	//Place the canvas in the middle of the screen
	canvas.position(canvasXPos, canvasYPos);

	//Set the color mode to HSB
	colorMode(HSB, 360, 100, 100);

	//Get a random background color
	colorBackground();	
	//Set the background color
	background(H[0], S[0], B[0]);

	drawSkull();


	//Can clear an array this way
	// H = [];
	// console.log(H);

	

	// const circleDiameter = 50;
	// var xPos = circleDiameter / 2;
	// var yPos = circleDiameter /2;

	// var diff = ;

	// for(var j = 0; j < 15 ; j++)
	// {
	// 	if(j == ((100/diff) - 1))
	// 	{
	// 		// stroke(51);
	// 	}


	// 	var hueVal = (diff * j);
	// 	var randomS = 100;
	// 	var randomB = 100;

	// 	if(hueVal <= 320)
	// 	{
	// 		console.log(j + ": " + hueVal + ", " + randomS + ", " + randomB)

	// 		fill(hueVal, randomS, randomB);
	// 		circle((xPos * j) + 90 , (yPos * j) + 90, circleDiameter);
	// 	}
	// }
}

// put drawing code here
function draw() {

}

//p5 examples: https://p5js.org/examples/
//p5 reference: https://p5js.org/reference/

//Khan Academy Documentation: https://www.khanacademy.org/computing/computer-programming/pjs-documentation