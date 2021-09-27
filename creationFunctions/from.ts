/**
 * FROM
 *
 */

import { from } from 'rxjs';
const log = console.log;

from(['Shon', 'Stephanie', 'Olive']).subscribe({
  next: (value) => log(value),
  complete: () => log('Completed'),
});

// Converting a Promise to an Observable
//
const somePromise = new Promise((resolve, reject) => {
  //resolve('Resolved');
  reject('Rejected!');
});

// Conversion:
//
const observableFromPromise$ = from(somePromise);
observableFromPromise$.subscribe({
  next: (value) => log(value),
  error: (err) => log('Error: ', err),
  complete: () => log('Completed'),
});
