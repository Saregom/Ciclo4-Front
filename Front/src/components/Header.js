import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from './sources/logo-ochobits2.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Header = () =>{

    const [myRef] = useState({
        menuPopUp: React.createRef(),
        menuLeft: React.createRef()
    })

    const [pathProfile, setPathProfile ] = useState("")

    const [nameHeader, setNameHeader ] = useState({
        nameUser:"",
        order:"",
        myOrder:<></>,
        tables:<></>
    })

    let navigate = useNavigate();
    const backHome = () => {
        navigate("/home", { replace: true });
    }

    useEffect(() =>{ //ver s se corrige haciendo return dentro del axios
        const firstProcces = () => {
            let id = sessionStorage.getItem("idUser")
            axios.get("http://144.22.242.102/api/user/"+id).then(function(res){
                let user = res.data
                setPathProfile("/home/profile/"+user.name+"")
                if(user.type === "ASE" || user.type === "CLIENT"){
                    setNameHeader({...nameHeader,
                        nameUser:user.name,
                        order:"Make order",
                        myOrder:<NavLink className="txt-menu-left" exact="true" to="/home/myorders">My orders</NavLink>
                    }) 
                }else if( user.type === "COORD" ||  user.type === "ADM"){
                    setNameHeader({...nameHeader,
                        nameUser:user.name,
                        order:"Orders",
                    })
                }/* else if(type === "ADM"){
                    setNameHeader({...nameHeader,
                        tables:<NavLink className="txt-menu-left" exact="true" to="/home/tables">Edit data</NavLink>
                    }) 
                } */
                /* setNameHeader({...nameHeader, nameUser:user.name}) */
                
            }); 
        }
        firstProcces()
    }, [])

    let rerfPopUp = myRef.menuPopUp.current
    let refMenuLeft = myRef.menuLeft.current
    const clickMenuEnter = () => {
        rerfPopUp.style.display = 'block'
        setTimeout(function(){
            rerfPopUp.style.opacity = '0.4'
            refMenuLeft.style.width = "200px"
            rerfPopUp.style.transition = 'opacity 0.5s ease';
            refMenuLeft.style.transition = 'width 0.5s ease'
        }, 1)
    }
    const clickMenuLeave = () => {
            rerfPopUp.style.opacity = '0'
            refMenuLeft.style.width = "0"
            rerfPopUp.style.transition = 'opacity 0.5s ease';
            refMenuLeft.style.transition = 'width 0.5s ease';
            setTimeout(function(){
                rerfPopUp.style.display = 'none'
            }, 500)
    }

    return(
        <header className="header">
            <div className="div-bars-logo">
                <div className="div-bars" onClick={clickMenuEnter}>
                    <FontAwesomeIcon className="fas fa-bars" icon={ faBars }/>
                </div>
                <Logo className="logo-header" alt='logo Ocho Bits' onClick={backHome} title="Home"/>
            </div>
            <div className="nav-father">
                <nav className="nav-menu">
                    <NavLink className="txt-menu" exact="true" to="/home/catalog">Catalog</NavLink>
                    <NavLink className="txt-menu" exact="true" to="/home/birthdays">Birthdays</NavLink>
                    {nameHeader.myOrder}
                    <NavLink className="txt-menu" exact="true" to="/home/orders">{nameHeader.order}</NavLink>
                    <NavLink className="txt-menu" exact="true" to="/home/editdata">Edit data</NavLink>
                    {/* {nameHeader.tables} */}
                    <NavLink className="txt-menu" exact="true" to={pathProfile}><span>My profile</span></NavLink>
                </nav> 
                <div className="nav-menu-popup" onClick={clickMenuLeave} ref={myRef.menuPopUp}></div>
                <nav className="nav-menu-left" onClick={clickMenuLeave}ref={myRef.menuLeft}>
                    <NavLink className="txt-menu-left" exact="true" to={pathProfile}>My profile</NavLink>
                    {/* {nameHeader.tables} */}
                    <NavLink className="txt-menu-left" exact="true" to="/home/editdata">Edit data</NavLink>
                    <NavLink className="txt-menu-left" exact="true" to="/home/catalog">Catalog</NavLink>
                    <NavLink className="txt-menu-left" exact="true" to="/home/birthdays">Birthdays</NavLink>
                    <NavLink className="txt-menu-left" exact="true" to="/home/orders">{nameHeader.order}</NavLink>
                    {nameHeader.myOrder}
                    
                </nav>
                <div className="menu-logo-user">
                    <FontAwesomeIcon className="fas fa-user-circle" icon={ faUserCircle }/>
                </div>
                <label className="txt-menu t-m-name">{""+nameHeader.nameUser+""}</label>
            </div>
        </header>
    )
}

export default Header;