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
};

function WallSpritesPool(){
    this.createWindows();
    this.createDecorations();
    this.createFrontEdges();
    this.createBackEdges();
    this.createSteps();
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

WallSpritesPool.prototype.borrowStep = function() {
  return this.steps.shift();
};

WallSpritesPool.prototype.returnStep = function(sprite) {
  this.steps.push(sprite);
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
  for (var i = 0; i < amount; i++){
    var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(frameId));
    this.frontEdges.push(sprite);
  }
};

WallSpritesPool.prototype.addBackEdgeSprites = function(amount, frameId) {
  for (var i = 0; i < amount; i++){
    var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(frameId));
    sprite.anchor.x = 1;
    sprite.scale.x = -1;
    this.backEdges.push(sprite);
  }
};

WallSpritesPool.prototype.addStepSprites = function(amount, frameId) {
  for (var i = 0; i < amount; i++){
    var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(frameId));
    sprite.anchor.y = 0.25;
    this.steps.push(sprite);
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

WallSpritesPool.prototype.createSteps = function() {
  this.steps = [];
  this.addStepSprites(2, "step_01");
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

    this.front = new Walls();
    stage.addChild(this.front);

    this.mapBuilder = new MapBuilder(this.front);

    this.viewportX = 0;
}

Scroller.prototype.setViewportX = function(viewportX) {
    this.viewportX = viewportX
    this.far.setViewportX(viewportX);
    this.mid.setViewportX(viewportX);
    this.front.setViewportX(viewportX);
}

Scroller.prototype.getViewportX = function() {
    return this.viewportX;
};

Scroller.prototype.moveViewportXBy = function(units){
    var newViewportX = this.viewportX + units;
    this.setViewportX(newViewportX);
};

function SliceType(){
    SliceType.FRONT      = 0;
    SliceType.BACK       = 1;
    SliceType.DECORATION = 3;
    SliceType.WINDOW     = 4;
    SliceType.GAP        = 5;
}

function Walls(){
    PIXI.Container.call(this);
    this.pool = new WallSpritesPool();
    this.createLookupTables();

    this.slices = [];

    this.viewportX = 0;
    this.viewportSliceX = 0;
}

Walls.constructor = Walls;
Walls.prototype = Object.create(PIXI.Container.prototype);

Walls.VIEWPORT_WIDTH = 512;
Walls.VIEWPORT_NUM_SLICES = Math.ceil(Walls.VIEWPORT_WIDTH/WallSlice.WIDTH) + 1;

Walls.prototype.setViewportX = function(viewportX) {
    this.viewportX = this.checkViewportXBounds(viewportX);
    var prevViewportSliceX = this.viewportSliceX;
    this.viewportSliceX = Math.floor(this.viewportX/WallSlice.WIDTH);

    this.removeOldSlices(prevViewportSliceX);
    this.addNewSlices();
};

Walls.prototype.addSlice = function(sliceType, y) {
    var slice = new WallSlice(sliceType, y);
    this.slices.push(slice);
};

Walls.prototype.checkViewportXBounds = function(viewportX) {
    var maxViewportX = (this.slices.length - Walls.VIEWPORT_NUM_SLICES) * 
                       WallSlice.WIDTH;
    if (viewportX < 0){
        viewportX = 0;
    }
    else if (viewportX > maxViewportX){
        viewportX = maxViewportX;
    }
    
    return viewportX;
};

Walls.prototype.addNewSlices = function() {
  var firstX = -(this.viewportX % WallSlice.WIDTH);
  for (var i = this.viewportSliceX, sliceIndex = 0;
           i < this.viewportSliceX + Walls.VIEWPORT_NUM_SLICES;
           i++, sliceIndex++)
  {
    var slice = this.slices[i];
    if (slice.sprite == null && slice.type != SliceType.GAP)
    {
      slice.sprite = this.borrowWallSprite(slice.type);

      slice.sprite.position.x = firstX + (sliceIndex * WallSlice.WIDTH);
      slice.sprite.position.y = slice.y;

      this.addChild(slice.sprite);
    }
    else if (slice.sprite != null)
    {
      slice.sprite.position.x = firstX + (sliceIndex * WallSlice.WIDTH);
    }
  }
};


Walls.prototype.removeOldSlices = function(prevViewportSliceX) {
    var numOldSlices = this.viewportSliceX - prevViewportSliceX;
    if (numOldSlices > Walls.VIEWPORT_NUM_SLICES){
        numOldSlices = Walls.VIEWPORT_NUM_SLICES;
    }

    for (var i = prevViewportSliceX; i < prevViewportSliceX + numOldSlices; i++){
        var slice = this.slices[i];
        if (slice.sprite != null){
            this.returnWallSprite(slice.type, slice.sprite);
            this.removeChild(slice.sprite);
            slice.sprite = null;
        }
    }
};

Walls.prototype.createLookupTables = function() {
  this.borrowWallSpriteLookup = [];
  this.borrowWallSpriteLookup[SliceType.FRONT] = this.pool.borrowFrontEdge;
  this.borrowWallSpriteLookup[SliceType.BACK] = this.pool.borrowBackEdge;
  this.borrowWallSpriteLookup[SliceType.STEP] = this.pool.borrowStep;
  this.borrowWallSpriteLookup[SliceType.DECORATION] = this.pool.borrowDecoration;
  this.borrowWallSpriteLookup[SliceType.WINDOW] = this.pool.borrowWindow;

  this.returnWallSpriteLookup = [];
  this.returnWallSpriteLookup[SliceType.FRONT] = this.pool.returnFrontEdge;
  this.returnWallSpriteLookup[SliceType.BACK] = this.pool.returnBackEdge;
  this.returnWallSpriteLookup[SliceType.STEP] = this.pool.returnStep;
  this.returnWallSpriteLookup[SliceType.DECORATION] = this.pool.returnDecoration;
  this.returnWallSpriteLookup[SliceType.WINDOW] = this.pool.returnWindow;
};

Walls.prototype.borrowWallSprite = function(sliceType) {
  return this.borrowWallSpriteLookup[sliceType].call(this.pool);
};

Walls.prototype.returnWallSprite = function(sliceType, sliceSprite) {
  return this.returnWallSpriteLookup[sliceType].call(this.pool, sliceSprite);
};


function WallSlice(type, y) {
  this.type   = type;
  this.y      = y;
  this.sprite = null;
}

WallSlice.WIDTH = 64;

function MapBuilder (walls){
    this.walls = walls;
    this.createMap();
}

MapBuilder.WALL_HEIGHTS = [
  256, // Lowest slice
  224,
  192,
  160,
  128  // Highest slice
];

MapBuilder.prototype.createMap = function() {
    this.createWallSpan(3, 9, true);
    this.createGap(1);
    this.createWallSpan(1, 30);
    this.createGap(1);
    this.createWallSpan(2, 18);
    this.createGap(1);
    this.createSteppedWallSpan(2, 5, 28);
    this.createGap(1);
    this.createWallSpan(1, 10);
    this.createGap(1);
    this.createWallSpan(2, 6); 
    this.createGap(1);
    this.createWallSpan(1, 8);
    this.createGap(1);
    this.createWallSpan(2, 6);
    this.createGap(1);
    this.createWallSpan(1, 8);
    this.createGap(1)
    this.createWallSpan(2, 7);
    this.createGap(1);
    this.createWallSpan(1, 16);
    this.createGap(1);
    this.createWallSpan(2, 6);
    this.createGap(1);
    this.createWallSpan(1, 22);
    this.createGap(2);
    this.createWallSpan(2, 14);
    this.createGap(2);
    this.createWallSpan(3, 8);
    this.createGap(2);
    this.createSteppedWallSpan(3, 5, 12);
    this.createGap(3);
    this.createWallSpan(0, 8);
    this.createGap(3);
    this.createWallSpan(1, 50);
    this.createGap(20);
};

MapBuilder.prototype.createGap = function(spanLength) {
  for (var i = 0; i < spanLength; i++)
  {
    this.walls.addSlice(SliceType.GAP);
  }
};

MapBuilder.prototype.createWallSpan = function(heightIndex, spanLength, noFront, noBack) {
    noFront = noFront || false;
    noBack = noBack || false;

    if (noFront == false && spanLength > 0){
        this.addWallFront(heightIndex);
        spanLength--;
    } 

    var midSpanLength = spanLength - (noBack ? 0 : 1);
    if (midSpanLength > 0){
        this.addWallMid(heightIndex, midSpanLength)
        spanLength -= midSpanLength;
    }

    if (noBack == false && spanLength > 0){
        this.addWallBack(heightIndex);
    }
};

MapBuilder.prototype.createSteppedWallSpan = function(heightIndex, spanALength, spanBLength) {
    if (heightIndex < 2){
        heightIndex = 2;
    }

    this.createWallSpan(heightIndex, spanALength, false, true);
    this.addWallStep(heightIndex - 2);
    this.createWallSpan(heightIndex - 2, spanBLength - 1, true, false);
};

MapBuilder.prototype.addWallFront = function(heightIndex) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex];
  this.walls.addSlice(SliceType.FRONT, y);
};

MapBuilder.prototype.addWallBack = function(heightIndex) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex];
  this.walls.addSlice(SliceType.BACK, y);
};

MapBuilder.prototype.addWallMid = function(heightIndex, spanLength) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex];
  for (var i = 0; i < spanLength; i++)
  {
    if (i % 2 == 0)
    {
      this.walls.addSlice(SliceType.WINDOW, y);
    }
    else
    {
      this.walls.addSlice(SliceType.DECORATION, y);
    }
  }
};

MapBuilder.prototype.addWallStep = function(heightIndex) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex];
  this.walls.addSlice(SliceType.STEP, y);
};
