module.exports = {
    
    add: {
        handler: function(request, reply){
            // Grab the DB from dogwater
            var db = request.server.plugins['dogwater'];

            console.log(request.payload.tiles.length);
            
            // Look for Stimpy in the cats model, placed there as a fixture
            // add a click to Stimpy
            db.maps.findOrCreate({name: request.payload.name}).then(function(map) {

                map.name = request.payload.name;
                map.tiles = request.payload.tiles;
                map.width = request.payload.width;
                map.height = request.payload.height;

                map.save(function(err, character){
                    if(err){
                        reply(err);
                        return;
                    }
                    reply({name: map.name, tiles: map.tiles, 
                           width: map.width, height: map.height});
                });
            });
        }
    },
    
    load: {
        handler: function(request, reply){
            // Grab the DB from dogwater
            var db = request.server.plugins['dogwater'];
            
            
            db.maps.findOne({name: request.query.name}).then(function(map) {
            
                reply({name: map.name, tiles: map.tiles, 
                       width: map.width, height: map.height});
                
            });
        }
    },

    findall: {
        handler: function(request, reply){
            // Grab the DB from dogwater
            var db = request.server.plugins['dogwater'];
            
            
            db.maps.find().then(function(maps) {
            
                reply(maps);
                
            });
        }
    },

    deleteMap: {
        handler: function(request, reply){
            // Grab the DB from dogwater
            var db = request.server.plugins['dogwater'];
            
            db.maps.destroy({name: request.payload.name}).exec(function(err) {});
        }
    }
}