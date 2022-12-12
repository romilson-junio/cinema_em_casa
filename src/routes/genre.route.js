const router = require('express').Router()
const controller = require('../controllers/genre.controller')
const authenticated = require('../middlewares/authz.middleware')

router.get('/', controller.listAll)
router.get('/:id', controller.getById)
router.post('/', authenticated, controller.save)
router.put('/:id', authenticated, controller.update)
router.delete('/:id', authenticated, controller.remove)

module.exports = router