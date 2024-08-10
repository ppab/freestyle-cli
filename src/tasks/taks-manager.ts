import {tasks} from "./tasks";
import {ActionManager} from "../lib/list-dispatcher";
import {commandStrategies} from "../commands/commands.strategies";

export const taskManager = new ActionManager(tasks, commandStrategies)
