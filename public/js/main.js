console.log('js goes here you sick little monkey');

// first tile picked up by the player
var firstTile = null;
// second tile picked up by the player
var secondTile = null;
// can the player pick up a tile?
var canPick = true;
// create an new instance of a pixi stage with a grey background
var stage = new PIXI.Container();
// create a new container for game stuff
var gameContainer = new PIXI.Container();
stage.addChild(gameContainer);
stage.scale.x = 0.75;
stage.scale.y = 0.75;
// Create some game Text
var text = "Player 1 Score";
var style = {
  font: '50px Arial bold',
  fill: '#F7EDCA',
  strokeThickness: '3'
};
var scoreKeeper = new PIXI.Text(text, style);
scoreKeeper.x = 970;
scoreKeeper.y = 30;

stage.addChild(scoreKeeper);

var scoreNum = 0;
var score = new PIXI.Text("0", style);
score.x = 1100;
score.y = 100;
stage.addChild(score);

var text2 = "Player 2 Score";
var scoreKeeper2 = new PIXI.Text(text2, style);
scoreKeeper2.x = 970;
scoreKeeper2.y = 420;
stage.addChild(scoreKeeper2);

var scoreNum2 = 0;
var score2 = new PIXI.Text("0", style);
score2.x = 1100;
score2.y = 490;
stage.addChild(score2);

var player1Turn = true;

// create a renderer instance width=640 height=480
var renderer = PIXI.autoDetectRenderer(992, 700, {backgroundColor: 0x1099bb});
// importing a texture atlas created with texturepacker
var tileAtlas = ["/images/MemoryTrixelSprites.json"];
// create a new loader
var loader = new PIXI.loaders.Loader();
loader.add(tileAtlas);
// add the renderer view element to the DOM
document.body.appendChild(renderer.view);
// use callback
loader.once("complete", onTilesLoaded);
//begin load
loader.load(); 


function onTilesLoaded(){
  // choose 24 random tile images
  var chosenTiles = new Array();
  while(chosenTiles.length < 48){
    var candidate = Math.floor(Math.random() * 24); // 24 is the number of Sprites in sprite sheet
    if(chosenTiles.indexOf(candidate) == -1){
      chosenTiles.push(candidate, candidate);
    }     
  }
  // shuffle the chosen tiles
  for(i = 1; i < 48; i++){
    var from = Math.floor(Math.random() * (i + 1));
    var to = i;
    var tmp = chosenTiles[from];
    chosenTiles[from] = chosenTiles[to];
    chosenTiles[to] = tmp;
  }
  // place down tiles
  for(i = 0; i < 8; i++){
    for(j = 0; j < 6; j++){
      // new sprite
      var tile = PIXI.Sprite.fromFrame(chosenTiles[i * 6 + j]);
      // buttonmode+interactive = acts like a button
      tile.buttonMode = true;
      tile.interactive = true;
      // is the tile selected?
      tile.isSelected = false;
      // set a tile value
      tile.theVal = chosenTiles[i * 6 + j]
      // place the tile
      // this is hardcoded to certain pixel coordinates (might want something more flexible)
      tile.position.x = 7 + i * 115;
      tile.position.y = 7 + j * 130; 
      // paint tile black
      tile.tint = 0x000000;
      // set it a bit transparent (it will look grey)
      tile.alpha = 0.5;
      // add the tile
      gameContainer.addChild(tile);
      // mouse-touch listener
      tile.mousedown = tile.touchstart = function(data){
        // can I pick a tile?
        if(canPick) {
            // is the tile already selected?
          if(!this.isSelected){
            // set the tile to selected
            this.isSelected = true;
            // show the tile
            this.tint = 0xffffff;
            this.alpha = 1;
            // is it the first tile we uncover?
            if(firstTile == null){
              firstTile = this;
            }
            // this is the second tile
            else{
              secondTile = this;
              // can't pick anymore
              canPick = false;
              // did we pick the same tiles?
              if(firstTile.theVal == secondTile.theVal){
                // wait a second then remove the tiles and make the player able to pick again
                setTimeout(function(){
                  gameContainer.removeChild(firstTile);
                  gameContainer.removeChild(secondTile);
                  firstTile = null;
                  secondTile = null;
                  canPick = true;
                  // MY ADDITIONS FOR SCORE
                  if(player1Turn == true){
                    scoreNum++;
                    score.text = scoreNum.toString();
                  }
                  else{
                    scoreNum2++;
                    score2.text = scoreNum2.toString();
                  }
                },1000);
              }
              // we picked different tiles
              else{
                // wait a second then cover the tiles and make the player able to pick again
                setTimeout(function(){
                  firstTile.isSelected = false
                  secondTile.isSelected = false
                  firstTile.tint = 0x000000;
                  secondTile.tint = 0x000000;
                  firstTile.alpha = 0.5;
                  secondTile.alpha = 0.5;
                  firstTile = null;
                  secondTile = null;
                  canPick = true;
                  player1Turn = !player1Turn;  
                },1000);
              }
            } 
          }
        }
      }
    }
  } 
  requestAnimationFrame(animate);
}
function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}

