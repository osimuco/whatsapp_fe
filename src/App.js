import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { logout } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className='dark'>
      <button onClick={() => dispatch(logout())}>logout</button>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
