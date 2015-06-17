var preload = function(game){};

preload.prototype = {
	preload: function(){
		console.log("we are preloading");
        // images for game and menu
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
        
        // images for characterBuilder
        this.game.load.image("character", "/images/cooldude.png");
        this.game.load.image("hitpoints", "/images/CharacterTiles/life.png");
        this.game.load.image("move", "/images/CharacterTiles/move.png");
        this.game.load.image("range", "/images/CharacterTiles/range.png");
        this.game.load.image("attack", "/images/CharacterTiles/attack.png");
        this.game.load.image("defense", "/images/CharacterTiles/defense.png");
        this.game.load.image("plus", "/images/CharacterTiles/plus.png");
        this.game.load.image("minus", "/images/CharacterTiles/minus.png");
    	
	},

	create: function(){
		this.game.state.start("GameTitle");
	}
};