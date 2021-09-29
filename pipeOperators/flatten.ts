import { EMPTY, fromEvent, Observable, of } from 'rxjs';
import { catchError, concatMap, map, debounceTime } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const log = console.log;
const source$ = new Observable((subscriber) => {
  setTimeout(() => subscriber.next('A'), 2000);
  setTimeout(() => subscriber.next('B'), 5000);
});

log('App started');
//source$.pipe(concatMap(() => of(1, 2))).subscribe((v) => log(v));

// Dynamic
//

/**
 *
 *  ---A-----------B-------------------------> Time
 *     |           |
 *  [ concatMap(value => requestData(value)) ] Flatten
 *     |--1|-->    |-------5|->                Inner Subsciprtions
 *        |                |
 *  ------1----------------5-----------------> Time
 */

const endpointInput: HTMLInputElement =
  document.querySelector('input#endpoint');
const fetchButton = document.querySelector('button#fetch');

// Non-error handling:
// -------------------
// fromEvent(fetchButton, 'click')
//   .pipe(
//     map(() => endpointInput.value),
//     concatMap((v) => ajax(`https://random-data-api.com/api/${v}/random_${v}`))
//   )
//   .subscribe({
//     next: (v) => log(v),
//     error: (err) => log('Error: ', err.message),
//   });

/** Handling Errors
 *  When the first error is encountered, the subscription will be halted.
 *
 *  ---A|------------------------------------> Time
 *     |
 *  [ concatMap(value => requestData(value)) ] Flatten
 *     |--X|-->                                Inner Subsciprtions
 *        |
 *  ------X|---------------------------------> Time
 *
 *
 *  Here the error is handled but the main outter subscription is ended.
 *  ---A|------------------------------------> Time
 *     |
 *  [ concatMap(value => requestData(value)) ] Flatten
 *     |--X|-->                                Inner Subsciprtions
 *        |
 *  [         catchError(() => EMPTY)        ]
 *
 *  ------|----------------------------------> Time
 *
 *
 *
 */

// With error handling
//
fromEvent(fetchButton, 'click')
  .pipe(
    map(() => endpointInput.value),
    concatMap((v) =>
      ajax(`https://random-data-api.com/api/${v}/random_${v}`).pipe(
        debounceTime(2000),
        catchError((err) => of(`${err}`)) // Move completion notification to inner observable
      )
    )
    //catchError(() => EMPTY) // Here we move errors into an empty
  )
  .subscribe({
    next: (v) => log(v),
    error: (err) => log('Error: ', err.message),
    complete: () => log('Subscription completed'),
  });
