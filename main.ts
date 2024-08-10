import * as process from 'process';
import {taskManager} from "./src/tasks/taks-manager";
import {resolveTaskArgs} from "./src/lib/resolve-task-args";


const main = () => {
    const args = process.argv.splice(2)
    const task = args[0]
    const taskArgs = resolveTaskArgs(args.splice(1))

    if (!task) {
        throw new Error("No  Command args provided")
    }

    taskManager.dispatch(task, taskArgs)
};

main();