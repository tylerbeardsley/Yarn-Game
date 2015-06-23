// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
module.exports = {
    
    add: {
        handler: function(request, reply){
            
            // Grab the DB from dogwater
            var db = request.server.plugins['dogwater'];
            
            // Look for Stimpy in the cats model, placed there as a fixture
            // add a click to Stimpy
            db.character.findOne(1).then(function(character) {

                console.log(character);
                character.name = request.payload.name;
                character.life = request.payload.life;
                character.move = request.payload.move;
                character.range = request.payload.range;
                character.attack = request.payload.attack;
                character.defense = request.payload.defense;
                character.points = request.payload.points;
                console.log(character);

                character.save(function(err, character){
                    if(err){
                        reply(err);
                        return;
                    }
                    reply({name: character.name, life: character.life, 
                           move: character.move, range: character.range,
                           attack: character.attack, defense: character.defense,
                           points: character.points});
                });
            });
        }
    },
    
    stats: {
        handler: function(request, reply){

            // Grab the DB from dogwater
            var db = request.server.plugins['dogwater'];
            
            // Look for Stimpy in the cats model, placed there as a fixture
            db.character.findOne(1).then(function(character) {
            
                // Reply with the number of clicks on Stimpy
                reply({name: character.name, life: character.life, 
                           move: character.move, range: character.range,
                           attack: character.attack, defense: character.defense,
                           points: character.points});
                
            });
        }
    }
}