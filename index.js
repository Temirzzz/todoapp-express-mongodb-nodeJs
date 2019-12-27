const express = require('express');

const app = express();

const path = require('path');

const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');

const exphbs = require('express-handlebars');

const todoRoutes = require('./routes/todos');


const hbs = exphbs.create({
    defaultLayout : 'main',
    extname       : 'hbs'
});


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');


app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, 'publick')));

app.use(todoRoutes);

async function start () {
    try {
        await mongoose.connect('mongodb+srv://Temirzzz:Ntvbh123@cluster0-5y16a.mongodb.net/todos', {
            useNewUrlParser : true,
            //useFindAndModify: false, // устаревшая технология
            useUnifiedTopology : true  // - вместо нее
        })
        app.listen(PORT, () => {
            console.log('Server been started');
        })
    } catch (e) {
        console.log(e);        
    }
}

start ();

