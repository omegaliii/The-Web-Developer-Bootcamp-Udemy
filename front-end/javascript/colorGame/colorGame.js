var numSquares = 6;
var colors = [];
var pickedColor;
var messageDisplay = document.querySelector("#message");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modes = document.querySelectorAll(".mode");


init();

function init(){
	setupMode();
	setupSquares();
	reset();
}

function setupMode(){
	for (var i = 0; i < modes.length; i++){
		modes[i].addEventListener("click", function(){
			modes[0].classList.remove("selected");
			modes[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
			reset();
		});
	}
}

function setupSquares(){
		for (var i=0; i<squares.length; i++){
		squares[i].addEventListener("click",function(){
			var clickColor = this.style.backgroundColor;

			if (clickColor === pickedColor){
				messageDisplay.textContent = "Correct";
				resetButton.textContent = "Play Again?";
				changeColor(pickedColor);
				h1.style.backgroundColor = pickedColor;
			}
			else{
				messageDisplay.textContent = "Try Again";
				this.style.backgroundColor = "#232323";
			}
		});
	}
}

function reset(){
	h1.style.backgroundColor = "#steelblue";
	colors = generateColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "new colors";
	messageDisplay.textContent = "";
	for (var i=0; i<squares.length; i++){
		if (colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
		
	}
}

resetButton.addEventListener("click", function(){
	reset();
});

function changeColor(color){
	for (var i=0; i<squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex];
}

function generateColors(num){
	var colors = [];
	for (var i=0; i<num; i++){
		colors[i] = randomColor();
	}

	return colors;
}

function randomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}




