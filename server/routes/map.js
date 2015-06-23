var controller = require('../controllers/mapController.js');

module.exports = [
    {
        method: 'POST',
        path: '/map/button/add',
        config: controller.add
    },
    {
        method: 'GET',
        path: '/map/button/load',
        config: controller.load
    },
]