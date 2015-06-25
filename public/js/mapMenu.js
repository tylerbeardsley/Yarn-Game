var mapMenu = function(game){
	// Set a couple variables
	width = 25;
	height = 18;
};

mapMenu.prototype = {
	create: function(){
		var setGridSize = game.add.bitmapText(document.body.offsetWidth/2, 30, 
							"desyrel", "How Big Would You Like Your Map?", 45);
		setGridSize.anchor.setTo(0.5, 0.5);

		game.stage.backgroundColor = "#7d7d7d";

		// create play button to enter mapMaker
		var playButton = game.add.button(document.body.offsetWidth/2, 320, 
										"trixels", this.playTheGame, this,
										"mapmaker.png", "mapmaker.png", "mapmaker.png", 
										"mapmaker.png");
		playButton.anchor.setTo(0.5, 0.5);
		playButton.input.useHandCursor = true;

		// set up text for buttons
		widthText = game.add.text(document.body.offsetWidth/2 - 225, 150, 
								  "Width: " + width.toString(), 
			                      {font: "30px Arial", fill: "#000000"});
		widthText.anchor.set(0.5);

		heightText = game.add.text(document.body.offsetWidth/2 + 225, 150, 
								   height.toString() + " :Height", 
			                       {font: "30px Arial", fill: "#000000"});
		heightText.anchor.set(0.5);

		// buttons for width
		var arrowUp = game.add.button(document.body.offsetWidth/2 - 125, 120, "arrow-up");
		arrowUp.events.onInputDown.add(this.addOneW, this);
		arrowUp.anchor.setTo(0.5, 0.5);
		arrowUp.scale.x = 0.5;
		arrowUp.scale.y = 0.5;
		arrowUp.input.useHandCursor = true;
		var arrowDown = game.add.button(document.body.offsetWidth/2 - 125, 180, "arrow-down");
		arrowDown.events.onInputDown.add(this.subtractOneW, this);
		arrowDown.anchor.setTo(0.5, 0.5);
		arrowDown.scale.x = 0.5;
		arrowDown.scale.y = 0.5;
		arrowDown.input.useHandCursor = true;

		// buttons for height
		var arrowUpH = game.add.button(document.body.offsetWidth/2 + 125, 120, "arrow-up");
		arrowUpH.events.onInputDown.add(this.addOneH, this);
		arrowUpH.anchor.setTo(0.5, 0.5);
		arrowUpH.scale.x = 0.5;
		arrowUpH.scale.y = 0.5;
		arrowUpH.input.useHandCursor = true;
		var arrowDownH = game.add.button(document.body.offsetWidth/2 + 125, 180, "arrow-down");
		arrowDownH.events.onInputDown.add(this.subtractOneH, this);
		arrowDownH.anchor.setTo(0.5, 0.5);
		arrowDownH.scale.x = 0.5;
		arrowDownH.scale.y = 0.5;
		arrowDownH.input.useHandCursor = true;
	},

	playTheGame: function(){
		// width * 2 because game treats as two rows
		var mapTiles = [];
		for(var i = 0; i < width*height; i++){ // MIGHT NEED TO * 2 here
			mapTiles[i] = "rocktile.png";
		}
	    this.game.state.start("MapMaker", true, false, width * 2, height, mapTiles, "Cool Map");
	},

	addOneW: function(){
		if(width <= 30){
			width++;
		}
		widthText.text = "Width: " + width.toString();
	},

	subtractOneW: function(){
		if(width > 0){
			width--;
		}
		widthText.text = "Width: " + width.toString();
	},

	addOneH: function(){
		if(height <= 30){
			height++;
		}
		heightText.text = height.toString() + " :Height";
	},

	subtractOneH: function(){
		if(height > 0){
			height--;
		}
		heightText.text = height.toString() + " :Height";
	}
};