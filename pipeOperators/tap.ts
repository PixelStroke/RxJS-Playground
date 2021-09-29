import { of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

of(1, 7, 3, 6, 2)
  .pipe(
    tap({
      subscribe: () => console.log('--- Subsciprtion started ---'),
      finalize: () => console.log('--- Subscription ended ---'),
    }),
    tap((v) => console.log('Spy (pre-map): ', v)),
    map((v) => v * 2),
    tap((v) => console.log('Spy (post-map): ', v)),
    filter((v) => v > 5),
    tap((v) => console.log('Spy (post-filter): ', v))
  )
  .subscribe((v) => console.log('Output: ', v));
