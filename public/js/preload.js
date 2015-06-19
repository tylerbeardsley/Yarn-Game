var preload = function(game){};

preload.prototype = {
	preload: function(){
		console.log("we are preloading");
        // images for game and menu
        this.game.load.atlasJSONHash("atlas", "/images/LandTiles.png", "/images/LandTiles.js");
    	this.game.load.bitmapFont("desyrel", 
                            "/images/phaserFonts/bitmapFonts/desyrel-pink.png", 
        					"/images/phaserFonts/bitmapFonts/desyrel-pink.xml");
        this.game.load.bitmapFont("goldText",
                            "/images/phaserFonts/bitmapFonts/desyrel.png",
                            "/images/phaserFonts/bitmapFonts/desyrel.xml");
    	this.game.load.image("white-rectangle", "/images/white-rectangle.png");
    	this.game.load.image("arrow-up", "/images/arrow-button-up.png");
    	this.game.load.image("arrow-down", "/images/arrow-button-down.png");
    	this.game.load.image("save-map", "/images/newtrixel.png");
        
        // images for characterBuilder
        this.game.load.atlasJSONHash("trixels", "/images/CharacterStuff.png", "/images/CharacterStuff.js");
	},

	create: function(){
		this.game.state.start("GameTitle");
	}
};