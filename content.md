# Interview question

-  Sự khác nhau giữa useState và useRef ?
   useState: để quản lý State giá trị state thay đổi thì components render lại
   useRef: tương tác với DOM, timer (setTimeout,...) k render lại components
   `<div ref={divRef}></div>`
   `divRef.current`
   `divRef.current.style.backgroundColor`

          + nếu BE trả về html thì k dùng ref đc

-  useEffect hoạt động như thế nào ? Và nó dùng để làm gì ?
   Khi component mounted -> clean up effects -> main effects
   `useLayoutEffect`

<!-- Types-->

# Primitives types

-  typeof
-  Type Assignment
-  Number Types
-  String Types
-  Boolean Types

# Structural types

-  Object
-  Array
-  Tuple (1 mảng cố định các phần tử và các kiểu dữ liệu trong phần tử đó)
   string[] -> ['alpha', 'beta', 'gama']
   [number, string] -> [123, 'Dat']
   contact: [number, string] = [0123456789, 'dat@gmail.com']
-  Enum (tập hợp các hằng số)
    <!-- const ADMIN = 'ADMIN';
    const DEV = 'DEV';
    const USER = 'USER';
    permission: string;
    -> permission = ADMIN -->
   => enum Permission {
   ADMIN = 'ADMIN',
   DEV = 'DEV',
   USER = 'USER',
   }
   permission: Permission;
   -> permission: Permission.ADMIN
-  Any (bất kì dữ liệu cũng được hết)
   const reviews: any[] = [{}];
   const date: any;
    <!-- hạn chế dùng -->

-  Union (hoặc kiểu dữ liệu này hoặc kiểu dữ liệu kia)
   const date: string | number;
   const arr: (string | number)[];

-  Literal (na ná giống Tuple, nhưng kphai array)
   type Age = 18 | 30 | 40; (chỉ được sử dụng 1 trong 3)
   age: Age;
   -> age = 30;

-  Function
   có trả về hoặc không trả về
   function nhap(a: number, b: number):void {}
   function tong(a: number, b: number): number {}
    <!-- nếu return khác kiểu dữ liệu sẽ báo lỗi -->

-  Void
-  unknown

   ```ts
   let aNumber: unknown;
   aNumber = 100;
   aNumber.toFixed(2); // sai
   bởi vì type unknown là không biết kiểu của nó là gì
   => if (typeof aNumber === 'number') {
   aNumber.toFixed(2);
   }
   ```

-  never (không chứa 1 giá trị gì cả, đại diện cho việc function trả về 1 lỗi)
   function raiseError(err: string): never {
   throw new Error(err);
   }

# Interface

```ts
// const product: {
//    name: string;
//    brand: string;
//    color: string;
// } = {
//    name: 'car',
//    brand: 'bmw',
//    color: 'red',
// };

=> interface Product {
   name: string;
   brand: string;
   color: string;
}
const product: Product = {
   name: 'car',
   brand: 'bmw',
   color: 'red',
};
```

```ts
function addProduct(product: Product) {
   //
}

addProduct(product);
```

```ts
interface ProductNewFeature extends Product {
   speed?: string;
}
```

có thể khai báo trùng, sẽ merge lại

```ts
interface ProductNewFeature {
   wheel?: string;
}
```

có thể tạo 1 type mới (assertions)

```ts
type FinalProduct = Product & ProductNewFeature;
```

# Function Overloading

trong ts có thể viết function trùng tên, số lượng parameter giống nhau hoặc khác, khác types và giống hoặc khác return types

