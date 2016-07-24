(function(){
	function render_board(){
		var $tet_outer = $('#tet_outer');
		for(var i = 0; i < 50; i++){
			
			var $tet_line_container = $('<li class = "tet_line_container"></li>');
			var $tet_line = $('<ul class = "tet_line"></ul>');
			for(var j = 0; j < 10; j++){
				var $tet_box = $('<li class = "tet_box"></li>');
				$tet_line.append($(tet_box));
			}
			$tet_line_container.append($tet_line);
			$tet_outer.append($tet_line_container);

		}


	}
})();