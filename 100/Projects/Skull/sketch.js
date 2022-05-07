//Custom random function since random() is not accessible outside p5s functions
function generateRandomNumber(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomHue(){
	//Return a random numnber between 0 and 300 for the hue
	return Math.floor(Math.random() * 301);
}

function getRandomSaturationOrBrightness(){
	//Return a random numnber between 30 and 100 for the saturation and brightness
	return Math.floor(Math.random() * (100 - 30 + 1) + 30);
}

//Arrays for HSB values
let H = [];
let S = [];
let B = [];

function colorBackground(){
	//Get random colors for the background
	const backgroundH = getRandomHue();
	const backgroundS = getRandomSaturationOrBrightness();
	const backgroundB = getRandomSaturationOrBrightness();
	//Add the background values to the HSB arrays
	H.push(backgroundH);
	S.push(backgroundS);
	B.push(backgroundB);
	//Color the background
	background(backgroundH, backgroundS, backgroundB);
}

function getRandomColor(){
	//Choose random HSB color values
	const randomH = getRandomHue();
	const randomS = getRandomSaturationOrBrightness();
	const randomB = getRandomSaturationOrBrightness();

	//Gap values - determines how different each piece of the puzzle must be from a similar color
	let hGap;
	const sGap = 35;
	const bGap = 15;
	
	//Check if the hue is green
	if(randomH >= 75 && randomH <= 170) //Green is roughly 75-170
	{
		//Larger hue comparison threshold for green colors
		hGap = 40;
	}
	else
	{
		//Regular hue comparison threshold
		hGap = 25;
	}

	for(let i = 0; i < H.length; i++)
	{
		//Compare each color
		const hDifference = abs(randomH - H[i]);
		const sDifference = abs(randomS - S[i]);
		const bDifference = abs(randomB - B[i]);

		if(hDifference <= hGap)
		{
			if(bDifference <= bGap)
			{
				if(sDifference <= sGap)
				{
					//Colors are too similar, get a new one
					getRandomColor();
					return;
				}
			}
		}
	}

	//Selected a color
	fill(randomH, randomS, randomB);
	//Add the new color to the color arrays
	H.push(randomH);
	S.push(randomS);
	B.push(randomB);
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

	//Eyes
	getRandomColor();
	const eyeWidth = 46;
	const eyeHeight = 42;
	const eyeSpacing = 10 + eyeWidth/2;
	ellipse(200 - eyeSpacing, craniumYPos, eyeWidth, eyeHeight);//left eye
	ellipse(200 + eyeSpacing, craniumYPos, eyeWidth, eyeHeight);//right eye

	//Nose
	getRandomColor();
	const noseSpacing = 2;
	const noseWidth = 12;
	const noseHeight = 25;
	const noseTop = craniumYPos + eyeHeight/2;
	triangle(200 - noseSpacing, noseTop, 200 - noseSpacing, noseTop + noseHeight, 200 - noseSpacing - noseWidth, noseTop + noseHeight);//Left nostril
	triangle(200 + noseSpacing, noseTop, 200 + noseSpacing, noseTop + noseHeight, 200 + noseSpacing + noseWidth, noseTop + noseHeight);//Right nostril

	//Teeth
	strokeWeight(2.8);
	const teethWidth = 24;
	const teethHeight = 49;
	const centerToothPosX = 200 - teethWidth/2;
	const teethYPos = jawLength - teethHeight * 1.5;
	const toothRoundness = 300;
	//Teeth loop
	getRandomColor();
	stroke(0, 0, 0);
	rect(200 - teethWidth/2, teethYPos, teethWidth, teethHeight, toothRoundness);
	for(let j = 1; j < 3; j++)
	{
	    getRandomColor();
	    stroke(0, 0, 0);
	    rect(centerToothPosX + teethWidth * j, teethYPos, teethWidth, teethHeight, toothRoundness);
	    getRandomColor();
	    stroke(0, 0, 0);
	    rect(centerToothPosX - teethWidth * j, teethYPos, teethWidth, teethHeight, toothRoundness);
	    stroke(0, 0, 0);
	}
	//Teeth seperator
	line(200 + teethWidth * 2 + teethWidth/2, teethYPos + teethHeight/2, 200 - teethWidth * 2 - teethWidth/2, teethYPos + teethHeight/2);
}

// put setup code here
function setup() {
	//Create canvas
	const canvas = createCanvas(400, 400);
	//Get coordinates to place the canvas in the middle of the screen
	const canvasXPos = (windowWidth - width) / 2; //'windowWidth' and 'windowHeight' store thw width and height of the inner window
	const canvasYPos = (windowHeight - height) / 2; //The 'width' and' height' variables contain the width and height of the display window as defined by createCanvas()
	//Place the canvas in the middle of the screen
	canvas.position(canvasXPos, canvasYPos);

	//Set the color mode to HSB
	colorMode(HSB, 360, 100, 100);

	//Color the background
	colorBackground();
	
	//Draw the skull
	drawSkull();


	//Can clear an array this way
	// H = [];
	// console.log(H);
}

// put drawing code here
function mouseClicked() {
	H = [];
	S = [];
	B = [];
	colorBackground();
	drawSkull();
}

//p5 examples: https://p5js.org/examples/
//p5 reference: https://p5js.org/reference/

//Khan Academy Documentation: https://www.khanacademy.org/computing/computer-programming/pjs-documentation