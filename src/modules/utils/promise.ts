function forEachWithPromise<T, E>(array: T[], itemProcess: (t: T, index?: number) => Promise<E>
    , stopCondition?: (index: number, t: T, e?: E) => boolean): Promise<any> {
  return new Promise<any>((resolve: (value?: any | PromiseLike<any>) => void, reject: (reason: any) => void) => {
    let loop2: (index: number) => void = null;
    const loop: (index: number) => void = (index: number) => {
      if (index >= array.length) {
        resolve(null);
      }
      if (stopCondition && stopCondition(index, array[index])) {
        resolve({ index: index });
        return;
      }
      itemProcess(array[index], index).then(
        (e: E) => {
          if (stopCondition == null || !stopCondition(index, array[index], e)) {
            loop2(index + 1);
          } else {
            resolve({ index: index });
          }
        }
      ).catch(reject)
    }
    loop2 = loop;
    loop(0);
  });
}

export {
  forEachWithPromise,
}