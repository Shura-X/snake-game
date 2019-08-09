
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
let stage ='left';

let snake = {
	x: 50,
	y: 50,
	width: 120,
	height: 15,
};


let one = {};
/*let two = {
	width: 0,
	height: 0
};*/


let down = function() {
	/*
		код разбит на 3 этапа
		задача итератора - прийти, и сделать что-то с уже готовыми значениями
		поэтому нужно иметь 3 варианта функции:
		копирование значений в начале, 
		перерисовка значений в аватарах,
		движение змейки в штатном режиме
	*/

	if (stage == 'left' || stage == 'right') {
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

		//подготовка аватара к использованию 
		snake.width = 15; //
		snake.height = 0; //

		stage = 1	//важно! в конце каждого этапа менять статус

	} else if (stage === 1){			//сначало произвести расчёты.
											//a потоп уже отрисовывать змейку

		/*
		здесь постепенно уменньшается значение аватара предыдущей змейки 
		и увеличивается аватар нововй змейки
		*/
	
		snake.x = border-15; //
		snake.y = one.y; //

		snake.height+=counter; //
		one.x+=counter

		if (one.width > border - one.x) {
			one.width = border - one.x
		}

		ctx.fillRect(one.x, one.y, one.width, one.height);
		ctx.fillRect(snake.x, snake.y, snake.width, snake.height); //*4

		if (one.width <= 0) {
			/*
			когда ававтар старой змейки исчезает
			нужно остановить перерисовку и задать значение нового аватара змейке
			и остановить вторую фазу функции
			*/

			//for (let key in two) { snake[key] = two[key] }

			stage = 'down'	//важно! в конце каждого этапа менять статус
		}

	} else if (stage === 'down') {
		/*
		когда все преобразования выполнены
		выполнение переходит в штатный режим
		*/
		ctx.fillRect(snake.x, snake.y, snake.width, snake.height);
		snake.y+=counter
	}



	/*
	функция работает, поэтому по аналогии с этой функцией 
	надо сделать и остальные
	*/

}

let up = function() {
	if (stage == 'left' || stage == 'right') {
		border = snake.x + snake.width;

		for (let key in snake) {
			one[key] = snake[key]
		}

		ctx.fillRect(snake.x, snake.y, snake.width, snake.height);
		snake.x+=counter;

		//подготовка аватара к использованию 
		snake.width = 15; //
		snake.height = 0; //
		snake.y = one.y + 15; //

		stage = 1
	} else if (stage == 1) {

		snake.x = border-15; //
		//two.y = one.y;

		snake.y-=counter; //
		snake.height+=counter //
		//alert(`${two.y}, ${two.height}`)

		one.x+=counter;

		if (one.width > border - one.x) one.width = border - one.x;

		ctx.fillRect(one.x, one.y, one.width, one.height);
		ctx.fillRect(snake.x, snake.y, snake.width, snake.height); //*4

		//alert('')

		if (one.width <= 0) {
			//for (let key in two) { snake[key] = two[key] }

			stage = 'up'
		}
	} else if (stage == 'up') {
		ctx.fillRect(snake.x, snake.y, snake.width, snake.height);
		snake.y-=counter
	}
}

let left = function() {
	if (stage == 'up' || stage == 'down') {
		for (let key in snake) {
			one[key] = snake[key]
		}

		
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
		ctx.fillStyle = 'red';
		ctx.fillRect(0, snake.y, tail, snake.height);
		ctx.fillStyle = 'green';
		
		if (snake.x >= canvas.width) {
			snake.x = 0;
			snake.width += 30
		}

		/*let tail = {};
		for (let key in snake) {
			tail[key] = snake[key];
		}

		ctx.fillStyle = 'red';
		ctx.fillRect(tail.x, tail.y, tail.width, tail.height);
		tail.x+=counter;
 		ctx.fillStyle = '3b3b3b';
 		snake.x = 0;*/

 		//run = 
 		//snake.width = 0;


 		//snake.x = 10;
 	}

 	if (snake.y + snake.height > canvas.height) {
 		let tail = ( snake.y + snake.height ) - canvas.height;
 		ctx.fillStyle = 'red';
 		ctx.fillRect(snake.x, 0, snake.width, tail);
 		ctx.fillStyle = 'green';

 		if (snake.y >= canvas.height) {
 			snake.y = 0;
 		}



 	}

 	if (snake.y <= 0) {
 		let tail = 0 - snake.y
 		ctx.fillRect(snake.x, canvas.height - tail, snake.width, tail);

 		if (snake.y + snake.height <= 0) {
 			snake.y = canvas.height - snake.height
 		}
 	}

 	if (one.y <= 0) {
 		let tail = 0 - one.y
 		ctx.fillRect(one.x, canvas.height - tail, one.width, tail);

 		if (one.y + one.height <= 0) {
 			one.y = canvas.height - one.height
 		}
 	} 

	//ctx.fillStyle = 'green'; 



	let event = function(e) {

		switch (e.which) {
			case 40: 
				run = down;
				break;
			case 38:
				run = up;
				break;
		}

	}
	document.addEventListener('keydown', event)

	run()

  	time+=counter;

}

window.requestAnimationFrame(drawIt)
