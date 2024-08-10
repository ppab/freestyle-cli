type StrategyItems = {
    name: string;
    args: { [key: string]: any }; // more flexible args type
}

type genericFn = (arg: any) => void;

type KeyWithFn = {
    [key: string]: genericFn;
}

type KeyWithStrategyItems = {
    [key: string]: StrategyItems[];
}

type StrategyDispatcher = {
    list: StrategyItems[];

    ctx?: { [key: string]: any }; // allow ctx to hold any type
}

export const dispatcher = (strategies: KeyWithFn) => ({list, ctx}: StrategyDispatcher) => {

    for (let item of list) {
        const fn = strategySelector(item.name, strategies);
        const args = {...item.args, ...ctx,};
        fn(args);
    }
}


export const selectTask = (taskName: keyof KeyWithStrategyItems, tasks: KeyWithStrategyItems): StrategyItems[] => {
    const selected = tasks[taskName];
    if (!selected) {
        throw new Error(`Strategy ${taskName} not supported, available strategies: ${Object.keys(tasks).join(', ')}`);
    }
    return selected;
}


const strategySelector = (strategyName: keyof KeyWithFn, strategies: KeyWithFn): genericFn => {
    const selected = strategies[strategyName];
    if (!selected) {
        throw new Error(`Strategy ${strategyName} not supported, available strategies: ${Object.keys(strategies).join(', ')}`);
    }
    return selected;
}

export class ActionManager {
    private task: StrategyItems[]

    constructor(private readonly tasks: KeyWithStrategyItems, private strategies: KeyWithFn) {
        this.tasks = tasks
        this.strategies = strategies
    }

    setTask = (taskName: keyof KeyWithStrategyItems): void => {
        const selected = this.tasks[taskName];
        if (!selected) {
            throw new Error(`Task ${taskName} not supported, available tasks: ${Object.keys(this.tasks).join(', ')}`);
        }
        this.task = selected
    }

    strategySelector = (strategyName: keyof KeyWithFn, strategies: KeyWithFn): genericFn => {
        const selected = strategies[strategyName];
        if (!selected) {
            throw new Error(`Strategy ${strategyName} not supported, available strategies: ${Object.keys(strategies).join(', ')}`);
        }
        return selected;
    }

    dispatch(task, ctx) {
        this.setTask(task)

        if (!this.task) {
            throw new Error("You should setActions first");
        }
        for (let item of this.task) {
            const fn = this.strategySelector(item.name, this.strategies);
            const args = {...item.args, ...ctx,};
            fn(args);
        }
    }
}

