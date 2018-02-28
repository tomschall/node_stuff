var Todo = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function(app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended:true }));
    
    app.get('/api/todos/:uname', function(req, res) {
        Todo.Todos.find({ username:req.params.uname }, function(err, todos) {
            if (err) throw err; 
            res.send(todos);
        });
    });
    
    app.get('/api/todo/:id', function(req, res) {
        var id = Todo.Mongoose.Types.ObjectId(req.params.id);
        Todo.Todos.findById({ _id:id }, function(err, todo) {
            if (err) throw err;
            res.send(todo);
        });     
    });
    
    app.post('/api/todo', function(req, res) {
        if (req.body.id) { 
            Todo.Todos.findByIdAndUpdate(req.body.id, { todo:req.body.todo, isDone:req.body.isDone, hasAttachment:req.body.hasAttachment }, function(err, todo){
                if (err) throw err;
                res.send('success');
            });
        } else {
            var newTodo = Todo.Todos({
                username: 'test',
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            });
            newTodo.save(function(err) {
                if (err) throw err; 
                res.send('Success!');
            });
        }    
    });
    
    app.delete('/api/todo', function(req, res) {
        Todo.Todos.findByIdAndRemove(req.body.id, function(err) {
            if (err) throw err;
            res.send('Successfully deleted!!');
        });
    });
    
}