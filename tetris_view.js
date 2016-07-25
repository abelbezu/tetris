var TetrisView = function(){
	//Dom elements
    var _that = Object.create(TetrisView.prototype);
	var $container = $('#mainContainer');
	//renders the board represented by the given patter n.
	_that.renderBoard = function(board_array){
		board_array.forEach(function(row){
			var $row =  $('<div class = "tet_row"></div>');
			row.forEach(function(cell){
				if(cell === 0){
					var $cell = $('<span class = "tet_cell board"></span>');
				}
				else{
					var $cell = $('<span class = "tet_cell piece"></span>');
				}
				$row.append($cell);

			});
			$container.append($row);
		});
	}
    return _that;
	
	
};