var preload = function(game){};

preload.prototype = {
	preload: function(){
		this.game.load.atlasJSONHash("atlas", "/images/LandTiles.png", "/images/LandTiles.json");
    	this.game.load.bitmapFont("desyrel", "/images/phaserFonts/bitmapFonts/desyrel-pink.png", 
        						  "/images/phaserFonts/bitmapFonts/desyrel-pink.xml");
    	this.game.load.image("white-rectangle", "/images/white-rectangle.png");
    	// This is where I can load a game title and display a loading bar preloaded in previous state
	},

	create: function(){
		this.game.state.start("GameTitle");
	}
}