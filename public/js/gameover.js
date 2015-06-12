var gameOver = function(game){};

gameOver.prototype = {
	init: function(score){
		alert("You Scored: " + score);
	},
	create: function(){
		// can display game over sprite here with possible replay button
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	}
};