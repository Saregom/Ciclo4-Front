import { useEffect } from 'react';
import { Routes, Route, useNavigate, NavLink } from 'react-router-dom';
import Birthdays from './Birthdays';
import Catalog from './Catalog';
import Header from './Header';
import MakeOrder from './MakeOrder';
import MyOrders from './MyOrders';
import MyProfile from './MyProfile';
import OrdersCoor from './OrdersCoor';
import Tables from './Tables';

const Home = () => {

    const listImages = [
        "https://drive.google.com/thumbnail?id=1OC73x8yMaOEBKdlEHTB2Qrkix2BbrUb3",
        "https://drive.google.com/thumbnail?id=1MiwEqpb37VgZW_YGSAypFVCi2Shz9syq",
        "https://drive.google.com/thumbnail?id=1BvYybPXfe1hIReEJ0-xpgCYEUb1krenW"   
    ]

    let navigate = useNavigate();

    useEffect(() =>{
            let id = sessionStorage.getItem("idUser")
            if (id==null) {
                alert("You must logued first")
                navigate("/signin", { replace: true });
                return;
            }
    }, [])

    const Welcome = () =>{
        return(
            <div className="main-home">
                <div className="main2-home">
                    <h1 className="welcome">Welcome to Ocho Bits web page!!</h1>
                    <h2 className="welcome2">Start by navigating through the menu</h2>
                </div>
                <div className='our-catalog-home'>
                    <NavLink exact="true" to="/home/catalog"><h2>Visit our catalog</h2></NavLink>
                    <div className='div-laptops-home'>
                        <img src={listImages[0]} alt="img1"/>
                        <img src={listImages[1]} alt="img2"/>
                        <img src={listImages[2]} alt="img3"/>
                    </div>
                </div>
            </div>
        )
    }
    
    return(
        <div style={{height: "100%"}}>
            
            <div style={{paddingTop: "55px", height: "100%"}}>
            <Header/>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="catalog" element={<Catalog />} />
                    <Route path="birthdays" element={<Birthdays />} />
                    <Route path="makeorder" element={<MakeOrder/>} />
                    <Route path="orders" element={<OrdersCoor/>} />
                    <Route path="myorders" element={<MyOrders/>} />
                    <Route path="editdata/*" element={<Tables />} />
                    <Route path="profile/*" element={<MyProfile />} />
                </Routes>
            </div>
        </div>
    )
}

export default Home
