import { BehaviorSubject, Observable } from 'rxjs';

//T means it is a generic class that can work with any data type
export class StoreItem<T> {
  private _state$: BehaviorSubject<T>;

  //BehaviorSubject requires a initial value
  protected constructor(initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
  }

  //we use this method to set the values of our variable
  //will be used by the loading method
  protected setValue(newValue: T): void {
    this._state$.next(newValue);
  }

  //this returns our data as an observable that cant use next()
  //usefull  to subcribe to and react to updates
  protected get value$(): Observable<T> {
    return this._state$.asObservable();
  }

  //this returns the array of data itself
  protected get value(): T {
    return this._state$.value;
  }
}
