var p1ScoreDispaly = document.querySelectorAll("span")[0];
var p2ScoreDispaly = document.querySelectorAll("span")[1];
var maxScoreDispaly = document.querySelectorAll("span")[2];
var inputMax = document.querySelector("input");
var p1Button = document.querySelectorAll("button")[0];
var p2Button = document.querySelectorAll("button")[1];
var resetButton = document.querySelectorAll("button")[2];
var p1Score=0;
var p2Score=0;
var maxScore=5;
var isWin=false;

inputMax.addEventListener("change", function(){
	maxScoreDispaly.textContent = this.value;
	maxScore = Number(this.value);
	reset();
});

p1Button.addEventListener("click", function(){
	if (p1Score < maxScore && !isWin){
		p1Score++;
		if (p1Score == maxScore){
			isWin = true;
			p1ScoreDispaly.style.color = "green";
		}
		p1ScoreDispaly.textContent = p1Score;
	}
});

p2Button.addEventListener("click", function(){
	if (p2Score < maxScore && !isWin){
		p2Score++;
		if (p2Score == maxScore){
			isWin = true;
			p2ScoreDispaly.style.color = "green";
		}
		p2ScoreDispaly.textContent = p2Score;
	}
});

resetButton.addEventListener("click", function(){
	reset();
});

function reset(){
	p1Score=0;
	p1ScoreDispaly.textContent = p1Score;
	p1ScoreDispaly.style.color = "black";
	p2Score=0;
	p2ScoreDispaly.textContent = p2Score;
	p2ScoreDispaly.style.color = "black";
	isWin=false;
}
