import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import NotFound from './pages/error';
import Main from './pages/main-page';

import './App.css';

function App() {
  return <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/main-page" element={<Main />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router >
}

export default App;
