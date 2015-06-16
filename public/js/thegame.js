var theGame = function(game){};

theGame.prototype = {
	init: function(width, height){
		hexagonWidth = 110; // actual size is 111 but that shows hex outline
		hexagonHeight = 128;
		gridSizeX = width; // actually counts number of hexes by pairs of rows
		gridSizeY = height;  // actual number of rows
		columns = [Math.ceil(gridSizeX/2),Math.floor(gridSizeX/2)];
		moveIndex = 0;
		sectorWidth = hexagonWidth;
		sectorHeight = hexagonHeight/4*3;
		gradient = (hexagonHeight/4)/(hexagonWidth/2);
		paintTile = null;
		hexagonGroup = null;
		paletteText = "";
		paletteBackground = null;
		paletteGroup = null;
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
	    game.stage.backgroundColor = "#000000"; // #ffffff is maybe better?

	    //add all map tiles
	    for(var i = 0; i < gridSizeY/2; i ++){
	        for(var j = 0; j < gridSizeX; j ++){
	            if(gridSizeY%2==0 || i+1<gridSizeY/2 || j%2==0){
	                var hexagonX = (hexagonWidth * j)/2;
	                var hexagonY = hexagonHeight * i * 1.5 + (hexagonHeight/4*3)*(j%2);
	                //MY CODE STARTS HERE
	                var hexagon = game.add.button(hexagonX, hexagonY, "atlas", null, this, 
	                              "rocktile.png", "rocktile.png", "rocktile.png", "rocktile.png");
	                hexagon.events.onInputOver.add(this.paint, this); // handles click and hold
	                hexagon.events.onInputDown.add(this.paint, this); // handles click
	                hexagon.input.useHandCursor = false;
	                hexagonGroup.add(hexagon);
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
	    var index = 0;
	    var xCor = 0;
	    var yCor = 0;

	    // Place different land tiles on palette
	    for(var i = 0; i < 16; i++){ // really don't want to use 16 here. Want to find length of JSON Hash
	    	if(i % 2 == 0){
	    		xCor = 0;
	    		yCor += hexagonHeight + 5;
	    	}
	    	else{
	    		xCor = hexagonWidth + 10;
	    	}
	    	var tile = game.add.button(xCor, yCor, "atlas", this.changePaint, this, index, index, index, index);
	        hexagon.input.useHandCursor = true;
	        paletteGroup.add(tile);
	        index++;
	    }

	    paletteGroup.fixedToCamera = true; // keeps palette in correct position
	    paletteGroup.cameraOffset.x = game.camera.width - 200;

	    saveButton = game.add.button(game.camera.width/2 - 150, game.camera.height - 130, "save-map", this.saveMap, this);
	    saveButton.fixedToCamera = true;
	    saveButton.input.useHandCursor = true;
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

	changePaint: function(tile){
	    paintTile.frameName = tile.frameName;
	},

	paint: function(tile){
    	// Checks for click and drag painting
    	if(game.input.mousePointer.isDown && game.input.mouse.button == 0){
        	tile.setFrames(paintTile.frameName, paintTile.frameName, paintTile.frameName, paintTile.frameName);
    	}
	},

	zoom: function(){
		if(game.input.mouse.wheelDelta == Phaser.Mouse.WHEEL_UP){
			// zoom in
			hexagonGroup.scale.x += 0.1;
			hexagonGroup.scale.y += 0.1;
			scaleFactor += 0.1;
		}
		else if(game.input.mouse.wheelDelta == Phaser.Mouse.WHEEL_DOWN){
			hexagonGroup.scale.x -= 0.1;
			hexagonGroup.scale.y -= 0.1;
			scaleFactor -= 0.1;
		}
	},

	saveMap: function(){
		console.log("Saved Map (but not really)");
		localStorage.setItem("test", "This should be a JSON map");
		console.log(localStorage.getItem("test"));
	}

	// NOTE: At some point will need to call this.game.state.start("GameOver", true, false, score);
};