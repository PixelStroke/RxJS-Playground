import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
const log = console.log;

log('App started');
const failingHttpRequest$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.error(new Error('Timeout'));
  }, 3000);
});

failingHttpRequest$.pipe(catchError((error) => EMPTY)).subscribe({
  next: (v) => log(v),
  complete: () => log('completed.'),
});
