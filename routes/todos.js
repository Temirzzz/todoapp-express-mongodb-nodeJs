const {Router} = require('express');
const Todo = require('../models/Todo');
const router = Router();



router.get('/', async (req, res) => {
    const todos = await Todo.find({}) // получаем список всех todo

    res.render('index', {
        title : 'Todos List', 
        isIndex: true, // создаем флаг isIndex
        todos
    });    
})

router.get('/create', (req, res) => {
    res.render('create', {
        title : 'Create todo',
        isCreate : true // создаем флаг isCreate для использования 
    });
})


router.post('/create', async (req, res) => {
    const todo = new Todo({
        title : req.body.title
    })

    await todo.save();
    res.redirect('/');
})


router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id);

    todo.completed = !!req.body.completed; // с помощью !! преобразовываем в болеан
    await todo.save();

    res.redirect('/');
})

module.exports = router;