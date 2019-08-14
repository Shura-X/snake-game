
/*
в этой ветке проверяеется 1 угол цели и 1 передний угол головы
задачи:
-сделать в разных директориях разные углы (не только х)
*/

let canvas = document.querySelector('canvas'); 
let ctx = canvas.getContext('2d'); 

let checker = false;	//чекер для "пищи"
let counter = 3;
let x, y;	//координаты для цели 
let angles;

function random(max) {
  	return Math.floor(Math.random() * Math.floor(max));
}


let snake = [ {
	x: 50,
	y: 50,
	width: 120,
	height: 15,
	direction: 'right',//
} ];


let check_presence = function() {
	if (!checker) {
		let count = 0;
		while (!checker) {
			x =	random(685);
			y = random(485);
			count++
		
			checker = true
			for (let i = 0; i < snake.length; i++) {
				ctx.rect(snake[i].x, snake[i].y, snake[i].width, snake[i].height)
				if ( ctx.isPointInPath(x, y) ) {
					checker = false
				} else if ( ctx.isPointInPath(x+15, y) ) {
					checker = false
				} else if ( ctx.isPointInPath(x, y+15) ) {
					checker = false
				} else if ( ctx.isPointInPath(x+15, y+15) ) {
					checker = false
				}
				ctx.clearRect(snake[i].x, snake[i].y, snake[i].width, snake[i].height)
			}
		} 

		if (!checker) alert('false')

		//cхема см блокнот
		//обънкт данных с координатами
		// вэтой ветке проверяет только один угол
		angles = {
			right: {
				x: x,
				y: y,
			},

			down: {
				x: x + 15,
				y: y,
			},

			left: {
				x: x + 15,
				y: y + 15,
			},

			top: {
				x: x,
				y: y + 15
			}
		}

		//alert(angles.right.x)
	}
}


