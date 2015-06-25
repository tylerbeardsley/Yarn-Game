var menu = function(game){};

menu.prototype = {
	create: function(){
		var setGridSize = game.add.bitmapText(document.body.offsetWidth/2, 30, 
							"desyrel", "Welcome to the Void", 70);
		setGridSize.anchor.setTo(0.5, 0.5);

		var playButton = game.add.button(document.body.offsetWidth/2 + 200, 
										document.body.offsetHeight/2, 
										"trixels", this.playTheGame, this,
										"mapmaker.png", "mapmaker.png", "mapmaker.png", 
										"mapmaker.png");
		playButton.anchor.setTo(0.5, 0.5);
		playButton.scale.setTo(2, 2);
		playButton.input.useHandCursor = true;

		var characterButton = game.add.button(playButton.x - 400, document.body.offsetHeight/2, 
											  "trixels", this.buildCharacter, this,
											  "characterbuilder.png", "characterbuilder.png", 
											  "characterbuilder.png", "characterbuilder.png");
		characterButton.anchor.setTo(0.5, 0.5);
		characterButton.scale.setTo(2, 2);
		characterButton.input.useHandCursor = true;

		game.stage.backgroundColor = "#000000";
	},

	playTheGame: function(){
		// width * 2 because game treats as two rows
		var mapTiles = [];
		for(var i = 0; i < width*2*height; i++){
			mapTiles[i] = "rocktile.png";
		}
	    this.game.state.start("MapMenu", true, false);
	},

	buildCharacter: function(){
		this.game.state.start("Character", true, false);
	}
};