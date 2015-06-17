var characterBuilder = function(game){};

characterBuilder.prototype = {
	create: function(){
		totalStatPoints = 15;
		hitPointsVal = 1;
		moveVal = 0;
		rangeVal = 1;
		attackVal = 0;
		defenseVal = 0;

		xOffset = 250;
		yOffset = 95;
		statTileScale = 0.7;

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

		hitPointsTile = game.add.sprite(xOffset, 0, "hitpoints");
		hitPointsTile.scale.setTo(statTileScale, statTileScale);
		hitPointsTile.anchor.setTo(0.5, 0.5);
		moveTile = game.add.sprite(xOffset, yOffset, "move");
		moveTile.scale.setTo(statTileScale, statTileScale);
		moveTile.anchor.setTo(0.5, 0.5);
		rangeTile = game.add.sprite(xOffset, yOffset*2, "range");
		rangeTile.scale.setTo(statTileScale, statTileScale);
		rangeTile.anchor.setTo(0.5, 0.5);
		attackTile = game.add.sprite(xOffset, yOffset*3, "attack");
		attackTile.scale.setTo(statTileScale, statTileScale);
		attackTile.anchor.setTo(0.5, 0.5);
		defenseTile = game.add.sprite(xOffset, yOffset*4, "defense");
		defenseTile.scale.setTo(statTileScale, statTileScale);
		defenseTile.anchor.setTo(0.5, 0.5);

		stats.add(hitPointsTile);
		stats.add(moveTile);
		stats.add(rangeTile);
		stats.add(attackTile);
		stats.add(defenseTile);

		var style = {font: "32px Arial", fill: "#000000", align: "center"};

		hitPointsText = game.add.text(hitPointsTile.x, hitPointsTile.y, 
									 hitPointsVal.toString(), style);
		hitPointsText.anchor.set(0.5);

		moveText = game.add.text(moveTile.x, moveTile.y + 25, 
								 moveVal.toString(), style);
		moveText.anchor.set(0.5);

		rangeText = game.add.text(rangeTile.x, rangeTile.y + 25, 
								  rangeVal.toString(), style);
		rangeText.anchor.set(0.5);

		attackText = game.add.text(attackTile.x, attackTile.y + 25, 
								   attackVal.toString(), style);
		attackText.anchor.set(0.5);

		defenseText = game.add.text(defenseTile.x, defenseTile.y + 25, 
								 	defenseVal.toString(), style);
		defenseText.anchor.set(0.5);
		
		stats.add(hitPointsText);
		stats.add(moveText);
		stats.add(rangeText);
		stats.add(attackText);
		stats.add(defenseText);

		// creates plus and minus buttons
		for(var i = 0; i < 5; i++){
			var minusButton = game.add.button(xOffset-75, yOffset*i, "minus",
										this.decreaseStat, this);
			minusButton.scale.setTo(0.4, 0.4);
			minusButton.anchor.setTo(0.5, 0.5);
			minusButton.input.useHandCursor = true;

			var plusButton = game.add.button(xOffset+75, yOffset*i, "plus",
										this.increaseStat, this);
			plusButton.scale.setTo(0.4, 0.4);
			plusButton.anchor.setTo(0.5, 0.5);
			plusButton.input.useHandCursor = true;

			stats.add(minusButton);
			stats.add(plusButton);
		}

		// centers stats on y axis EXCEPT NOT REALLY
		stats.y = (document.body.offsetHeight/2) - stats.height/2;
	},

	increaseStat: function(button){
		if(totalStatPoints > 0){
			if(button.y == yOffset*4){
				defenseVal++;
				totalStatPoints--;
				defenseText.text = defenseVal.toString();
			}
			else if(button.y == yOffset*3){
				attackVal++;
				totalStatPoints--;
				attackText.text = attackVal.toString();
			}
			else if(button.y == yOffset*2){
				rangeVal++;
				totalStatPoints--;
				rangeText.text = rangeVal.toString();
			}
			else if(button.y == yOffset){
				moveVal++;
				totalStatPoints--;
				moveText.text = moveVal.toString();
			}
			else if(button.y == 0){
				hitPointsVal++;
				totalStatPoints--;
				hitPointsText.text = hitPointsVal.toString();
			}
		}

	},

	decreaseStat: function(button){
		if(button.y == yOffset*4){
			if(defenseVal > 0){
				defenseVal--;
				totalStatPoints++;
				defenseText.text = defenseVal.toString();
			}
		}
		else if(button.y == yOffset*3){
			if(attackVal > 0){
				attackVal--;
				totalStatPoints++;
				attackText.text = attackVal.toString();
			}
		}
		else if(button.y == yOffset*2){
			if(rangeVal > 1){
				rangeVal--;
				totalStatPoints++;
				rangeText.text = rangeVal.toString();
			}
		}
		else if(button.y == yOffset){
			if(moveVal > 0){
				moveVal--;
				totalStatPoints++;
				moveText.text = moveVal.toString();
			}
		}
		else if(button.y == 0){
			if(hitPointsVal > 1){
				hitPointsVal--;
				totalStatPoints++;
				hitPointsText.text = hitPointsVal.toString();
			}
		}
	}
}