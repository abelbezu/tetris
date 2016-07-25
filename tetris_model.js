var TetrisBoard = function(width, height){
	
	var _that = Object.create(TetrisBoard.prototype);
	var height = height;
	var width = width;
	var emptyBoard = function(){
		var zeros = [];
		for (var i = 0; i < height; i++) {
			var zero_row = []
			for (var j = 0; j < width; j++) {
				zero_row.push(0);
			}	
			zeros.push(zero_row)
		}
		return zeros;
	}

	// the board is initially an empty board with the given dimensions.
 	var board = emptyBoard();


 	// there is a representation exposure here.
 	_that.getBoard = function() {
 		return board;
 	}

 	//returns a copy of the board.
	_that.getBoardCopy = function(){
		return board.map(function(arr) {
		    return arr.slice();
		});
	}

 	// returns the empty board
	_that.getEmptyBoard = function(){
		return emptyBoard();
	}
	_that.displayPiece = function(piece, row, col){

	}
	// places tetris piece at the given position on the board.
	// mutates the board.
	_that.putPiece = function(piece, row, col) {
		var _piece_on_board = piece.translate(row, col);
		_piece_on_board.forEach(function(point){
			board[point[0]][point[1]] = 1;
		});
	}

	return _that;




}