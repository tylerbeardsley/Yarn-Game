//controller for default routes
var controller = require('../controllers/characterController.js');

module.exports = [
    {
        method: 'POST',
        path: '/character/button/add',
        config: controller.add
    },
    {
        method: 'GET',
        path: '/character/button/name',
        config: controller.name
    },
]