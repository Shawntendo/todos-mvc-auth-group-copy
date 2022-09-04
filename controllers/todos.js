const Todo = require('../models/Todo')
const User = require('../models/User')

//this is almost the same as without auth
module.exports = {
    getTodos: async (req,res)=>{
        // can see the user that's making the request (the logged in user)
        // will show all the info about the user
        //when create a new user, they have their OWN IDs
        
        //have a DB collection of users
        //when a user signs up, add their info to DB
        //will have a unique ID
        //can use the ID everywhere else in the app'n
        console.log(req.user)
        try{
            //only get items that have the matching ID!
            //remember, req.user is info for the logged in user
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user, color: req.user.color})
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            //include the user ID when you create a new todo!
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    modeReroll: async (req, res)=>{
        let newColor = Math.floor(Math.random() * 5)
        while(newColor === req.user.color){
            newColor = Math.floor(Math.random() * 5)
        }
        req.user.color = newColor
        try{
            await User.findOneAndUpdate({_id:req.user.id},{
                color:req.user.color
            })
            res.json('Changed Color Scheme')
        }catch(err){
            console.log(err)
        }
    }
}    