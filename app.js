

//makes sure files are loaded before js runs.
$(document).ready(function(){
	
	//canvas information
	var canvas = $('#canvas')[0];
	var ctx = canvas.getContext("2d");
	var w = $('#canvas').width();
	var h = $('#canvas').height();


	//save the cell width in a variable for easy control
	var cw =10;
	var d;//default direction
	var food;
	var score;
	//Creating the snake game below
	var snake_array; // array of cells to make the snape

	function init() {
		d="right"; //default direction
		create_snake();
		create_food();

		score = 0;
		//lets move the snake using a timer which will trigger the paint function every 60ms
		if(typeof game_loop !="undefined")clearInterval(game_loop);
		game_loop = setInterval(paint,60);


	}
	init();
	

	function create_snake(){
		var length=5;//lenght of snake
		snake_array =[];

		for (var i = length - 1; i >= 0; i--) {
			//creates a horizontal snake
			snake_array.push({x:i,y:0});
		}
	}

	//lets create the food now
	function create_food(){
		food = {
			x:Math.round(Math.random()*(w-cw)/cw),
			y:Math.round(Math.random()*(h-cw)/cw),
		};
		//this will create a cell with x/y between 0-44
	}

	//paint the snake
	function paint(){
		//these allow the canvas to be painted
		ctx.fillStyle='white';
		ctx.fillRect(0,0,w,h);
		ctx.strokeStyle="black";
		ctx.strokeRect(0,0,w,h);

		//the movement code for the snake will be here
		//pop out the tail and place in front of the head cell
		var nx = snake_array[0].x;
		var ny = snake_array[0].y;

		//This was the position of the head cell
		//we will increment it to get the new head positions

		//lets add proper direction movements
		if(d=="right")nx++;
		else if(d=="left")nx--;
		else if(d=="up")ny--;
		else if(d=="down")ny++;

		//lets add game over clauses
		if(nx==-1|| nx==w/cw||ny == -1||ny==h/cw || check_collision(nx,ny,snake_array)){
			init();
			//will restart
			return;
		}
		if (nx==food.x && ny==food.y) {
			var tail = {x:nx,y:ny};
			score++;
			create_food();
		}else {
			var tail = snake_array.pop()
			tail.x = nx; tail.y=ny;
		}

		
		
		snake_array.unshift(tail); // puts back the tail as the first cell
		

		for (var i = 0; i < snake_array.length; i++) {
			var c = snake_array[i];
			//paint the 10px wide cells
			paint_cell(c.x,c.y);
			//lets paint the score
			var score_text = "Score: " + score;
			ctx.fillText(score_text,5,h-5);
		}

			//lets paint the food
			paint_cell(food.x,food.y);
	}

	//lets first create a generic function to paint cells
	function paint_cell(x,y){
		//paint the snake
		ctx.fillStyle = 'blue';
		ctx.fillRect(x*cw, y*cw, cw, cw );
		ctx.strokeStyle='white';
		ctx.strokeRect(x*cw, y*cw, cw, cw)
	}

	function check_collision(x,y,array) {
		for (var i = 0; i<array.length; i++) {
			if(array[i].x == x && array[i].y == y)
			return true;
		}
		return false;
	}

	//adding keyboard controls now
	$(document).keydown(function(e){
		var key = e.which;

		if(key == "37" && d!= "right") d = "left";
		else if(key == "38" && d!="down") d = "up";
		else if(key == "39" && d!="left") d = "right";
		else if(key == "40" && d!="up") d = "down";
		//snake is now keyboard controllabll
	})



	


})