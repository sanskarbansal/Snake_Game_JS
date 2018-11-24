//To initialize the game;

var scoreDiv = document.getElementById("mydiv");

function init(){
	//init canvase into a var called canvas;
	    canvas = document.getElementById("m_game");
	//init pen into a var pen ;
	    pen = canvas.getContext('2d');
	//get the windows width and height and init that into the canvas ;
	    width = window.innerWidth - 100;
    	height = window.innerHeight -100;
	    canvas.width = width;
	    canvas.height = height;
    // make a food 
        food = getFood();
        game_over = false;
        score = 4;
        scoreDiv.innerHTML = "Score: " + score;
	// make an object called snake;
	snake = {
		init_len: 5,
		color: "blue",
		direction: "r", 
		cells:[], 
		createSnake: function(){
			for(var i=this.init_len-1; i >= 0; i--){
				this.cells.push({x:i, y:1});
			}
		}, 
		drawSnake: function(){
			for(var i = 0; i< this.cells.length; i++){
				pen.fillStyle = "black";
				pen.strokeStyle = "white";
				pen.lineWidth = 2;
				pen.strokeRect((this.cells[i].x+1)*40, this.cells[i].y*40, 40, 40);
				pen.fillRect((this.cells[i].x+1)*40, this.cells[i].y*40, 40, 40);
			}
		}, 
		updateSnake: function(){
			headX = this.cells[0].x;
			headY = this.cells[0].y;
			if(headX == food.x && headY == food.y){
				food = getFood();
				score++;
				scoreDiv.innerHTML = "Score: "+score;
			}else{
			    this.cells.pop();				
			}
			d = snake.direction;
			if(d == 'r'){
				this.cells.unshift({x: headX+1, y: headY});
			}else if(d == 'l'){
				this.cells.unshift({x: headX-1, y: headY});
			}else if(d == 'u'){
				this.cells.unshift({x: headX, y: headY-1});
			}else if(d == 'd'){
				this.cells.unshift({x: headX, y: headY+1});
			}
			var lastX = Math.round(width/40);
			var lastY = Math.round(height/40);
			if(headX < 0 || headY < 0 || headX > lastX || headY > lastY){
				game_over = true;
				alert("You Lose!");
			}
		}, 
	}
	snake.createSnake();
	document.addEventListener('keydown', function(e){
		if(e.keyCode==39 && snake.direction!= 'l'){
		    // Arrow Right
		    snake.direction = "r";
		}else if (e.keyCode == 40 && snake.direction != 'u') {
		    // Arrow Down	
		    snake.direction = "d";
		}else if(e.keyCode == 37 && snake.direction !='r'){
			//Arrow Left
			snake.direction = "l";

		}else if(e.keyCode == 38 && snake.direction != 'd'){
			//Arrow Up
			snake.direction = "u"
		}
	});
	//console.log('Init');
}

//Draw the updated positions of the snakes;
function draw(){
	pen.clearRect(0, 0, width, height);
	
	snake.drawSnake();
	pen.fillStyle = food.color;
	pen.fillRect(food.x*40, food.y*40, 40, 40);
	//console.log('Draw');
}

//Update the positions of the snakes ;
function update(){
	snake.updateSnake();
	//console.log('Update');
}

//Get Food at random position
function getFood(){
	var foodX = Math.round((Math.random()*(width-120))/40);
	var foodY = Math.round((Math.random()*(height-120))/40); 
	console.log(foodX*20);
	food = {
		x: foodX, y: foodY, color: 'white',
	};
	return food;
}

//Make a loop to run the game repedatly;
function gameLoop(){
	draw();
	update();
	if(game_over){
		clearInterval(interv);
	}
}


init();
speed = 100;

if(score%10 == 0){
	speed-=20;
}
var interv = setInterval(gameLoop, speed);