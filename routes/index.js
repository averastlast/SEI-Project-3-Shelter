const express = require('express')
const router = express.Router()

const shelterController = require('../controllers/shelterController')
const dogController = require('../controllers/dogController')

router.get('/shelters/', shelterController.index)
router.post('/shelters/', shelterController.create)
router.get('/shelters/:id', shelterController.show)
router.put('/shelters/:id', shelterController.update)
router.delete('/shelters/:id', shelterController.delete)

router.get('/dogs/', dogController.index)
router.post('/dogs/', dogController.create)
router.get('/dogs/:dogId', dogController.show)
router.put('/dogs/:dogId', dogController.update)
router.delete('/dogs/:dogId', dogController.delete)

module.exports = router