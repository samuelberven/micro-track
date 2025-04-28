// src/App.tsx
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to Tailwind CSS in Action
      </h1>
      <p className="text-lg text-red-500 mb-8">  {/* For red */}
        This is a demonstration of Tailwind's utility classes.
      </p>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Click Me
      </button>
    </div>
  );
}

export default App;


// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <div>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
      
//       <div className="min-h-screen bg-gray-100">
//         <header className="bg-white shadow">
//           <div className="max-w-7xl mx-auto py-6 px-4">
//             <h1 className="text-3xl font-bold text-gray-900">
//               My App
//             </h1>
//           </div>
//         </header>
//         <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//           {/* Your content */}
//         </main>
//       </div>
//     </div>      
//     </>
//   )
// }

// export default App