let check_loop = function() {
	let last = snake[snake.length-1];

	
	for (let i = 0; i < snake.length-2; i++) {
		ctx.fillStyle = 'yellow';
		ctx.rect(snake[i].x, snake[i].y, snake[i].width, snake[i].height);

		/*
		идея правильная, реализация плохая. пересмотреть
		*/

		switch (last.direction) {
			case 'right':
				let right = last.x + last.width;	//расстояние от края до правой стороны

				if ( (right >= snake[i].x && right <= snake[i].x + snake[i].width) &&
				(last.y >= snake[i].y && last.y <= snake[i].y + snake[i].height) ) {
					//alert(last.x+last.width+1 + ', ' + last.y)
					//alert(snake[i].x + ', ' + snake[i].y + ', ' + snake[i].width + ', ' + snake[i].height);
					//ctx.fill()
					alert('You lose!')
					window.location.reload()
				} else if ( (right >= snake[i].x && right <= snake[i].x + snake[i].width) &&
				(last.y+15 >= snake[i].y && last.y+15 <= snake[i].y + snake[i].height) ) {
					//alert('test')//window.location.reload()
					alert('You lose!');
					window.location.reload()
				}
				break;

			case 'down':
				let down = last.y + last.height; //+ 1;

				if ( (down >= snake[i].y && down <= snake[i].y + snake[i].height) &&
				(last.x >= snake[i].x && last.x <= snake[i].x + snake[i].width) ) {
					alert('You lose!');
					window.location.reload()
				} else if ( (down >= snake[i].y && down <= snake[i].y + snake[i].height) &&
				(last.x+15 >= snake[i].x && last.x+15 <= snake[i].x + snake[i].width) ) {
					alert('You lose!');
					window.location.reload();
				}
				break;

			case 'top':
				if ( (last.y >= snake[i].y && last.y <= snake[i].y + snake[i].height) && 
					(last.x >= snake[i].x && last.x <= snake[i].x + snake[i].width) ) {
					alert('You lose!');
					window.location.reload()
				} else if ( (last.y >= snake[i].y && last.y <= snake[i].y + snake[i].height) && 
					(last.x+15 >= snake[i].x && last.x+15 <= snake[i].x + snake[i].width) ) {
					alert('You lose!');
					window.location.reload()
				}
				break;

			case 'left':

				if ( (last.x >= snake[i].x && last.x <= snake[i].x + snake[i].width) &&
					(last.y >= snake[i].y && last.y <= snake[i].y + snake[i].height) ) {
					alert('You lose!');
					window.location.reload()
				} else if ( (last.x >= snake[i].x && last.x <= snake[i].x + snake[i].width) &&
					(last.y+15 >= snake[i].y && last.y+15 <= snake[i].y + snake[i].height) ) {
					alert('You lose!');
					window.location.reload()
				}
				break;
		}
	}
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

//проверяет пересечения головной змеи с целью
let check_in = function() {
	//в этой ветке сравнивается угол головы с углом цели
	//ctx.rect( snake[snake.length-1].x, snake[snake.length-1].y, snake[snake.length-1].width, snake[snake.length-1].height );
	let last = snake[snake.length-1];

	//console.log(last.x + last.width);
	//console.log(angles.right.x)


	switch (snake[snake.length-1].direction) {
		//проверяет, есть ли точки угла в прямоугольнике змеи
		//предположение - ошибка в condition
		case 'right': 
			if ( ( last.x + last.width >= angles.right.x && last.x + last.width <= angles.right.x + 15 ) &&
			(last.y - angles.right.y < 15 && last.y - angles.right.y > -15) ) {								
				checker = false;
				snake[snake.length-1].width += 15;
			}
			break;

		case 'down': 
			if ( ( last.y + last.height >= angles.down.y && last.y + last.height <= angles.down.y + 15 ) &&
			(last.x + last.width - angles.down.x < 15 && last.x + last.width - angles.down.x > -15) ) {
				checker = false;
				snake[snake.length-1].height += 15;
			}
			break;

		case 'left': 
			if ( ( last.x <= angles.left.x && last.x >= angles.left.x - 15 ) &&
			(last.y + 15 - angles.left.y < 15 && last.y + 15 - angles.left.y > -15) ) {
				checker = false;
				snake[snake.length-1].width += 15;
				snake[snake.length-1].x -= 15;
			}
			break;

		case 'top':
			if ( ( last.y <= angles.top.y && last.y >= angles.top.y - 15 ) &&
			(last.x - angles.top.x < 15 && last.x - angles.top.x > -15) ) {
				checker = false;
				snake[snake.length-1].height += 15;
				snake[snake.length-1].y -= 15;
			}
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
					y: snake[snake.length-1].y+15,
					width: 15,
					height: 0,
					direction: 'down'
				} );
			} if (snake[snake.length-1].direction == 'left') {
				snake.push( {
					x: snake[snake.length-1].x,
					y: snake[snake.length-1].y+15,
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
					y: snake[snake.length-1].y, //+ 15,
					width: 15,
					height: 0,
					direction: 'top'
				} )
			} if (snake[snake.length-1].direction == 'left') {
				snake.push( {
					x: snake[snake.length-1].x,
					y: snake[snake.length-1].y, //+ 15, //+ 15,
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
					x: snake[snake.length-1].x+15,
					y: snake[snake.length-1].y + snake[snake.length-1].height - 15,
					width: 0,
					height: 15,
					direction: 'right'
				} )
			} if (snake[snake.length-1].direction == 'top') {
				snake.push( {
					x: snake[snake.length-1].x+15,
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
					x: snake[snake.length-1].x,
					y: snake[snake.length-1].y + snake[snake.length-1].height - 15,
					width: 0,
					height: 15,
					direction: 'left',
				} )
			} if (snake[snake.length-1].direction == 'top') {
				snake.push( {
					x: snake[snake.length-1].x,
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

	
	run();

	try {
		check_presence()

		if (!checker) throw new Error()
	} catch(e) {
		alert('false')
	}


	check_in()

	check_presence()



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


	check_loop()




	ctx.fillStyle = "#3b3b3b"; 
	ctx.fillRect(0, 0, 700, 500); 
	ctx.fillStyle = 'green';

	if (checker) {
		ctx.fillStyle = 'red';
		ctx.fillRect(x, y, 15, 15);
		ctx.fillStyle = 'green';
	}

	for (let i = 0; i < snake.length; i++) {
		ctx.fillRect(snake[i].x, snake[i].y, snake[i].width, snake[i].height)
	}

	//console.log(checker)
}

window.requestAnimationFrame(drawIt)
