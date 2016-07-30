var TetrisBoard = function(width, height){
    
    var _that = Object.create(TetrisBoard.prototype);
    var board = emptyBoard();
    var height = height;
    var width = width;
    var _current_pg;
    var _has_active_piece;
    var _current_state = getSafeCopy(board);

    function emptyBoard(){
        var zeros = [];
        for (var i = 0; i < height; i++) {
            var zero_row = []
            for (var j = 0; j < width; j++) {
                zero_row.push(0);
            }   
            zeros.push(zero_row);
        }
        return zeros;
    };

    //returns a copy of the board.
    function getSafeCopy(list){
        return list.map(function(arr) {
            return arr.slice();
        });
    }

    function canMove(direction){
        if(_current_pg.isActive()){
            var row = _current_pg.getPosition()[0];
            var col = _current_pg.getPosition()[1];
            var points = _current_pg.getPoints();
            var is_suspended = true;
            switch(direction) {
                    case 'down':
                        points.forEach(function(point){
                            is_suspended = is_suspended && _that.isOpenAt(point[0] + 1, point[1]);
                        });
                        break;
                    case 'left':
                        points.forEach(function(point){
                            is_suspended = is_suspended && _that.isOpenAt(point[0], point[1]-1);
                        });
                        break;
                    case 'right':
                        points.forEach(function(point){
                            is_suspended = is_suspended && _that.isOpenAt(point[0], point[1]+1);
                        });
                        break;
                    default:
                        is_suspended = false;
                        break;
            }
            
            return is_suspended;
        }
        return false;
        
    };

    //mutates the board
    function eraseSection(from_row, from_col, to_row, to_col, fill_with = 0){
        for(var i = from_row; i<=to_row; i++){
            for(var j = from_col; j <= to_col; j++){
                board[i][j] = fill_with;
                _current_state = _that.getBoardCopy();
            }
        }
    }

    function copySection(from_row, from_col, to_row, to_col, fill_with = 0){
        
        for(var i = from_row; i<=to_row; i++){
            for(var j = from_col; j <= to_col; j++){
                board[i][j] = fill_with;
                _current_state = _that.getBoardCopy();
            }
        }
    }

    _that.canMoveDown = function(){
        return canMove('down');
    };

    _that.canMoveLeft = function(){
        return canMove('left');
    };

    _that.canMoveRight = function(){
        return canMove('right');
    };

    function moveActivePiece(direction){
        if(_has_active_piece){
                var row = _current_pg.getPosition()[0];
                var col = _current_pg.getPosition()[1];
                switch(direction) {
                    case 'down':
                        _current_pg.translate(row+1, col);
                        break;
                    case 'left':
                        _current_pg.translate(row, col-1);
                        break;
                    case 'right':
                        _current_pg.translate(row, col+1);
                        break;
                    default:
                        break;
                }
                _current_state = _that.getCurrentBoard(row, col)
            }
        }

    //mutates the board
    _that.moveActivePieceDown = function(){
        moveActivePiece('down');
    };

    _that.moveActivePieceLeft = function(){
        moveActivePiece('left');
    }

    _that.moveActivePieceRight = function(){
        moveActivePiece('right');
    };

    _that.isActive = function(){
        return _has_active_piece;
    }
    
    _that.isFullRow = function(row){
        var _is_full = true;
        board[row].forEach(function(piece){
            _is_full = _is_full && piece === 1;
        });
        return _is_full;
    }

    _that.isOpenAt = function(row, col){
        var _is_in_hor_range = (0 <= col) && (col < width);
        var _is_in_ver_range = (0 <= row) && (row < height);
        var _is_in_range = _is_in_ver_range && _is_in_hor_range;

        return _is_in_range && board[row][col] === 0;
    }

    _that.getBoardCopy = function(){
        return getSafeCopy(board);
    };

    // returns the empty board
    _that.getEmptyBoard = function(){
        return emptyBoard();
    }

    _that.getCurrentBoard = function(){
        var copy = _that.getBoardCopy();
        _current_pg.currentForm().getPoints().forEach(function(point){
            copy[point[0]][point[1]] = 1;
        });
        return copy;
    }


    _that.translatePiece = function(row, col){
        if(_that.isOpenAt(row, col)){
            _current_pg.translate(row, col);
        }
    }
    _that.putPieceGroup = function(piece_group){
        _current_pg = piece_group;
        _has_active_piece = true;
    }

    
    // places tetris piece at the given position on the board.
    // mutates the board.
    _that.disolvePiece = function() {
        _current_pg.currentForm().getPoints().forEach(function(point){
            board[point[0]][point[1]] = 1;
        });
    }

    // calculates the next state of the board and changes the _current_state accordingly.
    _that.step = function(){
        var next_board = [];
        if(_has_active_piece){
            if(_that.canMoveDown()){
                _that.moveActivePieceDown();
            }
            else{
                _that.disolvePiece();
                _has_active_piece = false;
                _current_state = _that.getBoardCopy();
            }
            return true;
        }
        return false;
        
    }

    return _that;




}