//!! MinMax
// // let depth = 0
// const MinMax = (board, depth, score,bestScore) => {

// 	for (let i = 0; i < 4; i++) {
// 		for (let j = 0; j < 4; j++) {
// 			for (let e = 0; e < 1; e++) {
// 				let boardBack = JSON.parse(JSON.stringify(board));

// 				let scoreBack = score
// 				if (e === 0) {
// 					// console.log(score,move('up',board, score))
// 					// console.log(board)
// 					score += move('up',board, score)
// 					// score += move('up', score);
// 				} else if (e === 1) {
// 					// console.log(board)
// 					score += move('down', board, score);
// 				} else if (e === 2) {
// 					score += move('left', board, score);
// 				} else if (e === 3) {
// 					score += move('right', board, score);
// 				}
// 				if (board[i][j] === 0 && depth <= 3) {
// 					board[i][j] = 2;
				
// 					// console.table(board);
		
// 					MinMax(board, depth + 1, score,bestScore);
// 					 board[i][j] = 0
// 					 if (bestScore < score){ 
// 						 bestScore = score
// 						//  console.log(depth,score,bestScore);
// 						}
// 					}
// 					board = JSON.parse(JSON.stringify(boardBack));
			
// 					// console.table(score);
		
// 					score = scoreBack 
		
// 			}
// 		}
// 	}
	
	
// };
// MinMax(board,depth = 0,score = 0,bestScore = 0)
