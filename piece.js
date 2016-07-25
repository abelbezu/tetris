// represents a single tetris piece. 
var Piece = function(array_of_points){

	var _that = Object.create(Piece.prototype);
	var _array_of_points = array_of_points;

	_that.translate = function(row ,col){
		var moved = [];
		array_of_points.forEach(function(point){
			moved.push([point[0] + row, point[1] + col]);
		});
		return moved;
	};

	return _that;

};