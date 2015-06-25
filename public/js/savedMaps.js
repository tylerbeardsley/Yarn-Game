var savedMaps = function(game){};

savedMaps.prototype = {
	preload: function(){
		console.log("Saved Maps area");
    },

	create: function(){
		game.stage.backgroundColor = "#ffffff";
        $.getJSON("/maps/button/findall", function(data){
            // data is an array of maps
            var xPos = 0;
            var yPos = 0;
            var style = {font: "32px Arial", fill: "#000000", align: "left"};
            for (var i = 0; i < data.length; i++){
                var link = game.add.text(xPos, yPos, data[i].name, style);
                link.inputEnabled = true;
                link.input.useHandCursor = true;
                link.events.onInputDown.add(savedMaps.prototype.loadMap, this);
                link.events.onInputOver.add(savedMaps.prototype.highlight, this);
                link.events.onInputOut.add(savedMaps.prototype.deHighlight, this);
                yPos += 50;
            }
        });
	},

    loadMap: function(link){
        var searchName = link.text;
        $.getJSON("/maps/button/load", {name: searchName}, function(data){
            var width = data.width*2;
            var height = data.height;
            var mapTiles = data.tiles;
            var name = data.name;
            game.state.start("TheGame", true, false, width, height, mapTiles, name);
        });
    },

    highlight: function(link){
        link.fill = "#dc2ea2";
    },

    deHighlight: function(link){
        link.fill = "#000000";
    }
};
