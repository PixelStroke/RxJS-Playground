import { ajax } from 'rxjs/ajax';
import { forkJoin, Observable } from 'rxjs';

/**
 *
 *  forkJoin
 *
 * ---------------A----C|-> Independent
 * ----B|-----------------> Independent
 *
 * -------------[A, B, C]-> forkJoin
 */
const log = console.log;
const randomName$ = ajax(`https://random-data-api.com/api/name/random_name`);
const randomNation$ = ajax(
  `https://random-data-api.com/api/nation/random_nation`
);
const randomFood$ = ajax(`https://random-data-api.com/api/food/random_food`);

// Independent observable subscriptions
//
// randomName$.subscribe((ajaxResponse) => log(ajaxResponse.response.first_name));
// randomNation$.subscribe((ajaxResponse) => log(ajaxResponse.response.capital));
// randomFood$.subscribe((ajaxResponse) => log(ajaxResponse.response.dish));

// Array of observables subscribed in order and joined
//
forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
  ([nameAjax, nationAjax, foodAjax]) =>
    log(
      `${nameAjax.response.first_name} is from ${nationAjax.response.capital} and their favorite food is ${foodAjax.response.dish}`
    )
);

/**
 *
 * forkJoin Error handling
 *
 * ----A|---------------->
 * -----------X---------->
 *
 * -----------X----------> forkJoin
 */
setTimeout(() => log('---------- Example forkJoin failure ----------'), 2500);
const a$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next('A');
    subscriber.complete();
  }, 4000);
  return () => {
    log('A teardown');
  };
});

const b$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.error('Failure!');
  }, 3000);

  return () => {
    log('B teardown');
  };
});

forkJoin([a$, b$]).subscribe({
  next: (value) => log(value),
  error: (err) => log('Error: ', err),
});
