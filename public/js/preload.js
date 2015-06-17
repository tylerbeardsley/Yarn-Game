var preload = function(game){};

preload.prototype = {
	preload: function(){
		console.log("we are preloading");
		this.game.load.atlasJSONHash("atlas", "/images/LandTiles.png", 
                                     "/images/LandTiles.json");
    	this.game.load.bitmapFont("desyrel", 
                            "/images/phaserFonts/bitmapFonts/desyrel-pink.png", 
        					"/images/phaserFonts/bitmapFonts/desyrel-pink.xml");
    	this.game.load.image("white-rectangle", "/images/white-rectangle.png");
    	this.game.load.atlas("trixels", "/images/MemoryTrixelSprites.png", 
                             "/images/MemoryTrixelSprites.json");
    	this.game.load.image("arrow-up", "/images/arrow-button-up.png");
    	this.game.load.image("arrow-down", "/images/arrow-button-down.png");
    	this.game.load.image("save-map", "/images/newtrixel.png");
    	// This is where I can load a game title and 
        // display a loading bar preloaded in previous state
	},

	create: function(){
		this.game.state.start("GameTitle");
	}
};