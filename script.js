
/*вариант 2:
	рисовать змейку не несколькими блокками, 
	а монолитным прямоугольником, 
	а при поворотах отрисовывать новый прямоугольник из точки события

	зы: делать в отдельной ветке
*/


let canvas = document.querySelector('canvas'); 
let ctx = canvas.getContext('2d'); 

let checker = false;	//чекер для "пищи"
let counter = 5;
let x, y;
//let square = {};

function random(max) {
  	return Math.floor(Math.random() * Math.floor(max));
}

let snake = [ {
	x: 50,
	y: 450,
	width: 120,
	height: 15,
	direction: 'right',//
} ];


let check_presence = function() {
	if (!checker) {
		x =	random(685);
		y = random(485);

		for (let i = 0; i < snake.length; i++) {
			if ( x > snake[i].x && x < snake[i].x + snake[i].width ||
				y > snake[i].y && y < snake[i].y + snake[i].height) {
				check_presence()			
			} else {
				return;
			}
		} 

		checker = true
	}
	//alert('none')
}


let run = function() {
	//console.log(snake.length)

	//последнее звено
	switch (snake[0].direction) {
		case 'right': //
			snake[0].x+=counter;
			snake[0].width-=counter;
			break;
		case 'top':
			snake[0].height-=counter;
			break;
		case 'down':
			snake[0].height-=counter;
			snake[0].y+=counter;
			break;
		case 'left':
			snake[0].width-=counter
			break;
	}

	//если звено уменьшилось достаточно, то удаляем его
	if (snake[0].width <= 0 || snake[0].height <= 0) {
		//alert('Left coordinate: ' + snake[0].x + ' width:' + snake[0].width)
		snake.shift();
		console.log(snake.length)
	}

	//переднее звено
	switch (snake[snake.length-1].direction) {
		case 'right': //
			snake[snake.length -1].width+=counter;
			break;
		case 'top':
			snake[snake.length-1].y-=counter;
			snake[snake.length-1].height+=counter;
			
			break;
		case 'down':
			snake[snake.length-1].height+=counter;
			
			break;
		case 'left':
			snake[snake.length-1].x-=counter;
			snake[snake.length-1].width+=counter;
			
			break;
	}
}



let push = function(key) {
	switch (key) {
		//down
		case 40:
			if (snake[snake.length-1].direction == 'right') { //
				snake.push( {
					x: snake[snake.length-1].width + snake[snake.length-1].x - 15,
					y: snake[snake.length-1].y,
					width: 15,
					height: 0,
					direction: 'down'
				} );
			} if (snake[snake.length-1].direction == 'left') {
				snake.push( {
					x: snake[snake.length-1].x,
					y: snake[snake.length-1].y,
					width: 15,
					height: 0,
					direction: 'down'
				} )
			}
			break;

		//top
		case 38:
			if (snake[snake.length-1].direction == 'right') { //
				snake.push( {
					x: snake[snake.length-1].width + snake[snake.length-1].x - 15,
					y: snake[snake.length-1].y + 15,
					width: 15,
					height: 0,
					direction: 'top'
				} )
			} if (snake[snake.length-1].direction == 'left') {
				snake.push( {
					x: snake[snake.length-1].x,
					y: snake[snake.length-1].y, //+ 15,
					width: 15,
					height: 0,
					direction: 'top'
				} )
			}
			break;

		//right
		case 39:
			if (snake[snake.length-1].direction == 'down') {
				snake.push( {
					x: snake[snake.length-1].x,
					y: snake[snake.length-1].y + snake[snake.length-1].height - 15,
					width: 0,
					height: 15,
					direction: 'right'
				} )
			} if (snake[snake.length-1].direction == 'top') {
				snake.push( {
					x: snake[snake.length-1].x,
					y: snake[snake.length-1].y,
					width: 0,
					height: 15,
					direction: 'right'
				} )
			}
			break;

		//left
		case 37:
			if (snake[snake.length-1].direction == 'down') {
				snake.push( {
					x: snake[snake.length-1].x + 15,
					y: snake[snake.length-1].y + snake[snake.length-1].height - 15,
					width: 0,
					height: 15,
					direction: 'left',
				} )
			} if (snake[snake.length-1].direction == 'top') {
				snake.push( {
					x: snake[snake.length-1].x + 15,
					y: snake[snake.length-1].y,
					width: 0,
					height: 15,
					direction: 'left'
				} )
			}
	}
}

let event = function(e) {
		push(e.which)
	}

	document.addEventListener('keydown', event)


function drawIt() { 
	window.requestAnimationFrame(drawIt);  
 	ctx.clearRect(0,0,canvas.width,canvas.height); 
 	
 	ctx.fillStyle = "#3b3b3b"; 
	ctx.fillRect(0, 0, 700, 500); 

	ctx.fillStyle = 'green';


	
	run();

	//right
	if (snake[snake.length-1].x + snake[snake.length-1].width >= canvas.width && snake[snake.length-1].direction == 'right') {
		snake.push( {
			x: 0,
			y: snake[snake.length-1].y,
			width: 0,
			height: 15,
			direction: snake[snake.length-1].direction
		} );
	}

	//left
	if ( snake[snake.length-1].x < 0 && snake[snake.length-1].direction == 'left') {
		//alert( snake[snake.length-1].x );
		snake.push( {
			x: canvas.width,
			y: snake[snake.length-1].y,
			width: 0,
			height: 15,
			direction: snake[snake.length-1].direction
		} );
		//alert('right')
		//alert( snake[snake.length-1].x );
		//alert( snake.length )
	}

	//down
	if (snake[snake.length-1].y + snake[snake.length-1].height >= canvas.height && snake[snake.length-1].direction == 'down') {
		snake.push( {
			x: snake[snake.length-1].x,
			y: 0,
			width: 15,
			height: 0,
			direction: snake[snake.length-1].direction,
		} )
	}

	//top
	if ( snake[snake.length-1].y <= 0 && snake[snake.length-1].direction == 'top') {
		snake.push( {
			x: snake[snake.length-1].x,
			y: canvas.height,
			width: 15,
			height: 0,
			direction: snake[snake.length-1].direction
		} );
	}




	/*if (!checker) {
		checker = true;
		x =	random(685);
		y = random(485);

		for (let i = 0; i < snake.length; i++) {
			if ( x > snake[i].x && x < snake[i].x + snake[i].width ||
				y > snake[i].y && y < snake[i].y + snake[i].height) {
				//alert('неверно')
			} 
		} 
	}*/

	check_presence()

	/*for (let i = 0; i < snake.length; i++) {
		if ( x > snake[i].x && x < snake[i].x + snake[i].width ||
			y > snake[i].y && y < snake[i].y + snake[i].height) {

		} 
	}*/

	/*if ( x > snake[snake.length-1].x && x < snake[snake.length-1].x + snake[snake.length-1].width ||
		y > snake[snake.length-1].x && y < snake[snake.length-1].y + snake[snake.length-1].height ) {
		if (snake[snake.length-1].direction == 'left' || snake[snake.length-1].direction == 'right') {
			snake[snake.length-1].width += 15;
		}
		if (snake[snake.length-1].direction == 'down' || snake[snake.length-1].direction == 'top') {
			snake[snake.length-1].height += 15
		}

		checker = false
		//check_presence
	}*/


	ctx.fillStyle = 'red';
	ctx.fillRect(x, y, 15, 15);
	ctx.fillStyle = 'green';



	for (let i = 0; i < snake.length; i++) {
		ctx.fillRect(snake[i].x, snake[i].y, snake[i].width, snake[i].height)
	}

}

window.requestAnimationFrame(drawIt)
