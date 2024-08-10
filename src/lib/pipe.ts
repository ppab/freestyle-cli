type Fn<Input, Output> = (input: Input) => Output;

function pipe<TInitial, T1, T2, T3,T4,T5,T6, TFinal>(
    fn1: Fn<TInitial, T1>,
    fn2: Fn<T1, T2>,
    fn3: Fn<T2, T3>,
    fn4: Fn<T3, T4>,
    fn5: Fn<T4, T5>,
    fn6: Fn<T5, T6>,
    fn7: Fn<T6, TFinal>
): (arg: TInitial) => TFinal;

function pipe<TInitial, T1, T2, T3,T4,T5, TFinal>(
    fn1: Fn<TInitial, T1>,
    fn2: Fn<T1, T2>,
    fn3: Fn<T2, T3>,
    fn4: Fn<T3, T4>,
    fn5: Fn<T4, T5>,
    fn6: Fn<T5, TFinal>
): (arg: TInitial) => TFinal;

function pipe<TInitial, T1, T2, T3,T4, TFinal>(
    fn1: Fn<TInitial, T1>,
    fn2: Fn<T1, T2>,
    fn3: Fn<T2, T3>,
    fn4: Fn<T3, T4>,
    fn5: Fn<T4, TFinal>
): (arg: TInitial) => TFinal;

function pipe<TInitial, T1, T2, T3, TFinal>(
    fn1: Fn<TInitial, T1>,
    fn2: Fn<T1, T2>,
    fn3: Fn<T2, T3>,
    fn4: Fn<T3, TFinal>
): (arg: TInitial) => TFinal;

function pipe<TInitial, T1, T2, TFinal>(
    fn1: Fn<TInitial, T1>,
    fn2: Fn<T1, T2>,
    fn3: Fn<T2, TFinal>
): (arg: TInitial) => TFinal;

function pipe<TInitial, T1, TFinal>(
    fn1: Fn<TInitial, T1>,
    fn2: Fn<T1, TFinal>
): (arg: TInitial) => TFinal;

function pipe(...fns: Array<Fn<any, any>>): (arg: any) => any {
    return (arg: any): any => {
        return fns.reduce((acc, fn) => fn(acc), arg);
    };
}

