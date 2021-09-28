import { filter, Observable } from 'rxjs';
/**
 * The filter will either pass the value through to output or not
 * based on the condition
 *
 * filter(news => news.category === 'Stocks')
 *
 *  <--------------News---------------->
 *  --A-------B-----C---D------E|-------> Observer
 *    |       |     |   |      |
 *  --X-------B-----X---D------X|-------> Filter
 *            |         |
 *  ----------B---------D-------|-------> Subscriber
 */

interface NewsItem {
  category: 'Politics' | 'Stocks';
  content: string;
}

const newsFeed$ = new Observable<NewsItem>((subscriber) => {
  setTimeout(() => {
    subscriber.next({ category: 'Stocks', content: 'B' });
  }, 1000);
  setTimeout(() => {
    subscriber.next({ category: 'Politics', content: 'A' });
  }, 2000);
  setTimeout(() => {
    subscriber.next({ category: 'Politics', content: 'C' });
  }, 3500);
  setTimeout(() => {
    subscriber.next({ category: 'Stocks', content: 'D' });
  }, 5000);
  setTimeout(() => {
    subscriber.next({ category: 'Stocks', content: 'E' });
  }, 6000);
  setTimeout(() => {
    subscriber.next({ category: 'Politics', content: 'C' });
  }, 7000);
});

const politicsNewsFeed$ = newsFeed$.pipe(
  filter((item) => item.category === 'Politics')
);

politicsNewsFeed$.subscribe((item) => console.log(item));

const stocksNewsFeed$ = newsFeed$.pipe(
  filter((item) => item.category === 'Stocks')
);

stocksNewsFeed$.subscribe((item) => console.log(item));
