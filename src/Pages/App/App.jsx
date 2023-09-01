/* eslint-disable react/jsx-no-target-blank */
import { useRoutes, BrowserRouter, Link } from 'react-router-dom';
import { FecthTypesCreditProvider } from '../../Context';
import SimulatorCredit from '../SimulatorCredit';
import SimulatorResult from '../SimulatorResult';
import NotFound from '../NotFound';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/simulador-de-credito', element: <SimulatorCredit className='bg-white' /> },
    { path: '/simulador-de-credito-result', element: <SimulatorResult />},
    { path: '/*', element: <NotFound /> },
  ]);

  return routes;
}

function App() {
  return (
    <FecthTypesCreditProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </FecthTypesCreditProvider>
  )
}

const Home = () => {
  return (
    <>
      <div className='grid place-content-center'>
        <div className='flex justify-center'>
          <a href='https://vitejs.dev' target='_blank'>
            <img src={viteLogo} className='logo' alt='Vite logo' />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
      </div>
      <h1>Simulador de crédito con</h1>
      <h1>Vite + React</h1>
      <div className="card mt-4">
        <Link to="/simulador-de-credito">
          <button > Empezar </button>
        </Link>
        <p className='p-4'>
          Edit and created for <code><a href='https://github.com/dmunoz05'> dmunoz05</a></code>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App;
