const todos = require('../schemas/todosSchema')


const getAll = async (req, res) => {
    const userId = req.user.id
    try {
        const datas = await todos.find({ userId })
        return res.status(200).json({ status: true, data: datas })
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }


}
const addTodo = async (req, res) => {
    const { title, description, isCompleted } = req.body
    const userId = req.user.id
    const newTask = new todos({
        title, description, userId
    })

    newTask.save().then(() => {
        return res.status(200).json({
            status: true, code: 200, messgae: "Task added Successfully"
        })
    }).catch(error => {
        // console.log(error)
        return res.status(500).json({
            status: false,
            message: error.message
        })
    })

}
const deleteTodo = async (req, res) => {
    const { id } = req.params

    try {
        todos.findByIdAndDelete({ _id: id }).then(() => {
            return res.status(200).json({
                status: true,
                message: "Task deleted Successfully"
            })
        }).catch((error) => {
            return res.status(500).json({
                status: false,
                message: error.message
            })
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }





}
const updateTodo = async (req, res) => {
const {title, description, isCompleted} = req.body;
    const { id } = req.params
    try{
        todos.findByIdAndUpdate({_id: id}, {title: title ,
             description: description,
              isCompleted: isCompleted,
        }).then(()=> {
            return res.status(200).json({status: true, message : " task updated Succeessfully"})
        }).catch((error) => {
            return res.status(500).json({
                status: false,
                message: error.message
            })
        })
    }
    catch(error){
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
    


}

module.exports = { getAll, addTodo, deleteTodo, updateTodo }