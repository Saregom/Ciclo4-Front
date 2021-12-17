import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from './sources/logo-ochobits2.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Header = () =>{

    const [nameHeader, setNameHeader ] = useState({
        order:"",
        myOrder:<></>
    })

    let navigate = useNavigate();
    const backHome = () => {
        navigate("/home", { replace: true });
    }

    useEffect(() =>{ //ver s se corrige haciendo return dentro del axios
        let id = sessionStorage.getItem("idUser")
        axios.get("http://144.22.242.102/api/user/"+id).then(function(res){
            let type = res.data.type
            if(type === "ASE"){
                setNameHeader({...nameHeader, 
                    order:"Make order",
                    myOrder:<NavLink className="txt-menu" exact="true" to="/home/myorders">My Orders</NavLink>
                }) 
            }else if(type === "COORD"){
                setNameHeader({...nameHeader, order:"Orders"})
            }
        }); 
    }, [])

    return(
        <header className="header">
            <div className="div-bars-logo">
                <div className="div-bars">
                    <FontAwesomeIcon className="fas fa-bars" icon={ faBars }/>
                </div>
                <Logo className="logo-header" alt='logo Ocho Bits' onClick={backHome}/>
                
            </div>
            <div className="nav-father">
                <nav className="nav-menu">
                    <NavLink className="txt-menu" exact="true" to="/home/tables">Tables</NavLink>
                    {nameHeader.myOrder}
                    <NavLink className="txt-menu" exact="true" to="/home/orders">{nameHeader.order}</NavLink>
                </nav>
                {/* <div className="nav-menu-popup"></div>
                <nav className="nav-menu-left">
                    <NavLink className="txt-menu" exact="true" to="/home/tables">Tables</NavLink>
                    <NavLink className="txt-menu" exact="true" to="/home/orders">Orders</NavLink>
                </nav> */}
                <div className="menu-logo-user">
                    <FontAwesomeIcon className="fas fa-user-circle" icon={ faUserCircle }/>
                </div>
                <div className="div-menu-user">
                    <label className="txt-menu t-m-name"><span>juanito</span></label>
                    <i className="fas fa-caret-down"></i>
                </div>
            </div>
            <div className="nav-menu-popup2"></div>
            <div className="info-user">
            </div>
        </header>
    )
}

export default Header;