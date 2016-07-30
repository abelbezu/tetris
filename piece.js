// represents a single tetris piece. 
var Piece = function(array_of_points, row, col){

    var _that = Object.create(Piece.prototype);
    var _array_of_points = array_of_points;
    var _is_active = true;
    var _row = row;
    var _col = col;
    //mutates the piece
    _that.translate = function(row ,col){
        var moved = [];
        array_of_points.forEach(function(point){
            moved.push([point[0] + row, point[1] + col]);
        });
        _row = row;
        _col = col;
        return moved;
    };

    //returns a copy of the board.
    _that.getPieceCopy = function(){
        return _array_of_points.map(function(arr) {
            return arr.slice();
        });
    };

    //watch out for leakage here.
    _that.getPosition = function(){
        return [_row, _col];
    };

    //
    _that.getRawPoints = function(){
        return _that.getPieceCopy();
    };

    //
    _that.getPoints = function(){
        return _that.translate(_row, _col);
    }

    _that.isActive = function(){
        return _is_active;
    };

    _that.deactivate = function(){
        _is_active = false;
        delete _array_of_points;
    };

    _that.getLeftAt = function(row, col){
        var moved = _that.translate(row, col);
        var left = Infinity;
        moved.forEach(function(point){
            if (point[1] < left){
                left = point[1];
            }
            
        }); 
        var left_col = [];
        moved.forEach(function(point){
            if(point[1] === left){//if this point is on the bottom row
                left_col.push(point);
            }
        });
        return left_col;
    };

    _that.getRightAt = function(row, col){
        var moved = _that.translate(row, col);
        var right = 0;
        moved.forEach(function(point){
            if (point[1] > right){
                right = point[1];
            }
            
        }); 
        var right_col = [];
        moved.forEach(function(point){
            if(point[1] === right){//if this point is on the bottom row
                right_col.push(point);
            }
        });
        return right_col;
    };

    _that.getBottomAt = function(row, col){
        var moved = _that.translate(row, col);
        var bottom = 0;
        moved.forEach(function(point){
            if (point[0] > bottom){
                bottom = point[0];
            }
            
        }); 
        var bottom_row = [];
        moved.forEach(function(point){
            if(point[0] === bottom){//if this point is on the bottom row
                bottom_row.push(point);
            }
        });
        return bottom_row;
    }

    _that.getBottom = function(){
        return _that.getBottomAt(_row, _col);
    }
    return _that;

};
