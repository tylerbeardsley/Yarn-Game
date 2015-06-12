var gameTitle = function(game){};

gameTitle.prototype = {
	create: function(){
		// can create gameTitle sprite here if I want
	},

	playTheGame: function(){
		this.game.state.start("TheGame");
	}
}