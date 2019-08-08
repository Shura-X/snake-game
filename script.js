
let canvas = document.querySelector('canvas'); 
let ctx = canvas.getContext('2d'); 

//console.log(canvas.width)
let f = 15;		//счётчик новых хвостов змейки
let x = 0;		//счётчик для итераций анимации
let n = 50; 		//счётчик для изменений

let snake = [
	{ left: 50, top: 50 },
	{ left: 50, top: 50 }
];

let coords = null;


function drawIt() { 
	window.requestAnimationFrame(drawIt);  
 	ctx.clearRect(0,0,canvas.width,canvas.height); 
 	
 	ctx.fillStyle = "#3b3b3b"; 
	ctx.fillRect(0, 0, 700, 500); 

	ctx.fillStyle = 'green';

	/*if (!snake) {
		snake = [
			ctx.fillRect(x, 50, 15, 15),
			ctx.fillRect(x+15, 50, 15, 15)
		];

		for (let i = 0; i < snake.length; i++) {
			snake[i]
		};
	}*/

	if (snake[0].left > canvas.width) {
		x = 0;
		snake.push({
			left: 50,
			top: 50
		})
	}


	let run = function(i) {
		//if (snake[snake.length-1].left < 500) {
		snake[i].left = x + i * 15;
		x++

		//значения перезаписываются, потому что рни представлены ввиде объекта и имеют ссылочный тип

		if (snake[snake.length-1].left >= 500) {
			if (!coords) {
				coords = {};
				Object.assign(coords, snake[snake.length-1])
				console.log('changed')
			}

			//alert(coords.left)
			//console.log(coords.left)
			
			if (snake[i].left >= coords.left) {
				snake[i].left = coords.left;
				snake[i].top = n + i * 15;
			}
			n++
		}

	}

	/*document.body.addEventListener('keydown', function(e) {
		//alert(typeof e.which)
		let coords = snake[snake.length-1];

		switch (e.which) {

			case 40:
				console.log('case 40')
				run =  function(i) {
					let coords = snake[snake.length-1];
					console.log('snake started')
					run(i);
					if (coords.left <= snake[i].left) {
						snake[i].left = coords.left;
						snake[i].top = x + i * 15;
						console.log('direction changed')
					}
				}

		}

	});*/
	//run = fn

	//ctx.fillStyle = 'green';
	for (let i = 0; i < snake.length; i++) {
		//snake[i].left = x + i * 15
		run(i);
		ctx.fillRect(snake[i].left, snake[i].top, 15, 15)
	}

  	x++;

}

//window.requestAnimationFrame(drawIt)