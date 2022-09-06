const express = require('express')
const router = express.Router()
// setting up 2 controllers for auth and home
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
//links to middleware folder
//ensureGuest isn't implemeneted here (so far)
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/', homeController.getIndex)

router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)

router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router