module.exports = {
    
    add: {
        handler: function(request, reply){
            // Grab the DB from dogwater
            var db = request.server.plugins['dogwater'];
            
            // Look for Stimpy in the cats model, placed there as a fixture
            // add a click to Stimpy
            db.map.findOrCreate({name: request.payload.name}).then(function(map) {

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
            
            
            db.map.findOne({name: request.query.name}).then(function(map) {
            
                reply({name: map.name, tiles: map.tiles, 
                           width: map.width, height: map.height});
                
            });
        }
    }
}