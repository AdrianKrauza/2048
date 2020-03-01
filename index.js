let board = [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ];
let score = 0;
let bestScore = 0;

const style = {
	0: ['#CDC1B4', '#CDC1B4'],
	2: ['#EFE5DA', '#766C64'],
	4: ['#EDE0C8', '#766C64'],
	8: ['#F2B179', '#f9f6f2'],
	16: ['#F59563', '#f9f6f2'],
	32: ['#F67C5F', '#f9f6f2'],
	64: ['#F65E3B', '#f9f6f2'],
	128: ['#EDCF72', '#f9f6f2'],
	256: ['#EDCC61', '#f9f6f2'],
	512: ['#EDC850', '#f9f6f2'],
	1024: ['#E6BE38', '#f9f6f2'],
	2048: ['#E6BC28', '#f9f6f2'],

}
const box = document.querySelectorAll('#box');
const showBlock = () => {
	for (let i = 0; i < box[0].children.length; i++) {
		const element = box[0].children[i]
		const nr = board.flat()[i]
		element.classList = '';
		element.innerHTML = '';
		!board.flat()[i] || (element.innerHTML = nr);
		element.classList.add('blockNr' + nr);
		element.style.backgroundColor = style[nr][0]
		element.style.color = style[nr][1]
	}
};

const createBlock = () => {
	const b1 = Math.floor(Math.random() * board.length);
	const b2 = Math.floor(Math.random() * board[0].length);
	if (!(board.flat().find((Element) => !Element) !== 0))
		board[b1][b2] != 0 ? createBlock() : (board[b1][b2] = Math.random() < 0.9 ? 2 : 4);
};
const gameOver = document.querySelectorAll('#gameOver');
const end = () =>{
	TweenMax.to(gameOver, 1,{
		autoAlpha:1
	})
}
const finish = () => {
	// alert()
	let finish = [];

	const boardBack = JSON.parse(JSON.stringify(board));
	move('up', false);
	finish.push(board.flat().find((Element) => !Element) !== 0);
	board = JSON.parse(JSON.stringify(boardBack));
	move('right', false);
	finish.push(board.flat().find((Element) => !Element) !== 0);
	board = JSON.parse(JSON.stringify(boardBack));
	console.log(finish,"ds")
	return !(finish.find((Element) => !Element) == false);
};
const move = (directional, isFinish = true, isScore = true) => {
	let boardBack = JSON.parse(JSON.stringify(board));
	const block = (j, i) => board[j][i];
	const addBlock = (j, i, pos) => (board[j][i] += pos);
	const delBlock = (j, h) => (board[j][h] = 0);
	const connectionBlock = (d) => {
		const d1 = d == 'left' || d == 'up';
		const d2 = d == 'down' || d == 'up';
		for (let j = 0; j <= 3; j++) {
			for (let i = d1 ? 0 : 3; d1 ? i <= 3 : i >= 0; d1 ? i++ : i--) {
				for (h = i + (d1 ? 1 : -1); d1 ? h <= 3 : h >= 0; d1 ? h++ : h--) {
					if (
						block(d2 ? i : j, d2 ? j : i) === block(d2 ? h : j, d2 ? j : h) &&
						block(d2 ? i : j, d2 ? j : i) !== 0
					) {
						isScore && (score += block(d2 ? h : j, d2 ? j : h) * 2)
						addBlock(d2 ? i : j, d2 ? j : i, block(d2 ? h : j, d2 ? j : h));
						delBlock(d2 ? h : j, d2 ? j : h);
						break;
					} else if (block(d2 ? h : j, d2 ? j : h) != 0) break;
				}
			}
		}
	};
	const moveBlock = (d) => {
		const d1 = d == 'left' || d == 'up';
		const d2 = d == 'down' || d == 'up';
		for (let j = 0; j <= 3; j++) {
			for (let i = d1 ? 0 : 3; d1 ? i <= 3 : i >= 0; d1 ? i++ : i--) {
				if (block(d2 ? i : j, d2 ? j : i) == 0) {
					for (h = i; d1 ? h <= 3 : h >= 0; d1 ? h++ : h--) {
						if (block(d2 ? h : j, d2 ? j : h) != 0) {
							(!d2 && isFinish) && TweenMax.from(box[0].children[j * 4 + i], 0.09, {
								x: (i - h) * -100
							});
							(d2 && isFinish)  && TweenMax.from(box[0].children[i * 4 + j], 0.09, {
								y: (i - h) * -100
							});
							addBlock(d2 ? i : j, d2 ? j : i, block(d2 ? h : j, d2 ? j : h));
							delBlock(d2 ? h : j, d2 ? j : h);
							break;
						}
					}
				}
			}
		}
	};
	connectionBlock(directional);
	moveBlock(directional);

	(isFinish && finish()) && end() 
	showBlock();
	showScore()
	setTimeout(() => {
		board.flat().map((Element, index) => Element !== boardBack.flat()[index]).find((Element) => Element) &&
			createBlock();
		showBlock();
	}, 150);

};
let countdown = false;
const Countdown = () => {
	countdown = true;
	setTimeout(() => {
		countdown = false
	}, 150);
};
window.onkeyup = function (event) {
	if (!countdown) {
		let key = event.key.toUpperCase();
		if (key == 'W') {
			Countdown();
			move('up');
		} else if (key == 'S') {
			Countdown();
			move('down');
		} else if (key == 'A') {
			Countdown();
			move('left');
		} else if (key == 'D') {
			Countdown();
			move('right');
		}
	}
};
const Score = document.querySelector(`#score span`)
const BestScore = document.querySelector(`#bestScore span`)
const showScore = () => {
	if (score > bestScore) {
		bestScore = score
		BestScore.innerHTML = score
	}
	Score.innerHTML = score
}
const newGame = () => {
	TweenMax.to(gameOver, 1,{
		autoAlpha:0
	})
	score = 0
	showScore()
	board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
	createBlock();
	createBlock();
	createBlock();
	showBlock();
}
// 
newGame();