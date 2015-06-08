console.log('js goes here you sick little monkey');

function init(){
    main = new Main();
}

function Main(){
    this.stage = new PIXI.Container();
    this.renderer = new PIXI.autoDetectRenderer(512, 384, {view: document.getElementById("game-canvas")});
    this.loadSpriteSheet();
}

Main.SCROLL_SPEED = 5;

Main.prototype.update = function(){
    this.scroller.moveViewportXBy(Main.SCROLL_SPEED);
    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.loadSpriteSheet = function (){
    var assetsToLoad = ["/images/wall.json"];
    loader = PIXI.loader;
    loader.add(assetsToLoad);
    loader.once("complete", this.spriteSheetLoaded.bind(this));
    loader.load();
};

Main.prototype.spriteSheetLoaded = function(){
    this.scroller = new Scroller(this.stage);
    requestAnimationFrame(this.update.bind(this));

    this.pool = new WallSpritesPool();
    this.wallSlices = [];
};

Main.prototype.generateTestWallSpan = function() {
  var lookupTable = [
    this.pool.borrowFrontEdge,  // 1st slice
    this.pool.borrowWindow,     // 2nd slice
    this.pool.borrowDecoration, // 3rd slice
    this.pool.borrowWindow,     // 4th slice
    this.pool.borrowDecoration, // 5th slice
    this.pool.borrowWindow,     // 6th slice
    this.pool.borrowBackEdge    // 7th slice
  ];

  for (var i = 0; i < lookupTable.length; i++){
    var func = lookupTable[i];

    var sprite = func.call(this.pool); // equivalent to this.pool.borrowFrontEdge()
    sprite.position.x = 32 + (i * 64);
    sprite.position.y = 128;

    this.wallSlices.push(sprite);

    this.stage.addChild(sprite);
  }

};

Main.prototype.clearTestWallSpan = function() {
  var lookupTable = [
    this.pool.returnFrontEdge,  // 1st slice
    this.pool.returnWindow,     // 2nd slice
    this.pool.returnDecoration, // 3rd slice
    this.pool.returnWindow,     // 4th slice
    this.pool.returnDecoration, // 5th slice
    this.pool.returnWindow,     // 6th slice
    this.pool.returnBackEdge    // 7th slice
  ];

  for (var i = 0; i < lookupTable.length; i++)
  {
    var func = lookupTable[i];
    var sprite = this.wallSlices[i];

    this.stage.removeChild(sprite);
    func.call(this.pool, sprite);
  }

  this.wallSlices = [];
};

function WallSpritesPool(){
    this.createWindows();
    this.createDecorations();
    this.createFrontEdges();
    this.createBackEdges();
}

WallSpritesPool.prototype.borrowWindow = function(){
    return this.windows.shift();
};

WallSpritesPool.prototype.returnWindow = function(sprite){
    this.windows.push(sprite);
};

WallSpritesPool.prototype.borrowDecoration = function(){
    return this.decorations.shift();
};

WallSpritesPool.prototype.returnDecoration = function(sprite){
    this.decorations.push(sprite);
};

WallSpritesPool.prototype.borrowFrontEdge = function() {
  return this.frontEdges.shift();
};

WallSpritesPool.prototype.returnFrontEdge = function(sprite) {
  this.frontEdges.push(sprite);
};

WallSpritesPool.prototype.borrowBackEdge = function() {
  return this.backEdges.shift();
};

WallSpritesPool.prototype.returnBackEdge = function(sprite) {
  this.backEdges.push(sprite);
};

WallSpritesPool.prototype.shuffle = function(array){
    var len = array.length;
    var shuffles = len * 3;
    for (var i = 0; i < shuffles; i++){
        var wallSlice = array.pop();
        var pos = Math.floor(Math.random() * (len - 1));
        array.splice(pos, 0, wallSlice);
    }
};

WallSpritesPool.prototype.addWindowSprites = function(amount, frameId){
    for(var i = 0; i < amount; i++){
        var sprite = PIXI.Sprite.fromFrame(frameId);
        this.windows.push(sprite);
    }
};

WallSpritesPool.prototype.addDecorationSprites = function(amount, frameId){
    for(var i = 0; i < amount; i++){
        var sprite = PIXI.Sprite.fromFrame(frameId);
        this.decorations.push(sprite);
    }
};

WallSpritesPool.prototype.addFrontEdgeSprites = function(amount, frameId) {
  for (var i = 0; i < amount; i++)
  {
    var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(frameId));
    this.frontEdges.push(sprite);
  }
};

WallSpritesPool.prototype.addBackEdgeSprites = function(amount, frameId) {
  for (var i = 0; i < amount; i++)
  {
    var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(frameId));
    sprite.anchor.x = 1;
    sprite.scale.x = -1;
    this.backEdges.push(sprite);
  }
};

WallSpritesPool.prototype.createWindows = function() {
    this.windows = [];

    this.addWindowSprites(6, "window_01");
    this.addWindowSprites(6, "window_02");

    this.shuffle(this.windows);
};

WallSpritesPool.prototype.createDecorations = function(){
    this.decorations = [];

    this.addDecorationSprites(6, "decoration_01");
    this.addDecorationSprites(6, "decoration_02");
    this.addDecorationSprites(6, "decoration_03");

    this.shuffle(this.decorations);
};

WallSpritesPool.prototype.createFrontEdges = function() {
  this.frontEdges = [];

  this.addFrontEdgeSprites(2, "edge_01");
  this.addFrontEdgeSprites(2, "edge_02");

  this.shuffle(this.frontEdges);
};

WallSpritesPool.prototype.createBackEdges = function() {
  this.backEdges = [];

  this.addBackEdgeSprites(2, "edge_01");
  this.addBackEdgeSprites(2, "edge_02");

  this.shuffle(this.backEdges);
};


// Mid Class
function Mid(){
    var texture = PIXI.Texture.fromImage("/images/bg-mid.png");
    PIXI.extras.TilingSprite.call(this, texture, 512, 256);

    this.position.x = 0;
    this.position.y = 128;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

    this.viewportX = 0;
}

Mid.constructor = Mid;
Mid.prototype = Object.create(PIXI.extras.TilingSprite.prototype);
Mid.DELTA_X = 0.64;

Mid.prototype.setViewportX = function(newViewportX){
    var distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * Mid.DELTA_X);
};


// Far Class
function Far(){
    var texture = PIXI.Texture.fromImage("/images/bg-far.png");
    PIXI.extras.TilingSprite.call(this, texture, 512, 256);

    this.position.x = 0;
    this.position.y = 0;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

    this.viewportX = 0;
}

Far.constructor = Far;
Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);
Far.DELTA_X = 0.128;

Far.prototype.setViewportX = function(newViewportX){
    var distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * Far.DELTA_X);
};


// Scroller Class 
function Scroller(stage){
    this.far = new Far();
    stage.addChild(this.far);
    this.mid = new Mid();
    stage.addChild(this.mid);

    this.viewportX = 0;
}

Scroller.prototype.setViewportX = function(viewportX) {
    this.viewportX = viewportX
    this.far.setViewportX(viewportX);
    this.mid.setViewportX(viewportX);
}

Scroller.prototype.getViewportX = function() {
    return this.viewportX;
};

Scroller.prototype.moveViewportXBy = function(units){
    var newViewportX = this.viewportX + units;
    this.setViewportX(newViewportX);
};

