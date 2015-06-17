var characterBuilder = function(game){};

characterBuilder.prototype = {
	create: function(){
		hitPointVal = 0;
		moveVal = 0;
		rangeVal = 0;
		attackVal = 0;
		defenseVal = 0;

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.setScreenSize(true);
		game.stage.backgroundColor = "#7d7d7d";
		
		character = game.add.sprite(document.body.offsetWidth/2, 
									document.body.offsetHeight/2, "character");
		character.anchor.setTo(0.5, 0.5);
		character.scale.setTo(0.5, 0.5);

		stats = game.add.group();

		hitPointsTile = game.add.sprite(250, 0, "hitpoints");
		hitPointsTile.scale.setTo(0.85, 0.85);
		moveTile = game.add.sprite(250, 120, "move");
		moveTile.scale.setTo(0.85, 0.85);
		rangeTile = game.add.sprite(250, 240, "range");
		rangeTile.scale.setTo(0.85, 0.85);
		attackTile = game.add.sprite(250, 360, "attack");
		attackTile.scale.setTo(0.85, 0.85);
		defenseTile = game.add.sprite(250, 480, "defense");
		defenseTile.scale.setTo(0.85, 0.85);

		stats.add(hitPointsTile);
		stats.add(moveTile);
		stats.add(rangeTile);
		stats.add(attackTile);
		stats.add(defenseTile);

		var style = {font: "32px Arial", fill: "#000000", align: "center"};

		hitPointText = game.add.text(hitPointsTile.width/2 + hitPointsTile.x, 
									 hitPointsTile.height/2 + hitPointsTile.y, 
									 hitPointVal.toString(), style);
		hitPointText.anchor.set(0.5);

		moveText = game.add.text(moveTile.width/2 + moveTile.x, 
								 moveTile.height/2 + moveTile.y, 
								 moveVal.toString(), style);
		moveText.anchor.set(0.5);

		rangeText = game.add.text(rangeTile.width/2 + rangeTile.x, 
								 rangeTile.height/2 + rangeTile.y, 
								 rangeVal.toString(), style);
		rangeText.anchor.set(0.5);

		attackText = game.add.text(attackTile.width/2 + attackTile.x, 
								   attackTile.height/2 + attackTile.y, 
								   attackVal.toString(), style);
		attackText.anchor.set(0.5);

		defenseText = game.add.text(defenseTile.width/2 + defenseTile.x, 
								 	defenseTile.height/2 + defenseTile.y, 
								 	defenseVal.toString(), style);
		defenseText.anchor.set(0.5);
		
		stats.add(hitPointText);
		stats.add(moveText);
		stats.add(rangeText);
		stats.add(attackText);
		stats.add(defenseText);

		// centers stats on y axis
		stats.y = (document.body.offsetHeight/2) - (stats.height/2);
	},

	increaseStat: function(num){
		num++;
		console.log("please work");
		//blah
		// adding a new change
	}
}