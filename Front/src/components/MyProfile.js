import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import avatar from './sources/avatar.png';

const MyProfile = () =>{

    const [user, setUser] = useState({})

    const nameUpper = () =>{
        let name = ""+user.name+""
        name = name[0].toUpperCase() + name.slice(1)
        return name
    }

    const birthtDayFormat = () =>{
        let birthtDay = new Date(user.birthtDay)
        birthtDay.setMinutes(birthtDay.getMinutes() + birthtDay.getTimezoneOffset())
        return birthtDay.toLocaleDateString()
    }

    useEffect(() => {
        let id = sessionStorage.getItem("idUser")
        axios.get("http://144.22.242.102/api/user/"+id).then(function(res){
            setUser({...res.data})
        }); 
    }, [])

    const removeIdUser = () =>{
        sessionStorage.removeItem("idUser")
    }
    
    return(
        <div className='body-profile'>
            <div className='cont-profile'>
                <div className='div-avatar-father'>
                    <div className='div-avatar'>
                        <img src={avatar} className='avatar' alt='Profile'></img>
                    </div> 
                </div>
                <div className='profile-info'>
                    <div className='profile-head'>
                        <p className='name-profile'>{nameUpper()}</p>
                        <label>{user.type} - {user.zone}</label>
                        <hr/>
                    </div>
                    <div className='profile-body'>
                        <div className='row row-cols-2'>
                            <div className='col'>
                                <label className='th'>E-mail</label>
                            </div>
                            <div className='col'>
                                <label>{user.email}</label>
                            </div>
                            <div className='col'>
                                <label className='th'>Identification</label>
                            </div>
                            <div className='col'>
                                <label>{user.identification}</label>
                            </div>
                            <div className='col'>
                                <label className='th'>Birth day</label>
                            </div>
                            <div className='col'>
                                <label>{birthtDayFormat()}</label>
                            </div>
                            <div className='col'>
                                <label className='th'>Cell pohone</label>
                            </div>
                            <div className='col'>
                                <label>{user.cellPhone}</label>
                            </div>
                        </div>
                    </div>
                    <div className='profile-footer'>
                        <NavLink className="txt" exact="true" to="/"><button className="btn-profile btn-logout" onClick={removeIdUser}>Logout</button></NavLink>
                        <NavLink className="txt" exact="true" to="/home"><button className="btn-profile btn-home">Home</button></NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile