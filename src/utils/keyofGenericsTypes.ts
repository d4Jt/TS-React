// ## Keyof trong Generics types

// -  Keyof là một keyword trong typescript, nó cho phép ta lấy ra tất cả các key của một object

// ```ts
const devices = [
   {
      name: 'iphone',
      price: 1000,
   },
   {
      name: 'samsung',
      price: 900,
   },
   {
      name: 'oppo',
      price: 800,
   },
];

function getDevicesKeys<A, B extends keyof A>(items: A[], key: B):A[B][] {
   return items.map(item => item[key]);
}

getDevicesKeys(devices, 'name')
// ```
