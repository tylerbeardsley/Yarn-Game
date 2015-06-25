var controller = require('../controllers/mapController.js');

module.exports = [
    {
        method: 'POST',
        path: '/maps/button/add',
        config: controller.add
    },
    {
        method: 'GET',
        path: '/maps/button/load',
        config: controller.load
    },
    {
        method: 'GET',
        path: '/maps/button/findall',
        config: controller.findall
    },
    {
        method: 'DELETE',
        path: '/maps/button/deleteMap',
        config: controller.deleteMap
    },
]