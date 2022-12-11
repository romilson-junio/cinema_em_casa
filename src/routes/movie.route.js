const router = require('express').Router()
const controller = require('../controllers/movie.controller')
const authenticated = require('../middlewares/authz.middleware')

router.get('/', authenticated, controller.listAll)
router.get('/:id', authenticated, controller.getById)
router.post('/', authenticated, controller.save)
router.put('/:id', authenticated, controller.update)
router.delete('/:id', authenticated, controller.remove)

module.exports = router