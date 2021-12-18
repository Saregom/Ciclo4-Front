import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Birthdays from './Birthdays';
import Catalog from './Catalog';
import Header from './Header';
import MakeOrder from './MakeOrder';
import MyOrders from './MyOrders';
import MyProfile from './MyProfile';
import OrdersCoor from './OrdersCoor';
import Tables from './Tables';

const Home = () =>{
    let navigate = useNavigate();

    const [pathOrder, setPathOrder ] = useState(<></>)

    useEffect(() =>{
            let id = sessionStorage.getItem("idUser")
            if (id==null) {
                alert("You must logued first")
                navigate("/signin", { replace: true });
                return;
            }else{
                axios.get(`http://144.22.242.102/api/user/${id}`).then(function(res){
                    let type = res.data.type
                    if(type === "ASE" || type === "CLIENT"){
                        setPathOrder(<MakeOrder/>) 
                    }else if(type === "COORD"){
                        setPathOrder(<OrdersCoor/>)
                    }
                });
            }
    }, [])

    const Welcome = () =>{
        return(
            <div className="main main-home">
                <div className="main2-home">
                    <h1 className="welcome">Welcome to Ocho Bits web page!!</h1>
                    <h2 className="welcome2">Start by navigating through the menu</h2>
                </div>
            </div>
        )
    }
    
    return(
        <div style={{height: "100%"}}>
            <Header/>
            <div style={{paddingTop: "55px", height: "100%"}}>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="catalog" element={<Catalog />} />
                    <Route path="birthdays" element={<Birthdays />} />
                    <Route path="orders" element={pathOrder} />
                    <Route path="myorders" element={<MyOrders/>} />
                    <Route path="editdata/*" element={<Tables />} />
                    <Route path="profile/*" element={<MyProfile />} />
                </Routes>
            </div>
        </div>
    )
}

export default Home
