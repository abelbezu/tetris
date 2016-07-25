//represents a group of pieces. Each piece is a rotated form of the other.
var PieceGroup = function(base_form_index, pieces){

	var _that = Object.create(PieceGroup.prototype);
	var base_form = pieces[base_form_index];
	var rotated_forms = rotated_forms;
	var _current_form = base_form_index;

	var _translate_form = function(row ,col){

	};

	_that.baseForm = function(){
		return baseForm;
	};

	_that.rotate = function(){
		_current_form = (_current_form + 1)%pieces.lengths;
		return pieces[_current_form];
	};

	_that.translate = function(row ,col){

	};

	return _that;

};