import './App.css';
import "./components/css/styles.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signin from './components/Signin';
import Home from './components/Home';

function App() {
  /* let navigate = useNavigate(); */
  /* if (!sessionStorage.getItem('idUser')) {
    navigate("/", { replace: true }); */
    //alert("You must logued first")
  /* } */
  
  return (
      <div className='body' style={{height: "100%"}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/home/*" element={<Home />}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
