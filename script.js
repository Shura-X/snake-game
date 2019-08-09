
/*вариант 2:
	рисовать змейку не несколькими блокками, 
	а монолитным прямоугольником, 
	а при поворотах отрисовывать новый прямоугольник из точки события

	зы: делать в отдельной ветке
*/



let canvas = document.querySelector('canvas'); 
let ctx = canvas.getContext('2d'); 

let time = 0;		//счётчик для итераций анимации
let counter = 3;
let border;
let completed = 0;

let snake = {
	x: 50,
	y: 50,
	width: 30,
	height: 15,
};


let one = {};
let two = {
	width: 15,
	height: 15
};




let down = function() {
	/*
		код разбит на 3 этапа
		задача итератора - прийти, и сделать что-то с уже готовыми значениями
		поэтому нужно иметь 3 варианта функции:
		копирование значений в начале, 
		перерисовка значений в аватарах,
		движение змейки в штатном режиме
	*/

	if (completed == 0) {
		/*
		здесь копирование аватар змейки ( one )
		а также задаётся ограничение border
		*/

		border = snake.x + snake.width;

		for (let key in snake) {
			one[key] = snake[key]
		}

		ctx.fillRect(snake.x, snake.y, snake.width, snake.height);
		snake.x+=counter;

		completed = 1	//важно! в конце каждого этапа менять статус

	} else if (completed === 1){			//сначало произвести расчёты.
											//a потоп уже отрисовывать змейку

		/*
		здесь постепенно уменньшается значение аватара предыдущей змейки 
		и увеличивается аватар нововй змейки
		*/
	
		two.x = border-15,
		two.y = one.y

		two.height+=counter;
		one.x+=counter

		if (one.width > border - one.x) {
			one.width = border - one.x
		}

		ctx.fillRect(one.x, one.y, one.width, one.height);
		ctx.fillRect(two.x, two.y, two.width, two.height);

		if (one.width <= 0) {
			/*
			когда ававтар старой змейки исчезает
			нужно остановить перерисовку и задать значение нового аватара змейке
			и остановить вторую фазу функции
			*/

			for (let key in two) {
				snake[key] = two[key]
			}

			completed = true	//важно! в конце каждого этапа менять статус
		}

	} else if (completed === true) {
		/*
		когда все преобразования выполнены
		выполнение переходит в штатный режим
		*/
		ctx.fillRect(snake.x, snake.y, snake.width, snake.height);
		snake.y+=counter
	}

}



let run = function() {
	ctx.fillRect(snake.x, snake.y, snake.width, snake.height);
	snake.x+=counter
}




function drawIt() { 
	window.requestAnimationFrame(drawIt);  
 	ctx.clearRect(0,0,canvas.width,canvas.height); 
 	
 	ctx.fillStyle = "#3b3b3b"; 
	ctx.fillRect(0, 0, 700, 500); 

	ctx.fillStyle = 'green';

	
	if (snake.x + snake.width > canvas.width) {

		let tail = ( snake.x + snake.width ) - canvas.width;
		ctx.fillRect(0, snake.y, tail, snake.height);

		if (snake.x >= canvas.width) {
			snake.x = 0;
			snake.width += 15
		}
 	}


/*
	if (snake.x+snake.width >= 500) {
		let one = snake;
		let border = 500;
		run = null

		ctx.fillRect(one.x, one.y, one.width, one.height)
		one.x+=counter;
		if (one.width > border - one.x) {
			one.width =  border - one.x 
		}

		let two = {
			x: border-15,
			y: one.y,
			width: 15,
			height: 15
		}
		ctx.fillRect(two.x, two.x, two.width, two.height);
		two.height+=counter;

		if (one.width <= 0) {
			snake = two;
			run = function() {
				ctx.fillRect(snake.x, snake.y, snake.width, snake.height);
				snake.y+=counter
			}
		}

	}*/


	let event = function(e) {

		switch (e.which) {
			case 40: 
				run = down
		}

	}
	document.addEventListener('keydown', event)

	run()

  	time+=counter;

}

window.requestAnimationFrame(drawIt)
