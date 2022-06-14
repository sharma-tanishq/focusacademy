import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
            <Route exact path="/" element={<Navigate to="/home"/>}></Route>
            <Route exact path="/home" element={<Home/>}></Route>
            <Route exact path="/signup" element={<SignupForm/>}></Route>
            <Route exact path="/login" element={<LoginForm/>}></Route>
            <Route exact path="*" element={<h1>404 NOT FOUND</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
