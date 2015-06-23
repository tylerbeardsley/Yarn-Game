module.exports = {

    identity: 'character',

    connection: 'diskDb',

    attributes: {
        name: {type: 'string', defaultsTo: 'George Clooney'},
        life: {type: 'integer', defaultsTo: 1},
        move: {type: 'integer', defaultsTo: 0},
        range: {type: 'integer', defaultsTo: 1},
        attack: {type: 'integer', defaultsTo: 0},
        defense: {type: 'integer', defaultsTo: 0},
        points: {type: 'integer', defaultsTo: 18}
    }

}