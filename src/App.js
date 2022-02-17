import './App.css';
import {BrowserRouter, Routes, Route}  from 'react-router-dom'
import Home from './pages/Home';
import AddEditUser from './pages/AddEditUser';
import About from './pages/About';
import UserInfo from './pages/UserInfo';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <ToastContainer/>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/addUser" element={<AddEditUser/>} />
        <Route exact path="/editUser/:id" element={<AddEditUser/>} />
        <Route exact path="/userInfo/:id" element={<UserInfo/>} />
        <Route exact path="/about" element={<About/>} />
      </Routes                                                                                                                                                               >
    </div>
    </BrowserRouter>
  );
}

export default App;
