const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router();


router.get('/', (req,res)=>{
    res.send("Server up!");
})

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.use(authController.isLoggedIn);

router.post('/logout', authController.logout)
router.post('/logoutAll', authController.logoutAll)
router.patch('/update',authController.userUpdate)


module.exports = router;