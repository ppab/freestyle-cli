import * as process from 'process';
import {taskManager} from "./src/tasks/taks-manager";
import {resolveTaskArgs} from "./src/lib/resolve-task-args";
import {FileManager} from "./src/lib/fs-utils/FileManager";


const main = () => {
    const args = process.argv.splice(2)
    const task = args[0]
    const taskArgs = resolveTaskArgs(args.splice(1))
    console.log("task", task)
    console.log("taskArgs", taskArgs)


    if (!task) {
        throw new Error("No  Command args provided")
    }
    const customTasks = taskArgs.ctx["TASKS"]
    if (customTasks) {
        taskManager.setCustomTasks(customTasks)
    }

    taskManager.dispatch(task, taskArgs)
};

main();