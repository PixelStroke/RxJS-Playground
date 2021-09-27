import { Observable, timer } from 'rxjs';
const log = console.log;

// Life is easy with this creation function
//
const timerSub = timer(2000).subscribe({
  next: (value) => log(value),
  complete: () => log('Completed!'),
});

// What is happening in the timer creation function
//
const timer$ = new Observable<number>((subscriber) => {
  const timeoutId = setTimeout(() => {
    log('Timeout!');
    subscriber.next(0);
    subscriber.complete();
  }, 2000);

  return () => clearTimeout(timeoutId);
});

const timerObsSub = timer$.subscribe({
  next: (v) => log(v),
  complete: () => log('Completed!'),
});

setTimeout(() => {
  timerSub.unsubscribe();
  timerObsSub.unsubscribe();
  log('Unsubscribed');
}, 1000);
