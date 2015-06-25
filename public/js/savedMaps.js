var savedMaps = function(game){};

savedMaps.prototype = {
	preload: function(){
		console.log("Saved Maps area");
    },

	create: function(){
        game.stage.backgroundColor = "#4795cd";

        var listText = game.add.bitmapText(10, 0, "desyrel", "Saved Maps", 50);

        // print list of loadable maps
        $.getJSON("/maps/button/findall", function(data){
            // data is an array of maps
            var xPos = 60;
            var yPos = 80;
            var style = {font: "32px Arial", fill: "#000000", align: "left"};
            for (var i = 0; i < data.length; i++){
                var link = game.add.text(xPos, yPos, data[i].name, style);
                link.inputEnabled = true;
                link.input.useHandCursor = true;
                link.events.onInputDown.add(savedMaps.prototype.loadMap, this);
                link.events.onInputOver.add(savedMaps.prototype.highlight, this);
                link.events.onInputOut.add(savedMaps.prototype.deHighlight, this);

                // create delete button
                var deleteButton = game.add.button(10, yPos, "trixels", 
                                                   savedMaps.prototype.deleteMap, link, "skull.png",
                                                   "skull.png", "skull.png", "skull.png");
                deleteButton.scale.setTo(0.3, 0.3);
                deleteButton.input.useHandCursor = true;

                // tricky play by renaming button to match name of map
                // used for deleting purposes
                deleteButton.name = link.text;
                yPos += 50;
            }
        });

        // Add menu button to return to menu
        var menuButton = game.add.button(0, document.body.offsetHeight, "trixels", 
                                     this.menu, this, "menubutton.png", 
                                     "menubutton.png", "menubutton.png", "menubutton.png");
        menuButton.anchor.setTo(0, 1);
        menuButton.input.useHandCursor = true;
        menuButton.fixedToCamera = true;
	},

    loadMap: function(link){
        var searchName = link.text;
        $.getJSON("/maps/button/load", {name: searchName}, function(data){
            var width = data.width*2;
            var height = data.height;
            var mapTiles = data.tiles;
            var name = data.name;
            console.log(data);
            game.state.start("MapMaker", true, false, width, height, mapTiles, name);
        });
    },

    highlight: function(link){
        link.fill = "#dc2ea2";
    },

    deHighlight: function(link){
        link.fill = "#000000";
    },

    menu: function(){
        game.state.start("Menu", true, false);
    },

    deleteMap: function(link){
        var check = prompt("Are you sure you want to delete "+link.name+"?");

        if(check != null){
            $.ajax({
                type: "DELETE",
                url: "/maps/button/deleteMap",
                data: {name: link.name}
            });
            game.state.start("SavedMaps", true, false);
        }
    }
};
