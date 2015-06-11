console.log('js goes here you sick little monkey');

var game = new Phaser.Game(document.body.offsetWidth, document.body.offsetHeight, Phaser.AUTO, "", {preload: onPreload, create: onCreate, update: onUpdate});                
var hexagonWidth = 108;
var hexagonHeight = 128;
var gridSizeX = 40; // basic is 17
var gridSizeY = 15;  // basic is 7
var columns = [Math.ceil(gridSizeX/2),Math.floor(gridSizeX/2)];
var moveIndex;
var sectorWidth = hexagonWidth;
var sectorHeight = hexagonHeight/4*3;
var gradient = (hexagonHeight/4)/(hexagonWidth/2);
var paintTile;
var hexagonGroup;
var paletteText;
var paletteBackground;
var paletteGroup;
var scaleFactor = 0.75; // Defaults at 0.75 but can change depending on size of user's screen
var cursors; // used to move the Camera around
 
function onPreload() {
    game.load.atlasJSONHash("atlas", "/images/LandTiles.png", "/images/LandTiles.json");
    game.load.bitmapFont("desyrel", "/images/phaserFonts/bitmapFonts/desyrel-pink.png", 
        "/images/phaserFonts/bitmapFonts/desyrel-pink.xml");
    game.load.image("white-rectangle", "/images/white-rectangle.png");
}

function onCreate() {
    game.camera.bounds = null; // makes no bounds 
    hexagonGroup = game.add.group();
    hexagonGroup.scale.x = scaleFactor;
    hexagonGroup.scale.y = scaleFactor;
    game.stage.backgroundColor = "#ffffff"
    for(var i = 0; i < gridSizeY/2; i ++){
        for(var j = 0; j < gridSizeX; j ++){
            if(gridSizeY%2==0 || i+1<gridSizeY/2 || j%2==0){
                var hexagonX = hexagonWidth*j/2;
                var hexagonY = hexagonHeight*i*1.5+(hexagonHeight/4*3)*(j%2);
                //MY CODE STARTS HERE
                var hexagon = game.add.button(hexagonX, hexagonY, "atlas", changeTile, this, "rocktile.png", "rocktile.png", "rocktile.png", "rocktile.png");
                hexagon.input.useHandCursor = false;
                //var hexagon = game.add.sprite(hexagonX,hexagonY,"hexagon");
                hexagonGroup.add(hexagon);
            }
        }
    }
    // THIS SECTION CENTERS THE GRID TO THE MAP
    /*
    hexagonGroup.x = (game.width-hexagonWidth*Math.ceil(gridSizeX/2))/2;
      if(gridSizeX%2==0){
           hexagonGroup.x-=hexagonWidth/4;
      }
    hexagonGroup.y = (game.height-Math.ceil(gridSizeY/2)*hexagonHeight-Math.floor(gridSizeY/2)*hexagonHeight/2)/2;
      if(gridSizeY%2==0){
           hexagonGroup.y-=hexagonHeight/8;
      }
    */

    paintTile = game.add.sprite(0,0,"atlas");
    paintTile.frameName = "clouds.png";
    paintTile.anchor.setTo(0.5);
    paintTile.visible=false;
    hexagonGroup.add(paintTile);

    // CREATE FONT
    paletteText = game.add.bitmapText(-40, 30, "desyrel", "Tile Palette", 60);

    // CREATE Pallete
    paletteGroup = game.add.group();
    paletteBackground = game.add.button(-55,0,"white-rectangle", null, this);
    paletteBackground.scale.x = 1.3;
    paletteBackground.scale.y = 1;
    paletteGroup.add(paletteBackground);
    paletteGroup.add(paletteText);
    paletteGroup.scale.x = scaleFactor;
    paletteGroup.scale.y = scaleFactor;
    var index = 0;
    var xCor = 0;
    var yCor = 0;
    for(var i = 0; i < 3; i ++){
        yCor += hexagonHeight + 5;
        for(var j = 0; j < 2; j ++){
            if(j == 0){
                xCor = 0;
            }
            else{
                xCor = hexagonWidth + 10;
            }
            var tile = game.add.button(xCor, yCor, "atlas", changePaint, this, index, index, index, index);
            hexagon.input.useHandCursor = true;
            paletteGroup.add(tile);
            index++;
        }
    }
    paletteGroup.x = game.camera.width - 200;
    cursors = game.input.keyboard.createCursorKeys();
}

function onUpdate(){
    moveIndex = game.input.addMoveCallback(checkHex, this);
    // Moves camera around
    if (cursors.left.isDown){
        game.camera.x -= 4;
        paletteGroup.x -= 4;
    }
    else if (cursors.right.isDown){
        game.camera.x += 4;
        paletteGroup.x += 4;
    }

    if (cursors.up.isDown){
        game.camera.y -= 4;
        paletteGroup.y -= 4;
    }
    else if (cursors.down.isDown){
        game.camera.y += 4;
        paletteGroup.y += 4;
    }
}
 
function checkHex(){
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
    placePaintTile(candidateX,candidateY);
}
 
function placePaintTile(posX,posY){
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
}

changeTile = function(tile){
    tile.setFrames(paintTile.frameName, paintTile.frameName, paintTile.frameName, paintTile.frameName);
}

changePaint = function(tile){
    paintTile.frameName = tile.frameName;
}