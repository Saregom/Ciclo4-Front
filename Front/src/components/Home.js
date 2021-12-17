import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import Header from './Header';
import MakeOrder from './MakeOrder';
import MyOrders from './MyOrders';
import OrdersCoor from './Orders-coor';
import Tables from './Tables';

const Home = () =>{
    //let navigate = useNavigate();
    const [pathOrder, setPathOrder ] = useState(<></>)

    useEffect(() =>{
        /* if (!sessionStorage.getItem('idUser')) {
            return navigate("/", { replace: true });
            //alert("You must logued first")
        } */
        let id = sessionStorage.getItem("idUser")
        let type
        axios.get("http://144.22.242.102/api/user/"+id).then(function(res){
            type = res.data.type
            if(type === "ASE"){
                setPathOrder(<MakeOrder/>) 
            }else if(type === "COORD"){
                setPathOrder(<OrdersCoor/>)
            }
        }); 
    }, [])

    const removeIdUser = () =>{
        sessionStorage.removeItem("idUser")
    }

    const Welcome = () =>{
        return(
            <div className="main main-home">
                <div className="main2-home">
                    <h1 className="welcome">Welcome to Ocho Bits web page!!</h1>
                    <h2 className="welcome2">Start by navigating through the menu</h2>
                </div>
                <NavLink className="txt" exact="true" to="/"><button className="btn-index btn-green" onClick={removeIdUser}>Logout</button></NavLink>
            </div>
        )
    }
    
    return(
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="tables/*" element={<Tables />} />
                <Route path="orders/*" element={pathOrder} />
                <Route path="myorders/*" element={<MyOrders/>} />
            </Routes>
        </>
    )
}

export default Home
