const router = require('express').Router()
const controller = require('../controllers/users.controller')
const authenticated = require('../middlewares/authz.middleware')

router.post('/', controller.save)

router.get('/', authenticated, controller.getAll)

router.get('/:id', authenticated, controller.getById)

router.put('/:id', authenticated, controller.update)

router.delete('/:id', authenticated, controller.remove)

router.post('/authenticate', controller.authenticated)

module.exports = router