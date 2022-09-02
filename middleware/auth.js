// check if logged in or not
//useful bit of middleware
module.exports = {
  //function to check if you're authenticaed
    ensureAuth: function (req, res, next) {
      //the "isAuthenticated" is a method from passport, don't need to write it yourself
      if (req.isAuthenticated()) {
        //do the next thing if logged in
        return next()
      } else {
        //if not logged in, get redirected back to main page to login
        res.redirect('/')
      }
    }
  }
  

  //ensureGuest would be here if we decided to implement this