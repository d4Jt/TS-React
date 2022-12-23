// # Utility types
// ```ts
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

// game.title = 'The game of book 2' // error because game is readonly

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
