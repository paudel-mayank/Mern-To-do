const router= require('express').Router()
const{ getAll, addTodo,deleteTodo, updateTodo} = require('../controller/todoController')
const requireAuth = require('../middlewares/authMiddleWare')


router.post('/add-todo', requireAuth,addTodo)
router.get('/alltodos',requireAuth, getAll)
.delete("/delete/:id", requireAuth, deleteTodo )
router.patch("/update/:id", requireAuth,updateTodo )




module.exports = router