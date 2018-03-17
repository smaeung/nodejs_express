const EventEmitter = require('events');

let taskList = [];
/**
 * ServerCommands is to invoke event commands with the given request and response
 */
class ServerCommands extends EventEmitter{

    /**
     * constructor to listen event command
     *
     * @param events
     */
    constructor(events){
        super();
        // register event as command , it will be notified
        // when 'command' is invoked from outside.
        // it passes three parameters
        events.on('command', (commandType, req, res) => {
            switch(commandType){
                case 'addTask':
                case 'removeTask':
                case 'listTask':
                    // this will be matched with name of function in the ServerCommands class
                    // and it will be invoked with the given req, and res
                    this[commandType](req, res);
                    break;
                default:
                    // otherwise, to send error message if unknown command is given.
                    res.status(400).send("Unknown command...");
            }
        });
    }

    /**
     * add a task ,
     * for demo purpose, it is simple inserting data into array structure without validation.
     *
     * @param req - client request to be retived information
     * @param res - response instance to reply back to client
     */
    addTask(req, res){
        taskList.push({"taskId": req.body.taskId, "taskName": req.body.taskName});
        res.status(201).send();
    }

    /**
     * remove the given task , otherwise return with error
     * @param req - client request
     * @param res - response to click
     */
    removeTask(req, res){
        let taskSize = taskList.length;
        taskList = taskList.filter(item => item.taskId !== req.params.taskId);
        (taskSize > taskList.length) ? res.status(201).send() : res.status(404).send();
    }

    /**
     * display all tasks
     * @param req
     * @param res
     */
    listTask(req, res){
        res.status(200).send(taskList);
    }
}
// export to outside of module with injected events
module.exports = (events) => new ServerCommands(events);
