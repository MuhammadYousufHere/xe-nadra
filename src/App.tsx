import { Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className=''>
      <ScrollToTop />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
      </Routes>
    </div>
  );
}

export default App;
