const router= require('express').Router()
const{ getAll, addTodo} = require('../controller/todoController')
const requireAuth = require('../controller/middlewares/authMiddleWare')
router.post('/api/todo', requireAuth,addTodo)
router.get('/alltodos',requireAuth, getAll)



module.exports = router