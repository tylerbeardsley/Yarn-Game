console.log('js goes here you sick little monkey');

function init(){
                stage = new PIXI.Container();
                // hardcoded width and height of canvas but could easily get reference with document.getElementById("game-canvas").width
                renderer = new PIXI.autoDetectRenderer( 512, 384, {view: document.getElementById("game-canvas")});

                // creates background texture
                far = new Far();
                stage.addChild(far);

                // creates middle texture
                mid = new Mid();
                stage.addChild(mid);

                requestAnimationFrame(update);

                function update(){
                    far.tilePosition.x -= 0.128;
                    mid.tilePosition.x -= 0.64;

                    renderer.render(stage);

                    requestAnimationFrame(update);
                }
}