import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

// const obj: {} = {}
const user: {
   firstName: string;
   lastName: string;
   age: number;
   isStudent: boolean;
} = {
   firstName: 'Tran',
   lastName: 'Dat',
   age: 20,
   isStudent: true,
};

function App() {
   const [count, setCount] = useState(0);

   // arrObh: {}[] = [{}];
   const reviews: {
      name: string;
      image: string;
      stars: number;
      premium: boolean;
      date: string;
   }[] = [
      {
         name: 'Tran Dat',
         image: 'https://randomuser.me/api/port ... 0.jpg',
         stars: 5,
         premium: true,
         date: '2021-01-01',
      }
   ]

   function displayReview(
      totalReviews: number,
      name?: string,
      premium?: boolean
   ) {
      return (
         <>
            Review total <strong>{totalReviews}</strong> | Last reviewed by {''}
            <strong>{name}</strong> {premium ? '❤️' : ''}
         </>
      );
   }

   // optional: không bắt buộc truyền vào

   return (
      <div className="App">
         <div>
            <a href="https://vitejs.dev" target="_blank">
               <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
               <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
         </div>
         <h1>Vite + React</h1>
         <div className="card">
            <button onClick={() => setCount(count => count + 1)}>
               count is {count}
            </button>
            <p>
               Edit <code>src/App.tsx</code> and save to test HMR
            </p>
         </div>
         <div className="review-info">{displayReview(reviews.length, reviews[0].name, reviews[0].premium)}</div>
         <p className="read-the-docs">
            Click on the Vite and React logos to learn more
         </p>
      </div>
   );
}

export default App;
