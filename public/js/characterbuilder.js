var characterBuilder = function(game){};

characterBuilder.prototype = {
	create: function(){
		hitPointsVal = 1;
		moveVal = 0;
		rangeVal = 1;
		attackVal = 0;
		defenseVal = 0;
		totalStatPoints = 18;

		//data used to keep track of items and powers
		numPowers = 4;
		numItems = 5;
		powers = [
			"lightning trixel.png",
			"demonstar.png",
			"heart.png",
			"skull.png"
		];
		items = [
			"pokeball.png",
			"Sword.png",
			"steelsword.png",
			"beer.png",
			"healthpotion.png"
		];


		xOffset = 250;
		yOffset = 95;
		statTileScale = 0.7;

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.setScreenSize(true);
		game.stage.backgroundColor = "#7d7d7d";

		background = game.add.sprite(0, 0, "trixels", "starBackground.png");
		background.scale.setTo(1.5, 1.5);
		
		character = game.add.sprite(document.body.offsetWidth/2, 
									document.body.offsetHeight/2, "trixels", "cooldude.png");
		character.anchor.setTo(0.5, 0.5);
		character.scale.setTo(0.5, 0.5);

		stats = game.add.group();

		// Actual Tiles
		hitPointsTile = game.add.sprite(xOffset, 0, "trixels", "life.png");
		hitPointsTile.scale.setTo(statTileScale, statTileScale);
		hitPointsTile.anchor.setTo(0.5, 0.5);
		moveTile = game.add.sprite(xOffset, yOffset, "trixels", "move.png");
		moveTile.scale.setTo(statTileScale, statTileScale);
		moveTile.anchor.setTo(0.5, 0.5);
		rangeTile = game.add.sprite(xOffset, yOffset*2, "trixels", "range.png");
		rangeTile.scale.setTo(statTileScale, statTileScale);
		rangeTile.anchor.setTo(0.5, 0.5);
		attackTile = game.add.sprite(xOffset, yOffset*3, "trixels", "attack.png");
		attackTile.scale.setTo(statTileScale, statTileScale);
		attackTile.anchor.setTo(0.5, 0.5);
		defenseTile = game.add.sprite(xOffset, yOffset*4, "trixels", "defense.png");
		defenseTile.scale.setTo(statTileScale, statTileScale);
		defenseTile.anchor.setTo(0.5, 0.5);
		totalTile = game.add.sprite(xOffset, yOffset*5, "trixels", "redhex.png");
		totalTile.scale.setTo(statTileScale, statTileScale);
		totalTile.anchor.setTo(0.5, 0.5);

		stats.add(hitPointsTile);
		stats.add(moveTile);
		stats.add(rangeTile);
		stats.add(attackTile);
		stats.add(defenseTile);
		stats.add(totalTile);

		// Numbers in tiles that change
		var style = {font: "32px Arial", fill: "#ffffff", align: "center"};

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

		totalText = game.add.text(totalTile.x, totalTile.y + 5,
								  totalStatPoints.toString(), style);
		totalText.anchor.set(0.5);
		
		stats.add(hitPointsText);
		stats.add(moveText);
		stats.add(rangeText);
		stats.add(attackText);
		stats.add(defenseText);
		stats.add(totalText);

		// adds titles for stats
		hpTitle = game.add.bitmapText(hitPointsTile.x - 200, hitPointsTile.y, 
									  "desyrel", "Life:", 50);
		hpTitle.anchor.set(0.5);

		mTitle = game.add.bitmapText(moveTile.x - 200, moveTile.y, 
									  "desyrel", "Move:", 50);
		mTitle.anchor.set(0.5);

		rTitle = game.add.bitmapText(rangeTile.x - 200, rangeTile.y, 
									  "desyrel", "Range:", 50);
		rTitle.anchor.set(0.5);

		aTitle = game.add.bitmapText(attackTile.x - 200, attackTile.y, 
									  "desyrel", "Attack:", 50);
		aTitle.anchor.set(0.5);

		dTitle = game.add.bitmapText(defenseTile.x - 200, defenseTile.y, 
									  "desyrel", "Defense:", 50);
		dTitle.anchor.set(0.5);

		tTitle = game.add.bitmapText(totalTile.x - 200, totalTile.y, 
									  "desyrel", "Points:", 50);
		tTitle.anchor.set(0.5);

		stats.add(hpTitle);
		stats.add(mTitle);
		stats.add(rTitle);
		stats.add(aTitle);
		stats.add(dTitle);
		stats.add(tTitle);

		// creates plus and minus buttons for tiles
		for(var i = 0; i < 5; i++){
			var minusButton = game.add.button(xOffset-75, yOffset*i, "trixels",
											  this.decreaseStat, this, "minus.png", 
											  "minus.png", "minus.png", "minus.png");
			minusButton.scale.setTo(0.4, 0.4);
			minusButton.anchor.setTo(0.5, 0.5);
			minusButton.input.useHandCursor = true;

			var plusButton = game.add.button(xOffset+75, yOffset*i, "trixels",
										this.increaseStat, this, "plus.png",
										"plus.png", "plus.png", "plus.png");
			plusButton.scale.setTo(0.4, 0.4);
			plusButton.anchor.setTo(0.5, 0.5);
			plusButton.input.useHandCursor = true;

			stats.add(minusButton);
			stats.add(plusButton);
		}

		// centers stats on y axis
		//stats.x = character.x - xOffset*2 - 75;
		stats.x = 50;
		stats.y = character.y - yOffset*2.5;


		// Section for Powers, Items, Etc.
		powersAndItems = game.add.group();

		powersText = game.add.bitmapText(0, 0, "goldText", "Powers", 50);
		powersText.anchor.set(0.5);
		itemsText = game.add.bitmapText(0, 250, "goldText", "Items/Pets", 50);
		itemsText.anchor.set(0.5);

		powersAndItems.add(powersText);
		powersAndItems.add(itemsText);

		// Add power tiles
		for(var i = 0; i < numPowers; i++){
			var x = -100 + (75*i);
			var y = powersText.y + 80;
			var powerTile = game.add.button(x, y, "trixels", null, this, 
									powers[i], powers[i], powers[i], powers[i]);
			powerTile.anchor.setTo(0.5, 0.5);
			powerTile.scale.setTo(0.6, 0.6);
			powersAndItems.add(powerTile);
		}

		// Add item tiles
		for(var i = 0; i < numItems; i++){
			var x = -130 + (75*i);
			var y = itemsText.y + 80;
			var itemTile = game.add.button(x, y, "trixels", null, this, 
									items[i], items[i], items[i], items[i]);
			itemTile.anchor.setTo(0.5, 0.5);
			itemTile.scale.setTo(0.6, 0.6);
			powersAndItems.add(itemTile);
		}

		powersAndItems.x = document.body.offsetWidth - 220;
		powersAndItems.y = character.y - yOffset*2.5;

		// Add button to return to menu
		menuButton = game.add.button(0, document.body.offsetHeight, "trixels", this.menu, this, "d20.png", 
									 "d20.png", "d20.png", "d20.png");
		menuButton.anchor.setTo(0, 1);
		menuButton.input.useHandCursor = true;
		menuButton.fixedToCamera = true;
	},

	increaseStat: function(button){
		if(totalStatPoints > 0){
			if(button.y == yOffset*4){
				defenseVal++;
				totalStatPoints--;
				defenseText.text = defenseVal.toString();
				totalText.text = totalStatPoints.toString();
			}
			else if(button.y == yOffset*3){
				attackVal++;
				totalStatPoints--;
				attackText.text = attackVal.toString();
				totalText.text = totalStatPoints.toString();
			}
			else if(button.y == yOffset*2){
				rangeVal++;
				totalStatPoints--;
				rangeText.text = rangeVal.toString();
				totalText.text = totalStatPoints.toString();
			}
			else if(button.y == yOffset){
				moveVal++;
				totalStatPoints--;
				moveText.text = moveVal.toString();
				totalText.text = totalStatPoints.toString();
			}
			else if(button.y == 0){
				hitPointsVal++;
				totalStatPoints--;
				hitPointsText.text = hitPointsVal.toString();
				totalText.text = totalStatPoints.toString();
			}
		}

	},

	decreaseStat: function(button){
		if(button.y == yOffset*4){
			if(defenseVal > 0){
				defenseVal--;
				totalStatPoints++;
				defenseText.text = defenseVal.toString();
				totalText.text = totalStatPoints.toString();
			}
		}
		else if(button.y == yOffset*3){
			if(attackVal > 0){
				attackVal--;
				totalStatPoints++;
				attackText.text = attackVal.toString();
				totalText.text = totalStatPoints.toString();
			}
		}
		else if(button.y == yOffset*2){
			if(rangeVal > 1){
				rangeVal--;
				totalStatPoints++;
				rangeText.text = rangeVal.toString();
				totalText.text = totalStatPoints.toString();
			}
		}
		else if(button.y == yOffset){
			if(moveVal > 0){
				moveVal--;
				totalStatPoints++;
				moveText.text = moveVal.toString();
				totalText.text = totalStatPoints.toString();
			}
		}
		else if(button.y == 0){
			if(hitPointsVal > 1){
				hitPointsVal--;
				totalStatPoints++;
				hitPointsText.text = hitPointsVal.toString();
				totalText.text = totalStatPoints.toString();
			}
		}
	},

	menu: function(){
		//game.state.pause("Character");
		game.state.start("GameTitle", true, false);
	}
}