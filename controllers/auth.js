const passport = require('passport')
//for validating strings
const validator = require('validator')
//grab the user model
const User = require('../models/User')

 exports.getLogin = (req, res) => {
    // if the request has a user:
    if (req.user) {
      return res.redirect('/todos')
    }
    res.render('login', {
      title: 'Login'
    })
  }
  
  //runs when the user tries to log in
  exports.postLogin = (req, res, next) => {
    //set up empty array to hold any validation errors
    const validationErrors = []
    // if req.body.email is not an email, add an object with a message to the validationErrors array
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    //similarly, check that password is not blank
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    //checking if any errors were logged
    if (validationErrors.length) {
      //flash set up as middleware in server.js
      //methods from flash passed along with request body
      //show validations errors to user
      req.flash('errors', validationErrors)
      //redirect back to login page (when there are validation errors)
      //since submitting a form will automatically refresh the page, this sends us back to the login page
      return res.redirect('/login')
    }

    //fixes up emails to make sure theyre consistent - eg making them lower case, removing gmail dots, etc
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    //actually does the authentication, after validating all the stuff above
    passport.authenticate('local', (err, user, info) => {
      // if there's an error, return the error
      if (err) { return next(err) }
      //if there's no user, show an error and redirect back to the login page
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
      }
      // log in the user
      req.logIn(user, (err) => {
        //if there's an error, return the error
        if (err) { return next(err) }
        //show a success message to user
        req.flash('success', { msg: 'Success! You are logged in.' })
        // return to the page you were on, OR redirect back to "/todos"
        res.redirect(req.session.returnTo || '/todos')
      })
    })(req, res, next)
  }
  
  exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  }
  
  exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/todos')
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
  //don't need to know how to write this!!
  exports.postSignup = (req, res, next) => {
    const validationErrors = []
    //checks for valid email
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    //gives you validation errors
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    //our user model!
    const user = new User({
      //grab info from the form!
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })

    //save the new user
    User.findOne({$or: [
      {email: req.body.email},
      {userName: req.body.userName}
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('../signup')
      }
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          //takes us to todo page
          res.redirect('/todos')
        })
      })
    })
  }