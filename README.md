# Introduction

A Simple ToDo App is built using the MVC Architecture, we have also implemented "authorization" so folx can sign up, customize & personalize the app 

---

> Be sure to add that lovely star 😀 and fork it for your own copy

---

# Objectives

- It's a beginner level app created to understand how MVC concept and logins are added

---

# Who is this for? 

- It's for beginners & intermediates with little more experience, to help understand the various aspects of building a node app with some complex features

---

# Packages/Dependencies used 

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

---

# Install all the dependencies or node packages used for development via Terminal

`npm install` 

---

# Things to add

- Create a `.env` file and add the following as `key: value` 
  - PORT: 2121 (can be any port example: 3000) 
  - DB_STRING: `your database URI` 
 ---
 
 Have fun testing and improving it! 😎


- Edit History :
- 9-1-2022
  - added color property to user model in models/user.js
  - modified statement in controllers/todos.js that passed color property to todos.ejs along with the retrieved todos list
  - tried to add switch statement to select css files with dark mode options (the switch statement is incomplete and currently breaks the page)
  - Updated switch statement in .ejs so it works when the user logs in and the correct css will be loaded base on color property

- 9-2-2022
  - further changes to views/todos.ejs for switch case
  - added more color options (I've got no attachment to the color selection, please change them if you'd like)