```ts
function total(a: number, b: number): number;
function total(a: string, b: string): string;
function total(a: any, b: any) {
   return a + b;
}

interface Coordinate {
   x: number;
   y: number;
}
// {x: number, y: number}: Coordinate
// function parseCoordinateFromObject(obj: Coordinate): Coordinate {
//    return {
//       ...obj,
//    };
// }
// // x: 10, y: 20
// function parseCoordinateFromNumbers(x: number, y: number): Coordinate {
//    return {
//       x,
//       y,
//    };
// }

// parseCoordinateFromObject({x: 10, y:20});
// parseCoordinateFromNumbers(10, 20);

==>
function parseCoordinate(obj: Coordinate): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;
function parseCoordinate(arg1: any, arg2?: any): Coordinate {
   let coord = {
      x: arg1 as number,
      y: arg2 as number
   }
   if (typeof arg1 === 'object') {
      coord = {
         ...(arg1 as Coordinate),
      }
   } else {
      coord = {
         x: arg1 as number,
         y: arg2 as number
      }
   }
   return coord;
}

parseCoordinate({x: 10, y: 20});
parseCoordinate(10, 20);
```

# Intersection types (&), Type casting, Type assertion

-  Intersection types

   ```ts
   interface IBusinessPartner {
      name: string;
      credit: number;
   }
   interface IIdentity {
      id: number;
      name: string;
   }
   interface IContact {
      email: string;
      phone: string;
   }

   /*
   sử dụng dấu & để kết hợp 2 interface lại với nhau (khi 2 interface có 1 property trùng nhau) và sẽ lấy property của 2 interface đó (không bị trùng) và sẽ báo lỗi nếu 2 interface có 1 property trùng nhau nhưng khác kiểu dữ liệu (ví dụ: 1 interface có name: string, 1 interface có name: number)
   */
   type Employee = IIdentity & IContact;
   type Customer = IBusinessPartner & IContact;

   let dat: Employee = {
      email: 'dat@gmail.com',
      id: 1,
      name: 'dat',
      phone: '123456',
   };
   let tuan: Customer = {
      name: 'tuan',
      credit: 1000,
      email: 'tuan@gmail.com',
      phone: '123412',
   };
   ```

-  Type casting (chuyển đổi kiểu dữ liệu, convert element)
   ```ts
   const input = document.getElementById('input') as HTMLInputElement;
   ```
-  Type assertion (chuyển đổi kiểu dữ liệu)
   ```ts
   coord = {
      x: arg1 as number,
      y: arg2 as number,
   };
   ```

# More function types

## Normal function

```ts
function add(a: number, b: number): number {
   return a + b;
}
```

## Arrow function

```ts
const add = (a: number, b: number): number => {
   return a + b;
};
```

## Optional parameter

```ts
function add(a: number, b?: number): number {
   return a + b;
}
```

## Default parameter

```ts
function add(a: number, b: number = 0): number {
   return a + b;
}
```

## Union type

```ts
function format(
   title: string,
   desc: string,
   position: 'top' | 'bottom' | 'left' | 'right'
) {
   //
}
```

## Void type

không return

```ts
function format(
   title: string,
   desc: string,
   position: 'top' | 'bottom' | 'left' | 'right'
): void {
   //
}
```

## Promise functions

```ts
const fetchData = (url: string): Promise<string> =>
   Promise.resolve(`Get data from ${url}`);
```

## Rest parameters

```ts
function sum(...numbers: number[]): number {
   return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4, 5);
```

## With callback

```ts
function handleFile(text: string, callback: () => void): void {
   console.log(text);
   callback();
}
```

## Params with params

```ts
function handleChangeArray(
   numbers: number[],
   change: (n: number) => number
): number[] {
   return numbers.map(item => change(item));
}

handleChangeArray([1, 2, 3, 4, 5], n => n * 2);
```

## Function as types

```ts
type ChangeArray = (n: number) => number;

function handleChangeArray(numbers: number[], change: ChangeArray): number[] {
   return numbers.map(item => change(item));
}

handleChangeArray([1, 2, 3, 4, 5], n => n * 2);
```

## Function return function

```ts
function handleValue(val: number): (n: number) => number) {
   return (n: number) => n * val;
}

const value = handleValue(2);
value(10);
```

# More Tuple types

