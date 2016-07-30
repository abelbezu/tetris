//represents a group of pieces. Each piece is a rotated form of the other.
var PieceGroup = function(base_form_index, pieces, col, row){

	var _that = Object.create(PieceGroup.prototype);
	var base_form = pieces[base_form_index];
	var _current_form_index = base_form_index;
	var _current_form = pieces[_current_form_index];
	var _row = row;
	var _col = col;

	//leakage
	_that.baseForm = function(){
		return base_form;
	};

	//mutates the group
	_that.rotate = function(board_width, board_height){ // uses board width and height to determine if rotation is possible there

		var _rotated_form_index = (_current_form_index + 1) % pieces.length;
		var _rotated_form = pieces[_current_form_index];
		if(_rotated_form.getLeftAt(_row, _col)[0][1] < 0){
			console.log('if cond');
		}
		else{
			_current_form_index = _rotated_form_index;
			_current_form = _rotated_form;
			console.log('else cond');
		}
	};

	_that.getPoints = function(){
		return _current_form.getPoints();
	}

	_that.getPosition = function(){
		return [_row, _col];
	}

	_that.isActive = function(){
		return _current_form.isActive();
	}
	_that.deactivate = function(){
		pieces.forEach(function(piece){
			piece.deactivate();
		});
	}

	//leakage risk
	_that.currentForm = function(){
		return _current_form;
	}

	_that.getBottom = function(){
		return _current_form.getBottomAt(_row, _col);
	}

	_that.getLeft = function(){
		return _current_form.getLeftAt(_row, _col);
	}

	_that.getRight = function(){
		return _current_form.getRightAt(_row, _col);
	}

	_that.pickRandom = function(){
		_current_form_index = Math.floor(Math.random()*pieces.length);
		_current_form = pieces[_current_form_index];
	}

	_that.translate = function(row ,col){
		var translated_pieces = [];
		pieces.forEach(function(piece){
			
			translated_pieces.push(piece.translate(row, col));
		});
		_row = row;
		_col = col;
		return translated_pieces;
	};

	return _that;

};