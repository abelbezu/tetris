p1 = Piece([[0,0],[0,1],[1,1],[2,1]], 0, 0);
p2 = Piece([[1,0],[1,1],[1,2],[0,2]], 0, 0);
p3 = Piece([[0,1],[1,1],[2,1],[2,2]], 0, 0);
p4 = Piece([[2,0],[1,0],[1,1],[1,2]], 0, 0);

var pg = PieceGroup(0, [p1, p2, p3, p4], 0, 0);
t = TetrisBoard(50, 50)
v = TetrisView();
t.putPieceGroup(pg);
function m(){
	pg.rotate();
	v.renderBoard(t.getCurrentBoard());
}

function n(){
	
	v.renderBoard(t.next());
}
setInterval(n, 400);

var L1 = Piece([[0,0],[0,1],[1,1],[2,1]], 0, 0);
var L2 = Piece([[1,0],[1,1],[1,2],[0,2]], 0, 0);
var L3 = Piece([[0,1],[1,1],[2,1],[2,2]], 0, 0);
var L4 = Piece([[2,0],[1,0],[1,1],[1,2]], 0, 0);

var L  = PieceGroup(0, [L1, L2, L3, L4], 10, 10);

t = TetrisBoard(20,20);
t.putPieceGroup(L);
v = TetrisView();


var r = function(){
 	if(t.canMoveRight()){
		t.moveActivePieceRight();
		v.renderBoard(t.getCurrentBoard());
	}
}

var l = function(){
	if(t.canMoveLeft()){
	t.moveActivePieceLeft();
	v.renderBoard(t.getCurrentBoard());}
}