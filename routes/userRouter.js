const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router();


router.get('/', (req,res)=>{
    res.send("Server running!But this is not a valid route!");
})

router.post('/signup', authController.signup)
router.post('/login', authController.login)

//router.use(authController.isLoggedIn);                           //routes after this point needs authentication

router.post('/logout', authController.isLoggedIn,  authController.logout)
router.post('/logoutAll',authController.isLoggedIn,  authController.logoutAll)
router.patch('/update', authController.isLoggedIn, authController.userUpdate)


module.exports = router;