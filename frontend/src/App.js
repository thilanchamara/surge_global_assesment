import { useEffect,createContext,useReducer } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route,useNavigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import './App.css'
import CreatePost from './pages/CreatePost';
import { initialState,reducer } from './reducer/userReducer';


export const userContext=createContext();

function App() {
  const navigate=useNavigate();
  const [state,dispatch]=useReducer(reducer,initialState);
  return (
    <userContext.Provider value={{state:state,dispatch:dispatch}}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/create-post" element={<CreatePost />} /> 
      </Routes>
    </userContext.Provider>
  );
}

export default App;
