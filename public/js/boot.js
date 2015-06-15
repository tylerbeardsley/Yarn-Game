var boot = function(game){
	console.log("%cThe Hex Grid is being started", "color:white; background:red");
};

boot.prototype = {
	preload: function(){
		console.log("Could add a loading image here");
		// this.game.load.image("loading", "/images/something.png");
	},

	create: function(){
		console.log("Can do scaling stuff in here");
		// this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// this.scale.setScreenSize();
		this.game.state.start("Preload");
	}
};