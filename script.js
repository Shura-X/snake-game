
let canvas = document.querySelector('canvas'); 
let ctx = canvas.getContext('2d'); 

//console.log(canvas.width)
let f = 15;		//счётчик новых хвостов змейки
let x = 0;		//счётчик для итераций анимации

let snake = 2;

function drawIt() { 
	window.requestAnimationFrame(drawIt);  
 	ctx.clearRect(0,0,canvas.width,canvas.height); 
 	
 	ctx.fillStyle = 'red'//"#3b3b3b"; 
	ctx.fillRect(0, 0, 700, 500); 

	ctx.fillStyle = 'green';
	ctx.fillRect(100, 100, 50, 50)

	/*if (!snake) {
		snake = [
			ctx.fillRect(x, 50, 15, 15),
			ctx.fillRect(x+15, 50, 15, 15)
		];

		for (let i = 0; i < snake.length; i++) {
			snake[i]
		};
	}*/

	if (x > canvas.width) {
		x = 0;
		snake++;
	}

	//ctx.fillStyle = 'green';
	for (let i = 0; i < snake; i++) {
		ctx.fillRect(x+i*15, 50, 15, 15)
	}

  	x+=3;
}

//window.requestAnimationFrame(drawIt)