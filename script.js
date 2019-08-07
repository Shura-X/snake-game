let canvas = document.querySelector('canvas'); 
let ctx = canvas.getContext('2d'); 

//console.log(canvas.width)

let x = 0;
function drawIt() { 
	window.requestAnimationFrame(drawIt);  
 	ctx.clearRect(0,0,canvas.width,canvas.height); 
 	
 	ctx.fillStyle = "#3b3b3b"; 
	ctx.fillRect(0, 0, 700, 500); 

	ctx.fillStyle = 'green';

	let snake = [
		ctx.fillRect(x, 50, 15, 15),
		ctx.fillRect(x+15, 50, 15, 15)
	]

	let f = 15;		//счётчик новых хвостов змейки
	if (x > canvas.width) {
		x = 0;
		f += 15;
		console.log( f );
		snake.push( ctx.fillRect(x+f, 50, 15, 15) );
		console.log(snake.length)
	}

	//ctx.snake[0]

	for (let i = 0; i < snake.length; i++) {
		snake[i]
	}

  	x+=2;
}

//window.requestAnimationFrame(drawIt)