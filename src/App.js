
import {  RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routers/Router/Routes';
import  { Toaster } from 'react-hot-toast';

function App() {

  

  return (
    <div className='max-w-screen-lg mx-auto'>
      <Toaster /> 
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
