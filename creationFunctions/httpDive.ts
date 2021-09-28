/**
 * RxJS provides TWO helper functions returning observables
 * when performing HTTP calls:
 *    - ajax()      -- using XMLHttpRequest
 *    - fromFetch() -- using fetch()
 *
 * [NOTE]: Angular developers will use HttpClient service
 *    which also uses RxJS and Observables and serves as
 *    a great way to handle HTTP calls. This focuses on the
 *    features built into RxJS and not cover the HttpClient service
 *
 */
import { forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { fromFetch } from 'rxjs/fetch';

/**
 * ajax()
 * The ajax() creation function wraps an XMLHttpRequest(XHR)
 *  and gives us an Observable.
 */
ajax<any>('https://random-data-api.com/api/name/random_name').subscribe(
  (data) => {
    console.log('[ajax()]Name: ', data.response.first_name);
  }
);

// The great thing is that if the response object is a JSON object
// it will automatically be parsed and provided to us as a regular
// JS object.

// Convenient error handling and composability due to being wrapped
// in an observable
//
forkJoin([
  ajax<any>('https://random-data-api.com/api/name/random_name'),
  ajax<any>('https://random-data-api.com/api/nation/random_nation'),
  ajax<any>('https://random-data-api.com/api/food/random_food'),
  // Uncomment to generate error
  //ajax<any>('https://random-data-api.com/api/error/random_error'),
]).subscribe({
  next: ([nameData, nationData, foodData]) =>
    console.log(
      `${nameData.response.first_name} is from ${nationData.response.capital} and likes ${foodData.response.dish}.`
    ),
  error: (err) => console.log('[ajax()]Error: ', err),
  complete: () => console.log('[ajax()]Success!'),
});

// -------------------------------------------------------------

/**
 * fromFetch()
 * The fromFetch() creation function returns an Observable built on top of the
 * fetch() call using the Fetch API
 *
 * Performing a simple GET call is made easy, howeveer it does handle things
 * in a low-level fashion.
 */
fromFetch('https://random-data-api.com/api/name/random_name', {
  selector: (response) => response.json(),
}).subscribe({
  next: (response) => console.log('[fromFetch()]Name: ', response.first_name),
  error: (err) => console.log('[fromFetch()]Error: ', err),
});

// fromFetch() uses the selector option which is used to tell
// which part of the response to get. It's useful as it's something
// we can then act upon.
//
import { switchMap } from 'rxjs';

fromFetch('https://random-data-api.com/api/name/random_name')
  .pipe(
    switchMap((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`[fromFetch => switchMap()]Error: ${response.status}`);
      }
    })
  )
  .subscribe({
    next: (response) => console.log('[fromFetch()]Name: ', response.first_name),
    error: (err) => console.log('[fromFetch()]Error: ', err),
  });
