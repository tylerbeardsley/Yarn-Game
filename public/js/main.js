console.log('js goes here you sick little monkey');

function init(){
                stage = new PIXI.Container();
                // hardcoded width and height of canvas but could easily get reference with document.getElementById("game-canvas").width
                renderer = new PIXI.autoDetectRenderer( 512, 384, {view: document.getElementById("game-canvas")});

                scroller = new Scroller(stage);

                requestAnimationFrame(update);

                function update(){
                    scroller.moveViewportXBy(2);

                    renderer.render(stage);

                    requestAnimationFrame(update);
                }
}


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
}
