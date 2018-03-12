var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var morgan = require('morgan');
const EventEmitter = require('events');
const serverEvents = new EventEmitter();
// inject the serverEvents into serverCommands
var serverCommands = require('./serverCommands')(serverEvents);


// set port number
var port = process.env.PORT || 8080;
app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());
app.use(morgan('taskListManagerLog'));

// API Route
app.get('/', function(req, res){
    res.send("please, use API at http://localhost:"+port +"/tasks");
});


// start server with port
app.listen(port);
console.log('API for Task List Manager at http://localhost:'+ port);


// API Routes
var apiTaskListRoutes = express.Router();
// tasks
apiTaskListRoutes.post('/tasks', function(req, res){
    serverEvents.emit('command', 'addTask', req, res);
});

// remove task
apiTaskListRoutes.delete('/tasks/:taskId', function(req, res){
    serverEvents.emit('command', 'removeTask', req, res);
});

// list task
apiTaskListRoutes.get('/tasks', function(req, res){
    serverEvents.emit('command', 'listTask', req, res);
});
// register all defined APIs into express using use()
app.use('/', apiTaskListRoutes);

