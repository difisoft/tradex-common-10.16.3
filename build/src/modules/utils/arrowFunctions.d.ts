/// <reference types="rx-core" />
/// <reference types="rx-lite" />
import { Observer } from 'rx';
declare const doSafe: (observable: Observer<any>, func: any) => void;
export { doSafe };
