import { Observable, interval, map, tap } from 'rxjs';

//  const o = new Observable((observer) => {
//    observer.next(200);
//    observer.next(201);
//    observer.next(202);
//  });

// o.subscribe((data) => {
//   console.log('from observable', data);
// });
// const interval = (intervalValue: number) => {
//   const o = new Observable<number>((observer) => {
//     let counter = 0;
//     const timer = setInterval(() => {
//       observer.next(counter++);
//     }, intervalValue);
//     return () => {
//       clearInterval(timer);
//     };
//   });
//   return o;
// };
// interval(2000).subscribe((data) => {
//   console.log('data from interval ', data);
// });

const stream$ = interval(2000)
  .pipe(map((x) => x * 2))
  .pipe(map((x) => x * 10))
  .pipe(tap((x) => console.log(x + 'test123')));

// stream$.subscribe((data) => console.log(data));

stream$.subscribe({
  next: (data) => console.log(data),
  error: (err) => console.error(err),
  complete: () => console.log('The stream has completed'),
});
