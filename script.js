
/*вариант 2:
	рисовать змейку не несколькими блокками, 
	а монолитным прямоугольником, 
	а при поворотах отрисовывать новый прямоугольник из точки события

	зы: делать в отдельной ветке
*/



let canvas = document.querySelector('canvas'); 
let ctx = canvas.getContext('2d'); 

let time = 0;		//счётчик для итераций анимации
let n = 50; 			//счётчик для изменений

let snake = [
	{ left: 50, top: 50 },
	{ left: 50, top: 50 },
	{ left: 50, top: 50 },
];

let coords = null;

let down = function() {
	let a = 0;
	for (let i = 0; i < snake.length; i++) {
		if (snake[i].left >= coords.left) {
			snake[i].left = coords.left;
			snake[i].top = n + a * 15;
			//alert( snake[i].top )
			//a++
			alert(a)
		} else {
			snake[i].left = time + i * 15;
		}
		ctx.fillRect(snake[i].left, snake[i].top, 15, 15);
		a++;
	}
	//time+=1;
	n+=1
}

let run = function() {
	for (let i = 0; i < snake.length; i++) {
		snake[i].left = time + i * 15;
		ctx.fillRect(snake[i].left, snake[i].top, 15, 15);
	}
	//time+=1;
}




function drawIt() { 
	window.requestAnimationFrame(drawIt);  
 	ctx.clearRect(0,0,canvas.width,canvas.height); 
 	
 	ctx.fillStyle = "#3b3b3b"; 
	ctx.fillRect(0, 0, 700, 500); 

	ctx.fillStyle = 'green';

	if (snake[0].left > canvas.width) {
		time = 0;
		snake.push({
			left: 50,
			top: 50
		})
	}




	let event = function(e) {
		if (e.which != 40) return;

		coords = {};
		Object.assign(coords, snake[snake.length-1]);

		run = down;
	}

	document.body.addEventListener('keydown', event)



	

	run()

  	time+=1;

}

window.requestAnimationFrame(drawIt)
