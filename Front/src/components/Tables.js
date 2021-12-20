import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Laptops from "./Laptops";
import Users from "./Users";


const Tables = () =>{

    const [typeUser, setTypeUser] = useState("")

    const [alertOnly, setAlertOnly] = useState(<></>)

    useEffect(() => {
        let id = sessionStorage.getItem("idUser")
        axios.get("http://144.22.242.102/api/user/"+id).then(function(res){
            setTypeUser(res.data.type)
            setTimeout(() => {
                setAlertOnly(<h1 className="only">Only "ADM"</h1>)
            }, 500)
        })
    }, [])
    if(typeUser === "ADM"){
        return(
            <div className="main main-tables">
                <div className="row option-table">
                    <div className="col opt-users">
                        <NavLink className="NavLink" to="/home/editdata/users">Users</NavLink>
                    </div>
                    <div className="col opt-laptops">
                        <NavLink className="NavLink" to="/home/editdata/laptops">Laptops</NavLink>
                    </div>
                </div>
                <Routes>
                    <Route path="users" element={<Users/>}/>
                    <Route path="laptops" element={<Laptops/>}/>
                </Routes>
            </div>
        )
    }else{
        return alertOnly
    }
}

export default Tables;