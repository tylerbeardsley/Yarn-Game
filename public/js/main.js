console.log('js goes here you sick little monkey');

function init(){
                stage = new PIXI.Container();
                // hardcoded width and height of canvas but could easily get reference with document.getElementById("game-canvas").width
                renderer = new PIXI.autoDetectRenderer( 512, 384, {view: document.getElementById("game-canvas")});

                // creates background texture
                var farTexture = PIXI.Texture.fromImage("/images/bg-far.png");
                far = new PIXI.extras.TilingSprite(farTexture, 512, 256);
                far.position.x = 0;
                far.position.y = 0;
                far.tilePosition.x = 0;
                far.tilePosition.y = 0;
                stage.addChild(far);

                // creates middle texture
                var midTexture = PIXI.Texture.fromImage("/images/bg-mid.png");
                mid = new PIXI.Sprite(midTexture);
                mid.position.x = 0;
                mid.position.y = 128;
                stage.addChild(mid);

                requestAnimationFrame(update);

                function update(){
                    far.position.x -= 0.128;
                    mid.position.x -= 0.64;

                    renderer.render(stage);

                    requestAnimationFrame(update);
                }
}