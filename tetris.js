$(function(){

    // GAME CONSTANTS
    //define pieces here
    // the L piece
    var L1 = Piece([[0,0],[0,1],[1,1],[2,1]], 0, 0);
    var L2 = Piece([[1,0],[1,1],[1,2],[0,2]], 0, 0);
    var L3 = Piece([[0,1],[1,1],[2,1],[2,2]], 0, 0);
    var L4 = Piece([[2,0],[1,0],[1,1],[1,2]], 0, 0);

    var L  = PieceGroup(0, [L1, L2, L3, L4], 0, 0);

    // the J piece
    var J1 = Piece([[0,1],[0,2],[1,1],[2,1]], 0, 0);
    var J2 = Piece([[1,0],[1,1],[1,2],[2,2]], 0, 0);
    var J3 = Piece([[0,2],[1,2],[2,2],[2,1]], 0, 0);
    var J4 = Piece([[1,0],[2,0],[2,1],[2,2]], 0, 0);

    var J  =  PieceGroup(0, [J1, J2, J3, J4], 0, 0);

    // the S piece
    var S1 = Piece([[0,0],[0,1],[1,1],[1,2]], 0, 0);
    var S2 = Piece([[0,2],[1,1],[1,2],[2,1]], 0, 0);

    var S  =  PieceGroup(0, [S1, S2], 0, 0);

    // the Z piece
    var Z1 = Piece([[0,1],[0,2],[1,0],[1,1]], 0, 0);
    var Z2 = Piece([[0,1],[1,1],[1,2],[2,2]], 0, 0);

    var Z  =  PieceGroup(0, [Z1, Z2], 0, 0);

    // the O piece

    var O1 = Piece([[0,1],[0,2],[1,1],[1,2]], 0, 0);

    var O  = PieceGroup(0, [O1], 0, 0);

    // the I piece 
    var I1 = Piece([[0,1], [1,1], [2,1], [3,1]], 0, 0);
    var I2 = Piece([[1,0], [1,1], [1,2], [1,3]], 0, 0);

    var I  = PieceGroup(0, [I1, I2], 0, 0);

    // the T piece
    var T1 = Piece([[1,0],[1,1],[1,2],[2,1]], 0, 0);
    var T2 = Piece([[0,1],[1,1],[2,1],[1,2]], 0, 0);
    var T3 = Piece([[0,1],[1,0],[1,1],[2,1]], 0, 0);
    var T4 = Piece([[0,1],[1,0],[1,1],[1,2]], 0, 0);

    var T  =  PieceGroup(0, [T4, T2, T1, T3], 0, 0);
    //
    var PIECES = [O, I, J, S, Z, T, L];
    var BOARD_WIDTH = 10;
    var BOARD_HEIGHT = 24
    TB = TetrisBoard(BOARD_WIDTH, BOARD_HEIGHT);
    var V = TetrisView();
    var FPS = 60;
    var ONE_SECOND = 1000;


    //game variables
    var current_pg =  PIECES[2] //getRandomElement(PIECES);
    var clk = 0; 
    var left_pressed = false;
    var right_pressed = false;
    var down_pressed = false;
    var game_freq = 40/2;
    var move_freq = 1;
    var paused = false;

    //events and event handlers
    var onLeftPressed = function(){
        if(TB.canMoveLeft()){
            TB.moveActivePieceLeft();
        };
    }
    var onRightPressed = function(){
        if(TB.canMoveRight()){
            TB.moveActivePieceRight();
        };
    }
    var onDownPressed = function(){
        if(TB.canMoveDown()){
            TB.moveActivePieceDown();
        };
    }


    $(document).on('keydown', function(e){
        if (e.keyCode === 37){ // left
            left_pressed = true;
        }
        else if(e.keyCode === 38){ // up
            current_pg.rotate();
        }
        else if(e.keyCode === 39){ // right
            right_pressed = true;
        }
        else if (e.keyCode === 40){ // down
            down_pressed = true;
        }
        if(e.keyCode == 32){
            console.log(paused);
            paused = !paused;
        }
    });

    $(document).on('keyup', function(e){
        if (e.keyCode === 37){ // left
            left_pressed = false;
        }
        else if(e.keyCode === 38){ // up
            
        }
        else if(e.keyCode === 39){ // right
            right_pressed = false;
        }
        else if (e.keyCode === 40){ // down
            down_pressed = false;
        }
    });



    //util
    function getRandomElement(list){
        var _random_index = Math.floor(Math.random()*list.length);
        return list[_random_index];
    }
    
    // body
    var init = function(){
        current_pg.translate(0, BOARD_WIDTH/2);
        TB.putPieceGroup(current_pg);
        V.renderBoard(TB.getCurrentBoard());

    }
    
    var update = function(clk){
        if(!paused){
            if(clk % move_freq == 0){
                if(left_pressed){
                    onLeftPressed();
                }
                if(right_pressed){
                    onRightPressed();
                }
                if(down_pressed){
                    onDownPressed();
                }
            }
            
            if(clk % game_freq == 0){
                if(TB.step()){
                    
                }
                else{
                    current_pg = getRandomElement(PIECES);
                    current_pg.translate(0, (BOARD_WIDTH)/2);
                    TB.putPieceGroup(current_pg);
                    
                }
            }
        }
    }

    var render = function(){
        V.renderBoard(TB.getCurrentBoard());    
    }

    
    init();
    // main game loop
    
    setInterval(function(){
        // console.log(clk);
        clk++;
        update(clk);
        render();
    }, ONE_SECOND/FPS);

});