var characterBuilder = function(game){};

characterBuilder.prototype = {
	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.setScreenSize(true);
		game.stage.backgroundColor = "#7d7d7d";
		
		character = game.add.sprite(document.body.offsetWidth/2, 
									document.body.offsetHeight/2, "character");
		character.anchor.x = 0.5;
		character.anchor.y = 0.5;
		character.scale.x = 0.5;
		character.scale.y = 0.5;

		stats = game.add.group();

		hitPointsTile = game.add.sprite(0, 0, "hitpoints");
		moveTile = game.add.sprite(0, 150, "move");
		rangeTile = game.add.sprite(0, 300, "range");
		defenseTile = game.add.sprite(0, 450, "defense");

		stats.add(hitPointsTile);
		stats.add(moveTile);
		stats.add(rangeTile);
		stats.add(defenseTile);
	}
}