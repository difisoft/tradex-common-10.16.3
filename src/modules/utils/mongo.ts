export interface IAggregateCursor<T> {
  hasNext(): Promise<boolean>;
  next(): Promise<T | null>;
  close(): Promise<any|void>;
}

export function forEachAggCursor<T>(cursor: IAggregateCursor<T> | any, callback: (item: T) => boolean|void): Promise<any> {
  return new Promise((resolve: (data: T[]) => void, reject: (err: Error) => void) => {
    let process: () => void;
    const closeReject = (err: Error) => {
      reject(err);
      cursor.close().then().catch();
    };
    process = () => {
      cursor.hasNext().then((has: boolean) => {
        if (has) {
          cursor.next().then((data: T) => {
            let result: boolean | void;
            try {
              result = callback(data);
            } catch (e) {
              closeReject(e);
              return;
            }
            if (result === false) {
              cursor.close().then(resolve).catch(reject);
            } else {
              process();
            }
          }).catch(closeReject);
        } else {
          cursor.close().then(resolve).catch(reject);
        }
      }).catch(closeReject);
    };
    process();
  });
}

export function mapAggCursor<T, F>(cursor: IAggregateCursor<T> | any, transform: (item: T) => F): Promise<F[]> {
  return new Promise((resolve: (data: F[]) => void, reject: (err: Error) => void) => {
    const results: F[] = [];
    let process: () => void;
    const closeReject = (err: Error) => {
      reject(err);
      cursor.close().then().catch();
    };
    process = () => {
      cursor.hasNext().then((has: boolean) => {
        if (has) {
          cursor.next().then((data: T) => {
            try {
              results.push(transform(data));
            } catch (e) {
              closeReject(e);
              return;
            }
            process();
          }).catch(closeReject);
        } else {
          cursor.close().then(() => resolve(results)).catch(reject);
        }
      }).catch(closeReject);
    };
    process();
  });



  return new Promise((resolve: (data: F[]) => void, reject: (err: Error) => void) => {
    const results: F[] = [];
    cursor.each((error: Error, result: T) => {
      if (error != null) {
        reject(error);
      } else {
        try {
          results.push(transform(result));
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}
