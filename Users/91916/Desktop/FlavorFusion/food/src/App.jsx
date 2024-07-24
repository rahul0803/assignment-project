import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Success from './pages/Success/Success';
import Error from './pages/Error/Error';
import ProtectedRoute from './components/ProtectedRoute';
import Details from './pages/Details/Details';


const App = () => {

  return (
    <div>
     
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/*' element={<Error />} />
        <Route path='/success' element={<ProtectedRoute element={<Success />} />} />
      </Routes>

    </div>
  )
}

export default App
