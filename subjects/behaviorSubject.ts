import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
// Behavior Subject works as follows

/**
 * Imagine a sports game being broadcasted
 * Each new score is displayed on the screen (the behavior subject)
 * As each new subscription is added, the behavior subject Sends
 * a next notification with the latest state of the score.
 *
 * The subscriber then can react to the latest emission
 */

const loggedInSpan: HTMLElement = document.querySelector('span#logged-in');
const loginButton: HTMLElement = document.querySelector('button#login');
const logoutButton: HTMLElement = document.querySelector('button#logout');
const printStateButton: HTMLElement =
  document.querySelector('button#print-state');

// No initial starting state
//const isLoggedIn$ = new Subject<boolean>();

// Initial starting state
const isLoggedIn$ = new BehaviorSubject<boolean>(false);

fromEvent(loginButton, 'click').subscribe(() => isLoggedIn$.next(true));
fromEvent(logoutButton, 'click').subscribe(() => isLoggedIn$.next(false));

// Login/Logout Buttons
isLoggedIn$.subscribe((isLoggedIn) => {
  logoutButton.style.display = isLoggedIn ? 'block' : 'none';
  loginButton.style.display = isLoggedIn ? 'none' : 'block';
});

// Navigation bar
isLoggedIn$.subscribe(
  (isLoggedIn) => (loggedInSpan.innerText = isLoggedIn.toString())
);

//
fromEvent(printStateButton, 'click')
  .pipe(withLatestFrom(isLoggedIn$))
  .subscribe(([event, isLoggedIn]) =>
    console.log('User is logged in: ', isLoggedIn)
  );
