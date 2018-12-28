import { Subject, Observable } from 'rx';
import { onNext, onError } from './rx';

export default class State<T> {
  private stateData: Map<string, T> = new Map();
  private completed: Subject<boolean> = null;
  constructor(public fields: string[], public completedStateValue: T, getDefaultValue: () => T) {
    fields.forEach((field: string) => {
      this.stateData[field] = getDefaultValue();
    });
  }

  public subscribeCompleted(): Observable<boolean> {
    if (this.completed == null) {
      this.completed = new Subject();
      this.checkCompleted();
    }
    return this.completed;
  }

  public setState(field: string, value: T) {
    this.stateData[field] = value;
    if (this.completed != null) {
      if (value === this.completedStateValue) {
        this.checkCompleted();
      } else {
        onError(this.completed, false);
      }
    }
  }

  private checkCompleted() {
    for(let i = 0; i < this.fields.length; i++) {
      if (this.stateData[this.fields[i]] !== this.completedStateValue) {
        return;
      }
    }
    onNext(this.completed, true);
  }
}