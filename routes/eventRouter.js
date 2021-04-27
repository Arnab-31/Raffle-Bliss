const express = require('express')
const eventController = require('../controllers/eventController')
const authController = require('../controllers/authController')

const router = express.Router();


router.post('/event', eventController.createEvent)
router.get('/events', eventController.getAllEvents)
router.get('/event', eventController.nextEvent)
router.get('/winner/:id', eventController.winner)
router.get('/winners', eventController.allWinners)

router.use(authController.isLoggedIn);

router.post('/draw/:id', eventController.drawTicket)
//router.post('/logoutAll', authController.logoutAll)
//router.patch('/update',authController.userUpdate)


module.exports = router;