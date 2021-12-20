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
        makeorder:<></>,
        orders:<></>,
        myOrders:<></>,
        tables:<></>
    })

    let navigate = useNavigate();
    const backHome = () => {
        navigate("/home", { replace: true });
    }

    useEffect(() =>{ 
        const firstProcces = () => {
            let id = sessionStorage.getItem("idUser")
            axios.get("http://144.22.242.102/api/user/"+id).then(function(res){
                let myNameHeader = {...nameHeader}
                let user = res.data
                let arrayName = user.name.split(" ")
                myNameHeader.nameUser = arrayName[0]

                setPathProfile("/home/profile/"+user.name+"")
                
                if(user.type === "ASE" || user.type === "CLIENT"){
                    myNameHeader.makeorder = <NavLink className="txt-menu" exact="true" to="/home/makeorder">Make Order</NavLink>
                    myNameHeader.myOrders = <NavLink className="txt-menu" exact="true" to="/home/myorders">My orders</NavLink>
                }else if( user.type === "COORD"){
                    myNameHeader.orders = <NavLink className="txt-menu" exact="true" to="/home/orders">Orders</NavLink>
                }else if(user.type === "ADM"){
                    myNameHeader.tables = <NavLink className="txt-menu" exact="true" to="/home/editdata">Edit data</NavLink>
                }
                setNameHeader({...myNameHeader}) 
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
                    {nameHeader.myOrders}
                    {nameHeader.makeorder}
                    {nameHeader.orders}
                    {nameHeader.tables}
                    <NavLink className="txt-menu" exact="true" to={pathProfile}>My profile</NavLink>
                </nav> 

                <div className="nav-menu-popup" onClick={clickMenuLeave} ref={myRef.menuPopUp}></div>
                <nav className="nav-menu-left" onClick={clickMenuLeave}ref={myRef.menuLeft}>
                    <NavLink className="txt-menu" exact="true" to={pathProfile}>My profile</NavLink>
                    {nameHeader.tables}
                    <NavLink className="txt-menu" exact="true" to="/home/catalog">Catalog</NavLink>
                    <NavLink className="txt-menu" exact="true" to="/home/birthdays">Birthdays</NavLink>
                    {nameHeader.myOrders}
                    {nameHeader.makeorder}
                    {nameHeader.orders}
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