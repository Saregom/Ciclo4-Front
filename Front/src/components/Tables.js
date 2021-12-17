import { NavLink, Route, Routes } from "react-router-dom";
import Laptops from "./Laptops";
import Users from "./Users";


const Tables = () =>{
    /* 
        localhost:8080
        144.22.242.102
    */
    return(
        <div className="main main-tables">
            <div className="row option-table">
                <div className="col opt-users">
                    <NavLink className="NavLink" to="/home/tables/users">Users</NavLink>
                </div>
                <div className="col opt-laptops">
                    <NavLink className="NavLink" to="/home/tables/laptops">Laptops</NavLink>
                </div>
            </div>
            <Routes>
                <Route path="users" element={<Users/>}/>
                <Route path="laptops" element={<Laptops/>}/>
            </Routes>
        </div>
    )
}
export default Tables;