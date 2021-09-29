import { ajax } from 'rxjs/ajax';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const log = console.log;
const randomName$ = ajax<any>(
  `https://random-data-api.com/api/name/random_name`
).pipe(map((data) => data.response.first_name));
const randomNation$ = ajax<any>(
  `https://random-data-api.com/api/nation/random_nation`
).pipe(map((data) => data.response.capital));
const randomFood$ = ajax<any>(
  `https://random-data-api.com/api/food/random_food`
).pipe(map((data) => data.response.dish));

forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
  ([name, capital, dish]) =>
    log(`${name} is from ${capital} and their favorite food is ${dish}`)
);
