console.log('js goes here you sick little monkey');

var game = new Phaser.Game(document.body.offsetWidth,document.body.offsetHeight,
						   Phaser.AUTO, "game");                

// Use a state manager
game.state.add("Boot", boot);
game.state.add("Preload", preload);
game.state.add("Menu", menu);
game.state.add("Character", characterBuilder);
game.state.add("MapMenu", mapMenu);
game.state.add("MapMaker", mapMaker);
game.state.add("SavedMaps", savedMaps);
game.state.add("GameOver", gameOver);
game.state.start("Boot");