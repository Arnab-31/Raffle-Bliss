const express = require('express')
const eventController = require('../controllers/eventController')
const authController = require('../controllers/authController')

const router = express.Router();



router.get('/events', eventController.getAllEvents)
router.get('/event', eventController.nextEvent)
router.get('/winner/:id', eventController.winner)
router.get('/winners', eventController.allWinners)


router.post('/event', authController.isLoggedIn, eventController.createEvent)
router.post('/draw/:id', authController.isLoggedIn, eventController.drawTicket)



module.exports = router;