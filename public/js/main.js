console.log('js goes here you sick little monkey');

var game = new Phaser.Game(1300, 800, Phaser.AUTO, "", {preload: onPreload, create: onCreate, update: onUpdate});                
 
var hexagonWidth = 108;
var hexagonHeight = 128;
var gridSizeX = 17;
var gridSizeY = 7;
var columns = [Math.ceil(gridSizeX/2),Math.floor(gridSizeX/2)];
var moveIndex;
var sectorWidth = hexagonWidth;
var sectorHeight = hexagonHeight/4*3;
var gradient = (hexagonHeight/4)/(hexagonWidth/2);
var paintTile;
var hexagonGroup;
var paletteText;
var paletteGroup;
 
function onPreload() {
    game.load.atlasJSONHash("atlas", "/images/LandTiles.png", "/images/LandTiles.json");
    game.load.bitmapFont("desyrel", "/images/phaserFonts/bitmapFonts/desyrel-pink.png", 
        "/images/phaserFonts/bitmapFonts/desyrel-pink.xml");
}

function onCreate() {
    hexagonGroup = game.add.group();
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
    paintTile.frameName = "watertile.png";
    paintTile.anchor.setTo(0.5);
    paintTile.visible=false;
    hexagonGroup.add(paintTile);

    // CREATE FONT
    paletteText = game.add.bitmapText(990, 30, "desyrel", "Tile Palette", 60);

    // CREATE Pallete
    paletteGroup = game.add.group();
    var index = 0;
    var xCor = 1000;
    var yCor = 30;
    for(var i = 0; i < 3; i ++){
        yCor += 130;
        for(var j = 0; j < 2; j ++){
            if(j == 0){
                xCor = 1000;
            }
            else{
                xCor = 1130;
            }
            var tile = game.add.button(xCor, yCor, "atlas", changePaint, this, index, index, index, index);
            hexagon.input.useHandCursor = true;
            paletteGroup.add(tile);
            index++;
        }
    }
}

function onUpdate(){
    moveIndex = game.input.addMoveCallback(checkHex, this);
}
 
function checkHex(){
    var candidateX = Math.floor((game.input.worldX-hexagonGroup.x)/sectorWidth);
    var candidateY = Math.floor((game.input.worldY-hexagonGroup.y)/sectorHeight);
    var deltaX = (game.input.worldX-hexagonGroup.x)%sectorWidth;
    var deltaY = (game.input.worldY-hexagonGroup.y)%sectorHeight; 
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
    tile.setFrames("watertile.png", "watertile.png", "watertile.png", "watertile.png");
}

changePaint = function(tile){

}