var theGame = function(game){};

theGame.prototype = {
	init: function(width, height, theMap, nameID){
		hexagonWidth = 109; // actual size is 111 but that shows hex outline
		hexagonHeight = 127; // actual size is 128
		gridSizeX = width; // actually counts number of hexes by pairs of rows
		gridSizeY = height;  // actual number of rows
		columns = [Math.ceil(gridSizeX/2),Math.floor(gridSizeX/2)];
		moveIndex = 0;
		sectorWidth = hexagonWidth;
		sectorHeight = hexagonHeight/4*3;
		gradient = (hexagonHeight/4)/(hexagonWidth/2);
		mapTiles = theMap;
		mapName = nameID; // used to identify map
		paintTile = null;
		hexagonGroup = null;
		paletteText = "";
		paletteBackground = null;
		paletteGroup = null;
		palettePanel = -1; // keeps track of which panel number to display for palette tiles
		saveButton = null;
		scaleFactor = 0.75; // Defaults at 0.75 but can change with scroll zoom
	},

	create: function(){
		// prevents right click popups
		game.canvas.oncontextmenu = function (e) {e.preventDefault();};

		// zoom function
		game.input.mouse.mouseWheelCallback = this.zoom;

		game.camera.bounds = null; // no bounds for camera
	    hexagonGroup = game.add.group();
	    hexagonGroup.scale.x = scaleFactor;
	    hexagonGroup.scale.y = scaleFactor;
	    game.stage.backgroundColor = "#000000";

	    //add all map tiles
	    var index = 0;
	    for(var i = 0; i < gridSizeY/2; i ++){
	        for(var j = 0; j < gridSizeX; j ++){
	            if(gridSizeY%2==0 || i+1<gridSizeY/2 || j%2==0){
	                var hexagonX = (hexagonWidth * j)/2;
	                var hexagonY = hexagonHeight*i*1.5+(hexagonHeight/4*3)*(j%2);
	                var hexagon = game.add.button(hexagonX, hexagonY, "atlas", 
	                			  null, this, mapTiles[index], mapTiles[index], 
	                			  mapTiles[index], mapTiles[index]);
	                hexagon.events.onInputOver.add(this.paint, this); // handles click and hold
	                hexagon.events.onInputDown.add(this.paint, this); // handles click
	                hexagon.input.useHandCursor = false;
	                hexagonGroup.add(hexagon);
	                index++;
	            }
	        }
	    }

	    // add painting tile
	    paintTile = game.add.sprite(0,0,"atlas");
	    paintTile.frameName = "clouds.png";
	    paintTile.anchor.setTo(0.5);
	    paintTile.visible = false;
	    hexagonGroup.add(paintTile);

	    // CREATE FONT
	    paletteText = game.add.bitmapText(-40, 30, "desyrel", "Tile Palette", 60);

	    // CREATE Pallete
	    paletteGroup = game.add.group();
	    paletteBackground = game.add.button(-55,-20,"white-rectangle", null, this);
	    paletteBackground.scale.x = 1.3;
	    paletteBackground.scale.y = 2;
	    paletteGroup.add(paletteBackground);
	    paletteGroup.add(paletteText);
	    paletteGroup.scale.x = scaleFactor;
	    paletteGroup.scale.y = scaleFactor;

	    // Place different land tiles on palette
	    // create buttons to change panel display
	    nextPanel = game.add.button(160, 100, "trixels", this.placePaletteTiles, 
	    				this, "plus.png", "plus.png", "plus.png", "plus.png");
	    nextPanel.scale.setTo(0.3, 0.3);
	    nextPanel.input.useHandCursor = true;
	    previousPanel = game.add.button(40, 100, "trixels", this.placePaletteTiles, 
	    				this, "minus.png", "minus.png", "minus.png", "minus.png");
	    previousPanel.scale.setTo(0.3, 0.3);
	    previousPanel.input.useHandCursor = true;

	    // intialize palette
	    this.placePaletteTiles(nextPanel);

	    paletteGroup.add(nextPanel);
	    paletteGroup.add(previousPanel);

	    paletteGroup.fixedToCamera = true; // keeps palette in correct position
	    paletteGroup.cameraOffset.x = game.camera.width - 200;

	    saveButton = game.add.button(game.camera.width/2 - 150, 
	    			  game.camera.height - 130, "save-map", this.saveMap, this);
	    saveButton.fixedToCamera = true;
	    saveButton.input.useHandCursor = true;

	    // Add menu button to return to menu
	    menuButton = game.add.button(0, document.body.offsetHeight, "trixels", 
	    							 this.menu, this, "d20.png", 
									 "d20.png", "d20.png", "d20.png");
		menuButton.anchor.setTo(0, 1);
		menuButton.input.useHandCursor = true;
		menuButton.fixedToCamera = true;

		// Add load map button
		loadMapButton = game.add.button(hexagonWidth + 20, document.body.offsetHeight, 
										"trixels", this.loadMap, this, "redhex.png",
										"redhex.png", "redhex.png", "redhex.png");
		loadMapButton.anchor.setTo(0,1);
		loadMapButton.input.useHandCursor = true;
		loadMapButton.fixedToCamera = true;
	},

	update: function(){
	    moveIndex = game.input.addMoveCallback(this.checkHex, this);

	    // right click and drag to move camera
	    if(game.input.mousePointer.isDown && game.input.mouse.button == 2){
	    	if (game.origDragPoint){
	    		game.camera.x += game.origDragPoint.x - game.input.activePointer.position.x;
	    		game.camera.y += game.origDragPoint.y - game.input.activePointer.position.y;
	    	}
	    	game.origDragPoint = game.input.activePointer.position.clone();
	    }
	    else{
	    	game.origDragPoint = null;
	    }
	},

	checkHex: function(){
	    var candidateX = Math.floor((game.input.worldX/scaleFactor-hexagonGroup.x)/sectorWidth);
	    var candidateY = Math.floor((game.input.worldY/scaleFactor-hexagonGroup.y)/sectorHeight);
	    var deltaX = (game.input.worldX/scaleFactor-hexagonGroup.x)%sectorWidth;
	    var deltaY = (game.input.worldY/scaleFactor-hexagonGroup.y)%sectorHeight; 
	    if(candidateY%2==0){
	        if(deltaY<((hexagonHeight/4)-deltaX*gradient)){
	            candidateX--;
	            candidateY--;
	        }
	        if(deltaY<((-hexagonHeight/4)+deltaX*gradient)){
	            candidateY--;
	        }
	    }    
	    else{
	        if(deltaX>=hexagonWidth/2){
	            if(deltaY<(hexagonHeight/2-deltaX*gradient)){
	                candidateY--;
	            }
	        }
	        else{
	            if(deltaY<deltaX*gradient){
	                candidateY--;
	            }
	            else{
	                candidateX--;
	            }
	        }
	    }
	    // this call is used to display paint tile
	    this.placePaintTile(candidateX,candidateY);
	},

	// may or may not want this - needs testing to see if people like seeing the paint tile
	placePaintTile: function(posX,posY){
	    if(posX<0 || posY<0 || posY>=gridSizeY || posX>columns[posY%2]-1){
	        paintTile.visible=false;
	    }
	    else{
	        paintTile.visible=true;
	        paintTile.x = hexagonWidth*posX;
	        paintTile.y = hexagonHeight/4*3*posY+hexagonHeight/2;
	        if(posY%2==0){
	            paintTile.x += hexagonWidth/2;
	        }
	        else{
	            paintTile.x += hexagonWidth;
	        }
	    }
	},

	// NEED TO SET LIMIT TO PALETTE PANEL NUMBER
	placePaletteTiles: function(button){
		if(button.frameName == "plus.png"){
			palettePanel++;
		}
		else if(button.frameName == "minus.png"){
			if(palettePanel > 0){
				palettePanel--;
			}
		}
		if(palettePanel > -1){
			var index = 0 + (8*palettePanel);
		    var xCor = 0;
		    var yCor = 30;
			for(var i = 0; i < 8; i++){
		    	if(i % 2 == 0){
		    		xCor = 0;
		    		yCor += hexagonHeight + 5;
		    	}
		    	else{
		    		xCor = hexagonWidth + 10;
		    	}
		    	var tile = game.add.button(xCor, yCor, "atlas", this.changePaint, 
		    							   this, index, index, index, index);
		        tile.input.useHandCursor = true;
		        paletteGroup.add(tile);
		        index++;
		    }
		}
	},

	changePaint: function(tile){
	    paintTile.frameName = tile.frameName;
	},

	paint: function(tile){
    	// Checks for click and drag painting
    	if(game.input.mousePointer.isDown && game.input.mouse.button == 0){
        	tile.setFrames(paintTile.frameName, paintTile.frameName, 
        				   paintTile.frameName, paintTile.frameName);
    	}
	},

	zoom: function(){
		if(game.input.mouse.wheelDelta == Phaser.Mouse.WHEEL_UP){
			// zoom in
			hexagonGroup.scale.x += 0.05;
			hexagonGroup.scale.y += 0.05;
			scaleFactor += 0.05;
		}
		else if(game.input.mouse.wheelDelta == Phaser.Mouse.WHEEL_DOWN){
			hexagonGroup.scale.x -= 0.05;
			hexagonGroup.scale.y -= 0.05;
			scaleFactor -= 0.05;
		}
	},

	saveMap: function(){
		// SAVE MAP
		var index = 0;
		hexagonGroup.forEach(function(button){
			mapTiles[index] = button.frameName;
			index++;
		}, this, true);

		// ask for map name
		mapName = prompt("Enter your map name", mapName);

		$.post("/map/button/add", {name: mapName, tiles: mapTiles, 
								   width: gridSizeX/2, height: gridSizeY});
		alert("Your map titled \""+mapName+"\" has been saved!");
	},

	loadMap: function(){
		var searchName = ""; 
		searchName = prompt("What map would you like to load?", mapName);
		$.getJSON("/map/button/load", {name: searchName}, function(data){
	    	var width = data.width*2;
	    	var height = data.height;
	    	var mapTiles = data.tiles;
	    	var name = data.name;
	    	game.state.start("TheGame", true, false, width, height, mapTiles, name);
	    });
	},

	menu: function(){
		game.state.start("GameTitle", true, false);
	}

	// NOTE: At some point will need to call this.game.state.start("GameOver", true, false, score);
};