```ts
// useState const [value, setValue] = useState('hello);
// setValue('hello');
function simpleUseState(
   value: string
): [() => string, (newValue: string) => void] {
   return [
      () => value,
      (newValue: string) => {
         value = newValue;
      },
   ];
}

const [strGetter, strSetter] = simpleUseState('hello');
console.log(strGetter()); // hello
strSetter('bye');
console.log(strGetter()); // bye
```

# Generics types

Khi sử dụng types mà nó đa dạng có thể thay đổi theo tham số truyền vào như string, number, boolean, object, array, ...

```ts
function simpleUseState<T>(value: T): [() => T, (newValue: T) => void] {
   return [
      () => value,
      (newValue: T) => {
         value = newValue;
      },
   ];
}

const [strGetter, strSetter] = simpleUseState('hello');
const [strGetter1, strSetter1] = simpleUseState(100);
const [strGetter2, strSetter2] = simpleUseState(true);

VD: interface Rank<RankItem> {
   item: RankItem;
   rank: number;
}
function ranker<RankItem>(
   items: RankItem[],
   rank: (v: RankItem) => number
): RankItem[] {
   const ranks: Rank<RankItem>[] = items.map(item => ({
      item,
      rank: rank(item),
   }));

   return ranks.map(rank => rank.item);
} // [1,2,3,4,5,6] (v) => v * 2

ranker([1, 2, 3, 4, 5, 6], v => v * 2);
```

## Keyof trong Generics types

-  Keyof là một keyword trong typescript, nó cho phép ta lấy ra tất cả các key của một object

```ts
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
```

# Utility types
```ts
interface Todo {
   title: string;
   description: string;
}

type NewToDo = Partial<Todo>;

function updateTodo(todo: Todo, newTodo: NewToDo) {
   return {
      ...todo,
      ...newTodo
   }
}

// Required<T>
type RequiredTodo = Required<Todo>;

// Readonly<T>
interface Book {
   title: string;
}

const life: Book = {
   title: 'The life of book'
}

const game: Readonly<Book> = {
   title: 'The game of book'
}

game.title = 'The game of book 2' // error because game is readonly

// Record<K, T>
interface CatInfo {
   age: number;
   breed: string;
}

type CatName = 'miffy' | 'boris' | 'mordred';

const cats: Record<CatName, CatInfo> = {
   miffy: { age: 10, breed: 'Persian' },
   boris: { age: 5, breed: 'Maine Coon' },
   mordred: { age: 16, breed: 'British ShortHair' }
}

const cats2: Record<number, string> = {
   1: 'One',
   2: 'Two',
   3: 'Three'
}

// Pick<T, K> lấy ra cái gì đó mà mình muốn
interface TodoS {
   title: string;
   description: string;
   completed: boolean;
}

type TodoPreview = Pick<TodoS, 'title' | 'completed'>;

const todo: TodoPreview = {
   title: 'clean code',
   completed: false
}

// Omit<T, K> bỏ đi cái gì đó mà mình không muốn lấy ra
interface TodoOmit {
   title: string;
   description: string;
   completed: boolean;
   createdAt: number;
}

type TodoPreviewOmit = Omit<TodoOmit, 'description' | 'createdAt'>

const todoOmit: TodoPreviewOmit = {
   title: 'clean code',
   completed: false
}

// Exclude<UnionType, ExcludedMembers>

type T0 = Exclude<'a' | 'b' | 'c', 'a'> // loại trừ 'a' khỏi union type bên trái

// Extract<Type, Union>

type T1 = Extract<string | number | (() => void), Function> // loại trừ Function ra để lại string và number
type T2 = Extract< 'a' | 'b' | 'c' | 'd', 'a' | 'b'> // loại trừ 'a' và 'b' khỏi union type bên trái

// NonNullable<Type>

type T3 = NonNullable<string | number | null | undefined> //loại trừ null và undefined
```

# Mapped types

```ts

```
