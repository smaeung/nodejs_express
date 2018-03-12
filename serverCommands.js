const EventEmitter = require('events');

class ServerCommands extends EventEmitter{
    
    constructor(events){
        super();
        events.on('command', (commandType, req, res) => {
            console.log("hello, server commands"+ JSON.stringify(req.body));
            switch(commandType){
                case 'addTask':
                case 'removeTask':
                case 'listTask':
                    this[commandType](req, res);
                    break;
                default:
                    res.status(400).send("Unknown command...");
            }
        });
    }

    addTask(req, res){
        res.status(201).send();
    }

    removeTask(req, res){
        res.status(201).send({ response : 'add...'});
    }

    listTask(req, res){
        res.status(200).send({ response : 'add...'});
    }


}

module.exports = (events) => new ServerCommands(events);