module.exports = {

    identity: 'map',

    connection: 'diskDb',

    attributes: {
        name: 'string',
        tiles: 'array', // is going to be array of image names for trixels
        width: 'integer',
        height: 'integer'
    }

}