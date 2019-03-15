export interface IAggregateCursor<T> {
    hasNext(): Promise<boolean>;
    next(): Promise<T | null>;
    close(): Promise<any | void>;
}
export declare function forEachAggCursor<T>(cursor: IAggregateCursor<T> | any, callback: (item: T) => boolean | void): Promise<any>;
export declare function mapAggCursor<T, F>(cursor: IAggregateCursor<T> | any, transform: (item: T) => F): Promise<F[]>;
