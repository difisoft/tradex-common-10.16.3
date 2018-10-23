declare function forEachWithPromise<T, E>(array: T[], itemProcess: (t: T, index?: number) => Promise<E>, stopCondition?: (index: number, t: T, e?: E) => boolean): Promise<any>;
export { forEachWithPromise, };
