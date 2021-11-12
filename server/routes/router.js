const Router = require('express')
const clientController = require('../controllers/client-controller')
const providerController = require('../controllers/provider-controller')


const router = new Router()

router.post('/clients', clientController.create)
router.get('/clients', clientController.getAll)
router.get('/clients/:id', clientController.getOne)
router.put('/clients/:id', clientController.update)
router.delete('/clients/:id', clientController.delete)

router.post('/providers', providerController.create)
router.get('/providers', providerController.getAll)
router.get('/providers/:id', providerController.getOne)
router.put('/providers/:id', providerController.update)
router.delete('/providers/:id', providerController.delete)

module.exports = router;