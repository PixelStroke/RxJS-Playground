import { Observable, interval } from 'rxjs';
const log = console.log;

// Life is easy with this creation function
//
const intervalSub = interval(1000).subscribe({
  next: (value) => log(value),
  complete: () => log('Completed!'),
});

// What is happening in the timer creation function
//
const interval$ = new Observable<number>((subscriber) => {
  let counter = 0;
  const intervalId = setInterval(() => {
    log('Timeout!');
    subscriber.next(counter++);
    subscriber.complete();
  }, 2000);

  return () => clearTimeout(intervalId);
});

const intervalObsSub = interval$.subscribe({
  next: (v) => log(v),
  complete: () => log('Completed!'),
});

setTimeout(() => {
  intervalSub.unsubscribe();
  intervalObsSub.unsubscribe();
}, 5000);
