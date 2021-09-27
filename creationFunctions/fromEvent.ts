/**
 * fromEvent
 *
 * Purpose
 * - DOM EventTarget
 * - Node.js EventEmitter
 * - jQuery Events
 *
 * subscribe()   <---> addEventListener()
 * unsubscribe() <---> removeEventListener()
 */

import { fromEvent, Observable } from 'rxjs';
const log = console.log;
const triggerButton = document.querySelector('button#triggerBtn');

// fromEvent replaces the below code
//
// const triggerClick$ = new Observable<MouseEvent>((subscriber) => {
//   const clickHandlerFn = (event) => {
//     log('event callback');
//     subscriber.next(event);
//   };

//   triggerButton.addEventListener('click', clickHandlerFn);

//   return () => {
//     triggerButton.removeEventListener('click', clickHandlerFn);
//   };
// });

// const triggerSub = triggerClick$.subscribe({
//   next: (event) => log(event.type, event.x, event.y),
// });

const subsc = fromEvent<MouseEvent>(triggerButton, 'click').subscribe({
  next: (event) => log(event.type, event.x, event.y),
});

setTimeout(() => {
  log('unsubscribe');
  // triggerSub.unsubscribe();
  subsc.unsubscribe();
}, 5000);
