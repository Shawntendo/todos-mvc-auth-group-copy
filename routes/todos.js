const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth } = require('../middleware/auth')

//ensureAuth BEFORE the controller
//is middleware
//checks user is signed in
// only gets to getTodos IF user is logged in!
//otherwise will redirect back to main page
router.get('/', ensureAuth, todosController.getTodos)

//ccould add "ensureAuth" to these if you wanted
//but no way to really get to these as a user unless you're logged in
//there are ways to hack it , but for basic users not really
//so this is exactly the same
router.post('/createTodo', todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router