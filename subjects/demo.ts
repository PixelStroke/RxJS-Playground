import { fromEvent, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const emitButton = document.querySelector('button#emit');
const inputElement: HTMLInputElement = document.querySelector('#value-input');
const subscribeButton = document.querySelector('button#subscribe');

const value$ = new Subject<string>();

//fromEvent(emitButton, 'click').subscribe(() => value$.next(inputElement.value));
fromEvent(emitButton, 'click')
  .pipe(map(() => inputElement.value))
  .subscribe(value$);

fromEvent(subscribeButton, 'click').subscribe(() => {
  console.log('New Subscription');
  value$.subscribe((v) => console.log(v));
});
