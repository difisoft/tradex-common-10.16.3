import SystemError from "../errors/SystemError";

const doSafe = (observable, func) => {
  try {
    func();
  } catch (e) {
    observable.onError(new SystemError(e));
    observable.onCompleted();
  }
};

export {
  doSafe
}