import { useState } from "react";
import axios from 'axios';
import { ReactComponent as Logo } from './sources/logo-ochobits2.svg';
import { useNavigate, NavLink } from 'react-router-dom';

const Signin = () =>{

    const [user, setUser ] = useState({
        name: "",
        identification: "",
        birthtDay: "",
        monthBirthtDay: "",
        email: "",
        password: "",
        address: "",
        cellPhone: "",
        zone: "",
        type: "",
    });

    const [passConfirm, setPassConfirm ] = useState("");

    const [required, setRequired ] = useState({
        reqEmail: "",
        reqPass: "",
        reqConfirmPass: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target
        setUser({...user, [name]:value})
    }

    const handleChange2 = (event) => {
        setPassConfirm(event.target.value)
    }
    
    const validations = async (event) => {
        event.preventDefault()
        const reqs = {
            reqEmail: "",
            reqPass: "",
            reqConfirmPass: ""
        }

        await axios.get("http://144.22.242.102/api/user/emailexist/"+user.email).then(function(res){
            const data = res.data
            reqs.reqEmail = (data) ? "La direccion de correo ya existe" : ""
        });
        reqs.reqPass = (user.password.length<8) ? "La contraseña debe tener minimo 8 caracteres" : ""

        reqs.reqConfirmPass = (user.password !== passConfirm) ? "Las contraseñas no coinciden" : ""

        setRequired({...reqs})
        let correct = true;
        for(const msg in reqs){
            if(reqs[msg].length !== 0){
                correct = false
                //alert("There are errors, check inputs")
            }
        }
        if(correct){
            registerClient()
        }
    }

    let navigate = useNavigate();
    const registerClient = () =>{
        axios.post("http://144.22.242.102/api/user/new", user).then(function(res){
            sessionStorage.setItem("idUser", res.data.id)
            navigate("/home", { replace: true });
            alert("Successful registration!")
            
        });
            /* 
                sessionStorage.setItem("name", datos.name)
            }); */
    }
    return(
        <div className="cont cont-signin">
            <div className="div-logo">
                <Logo className="logo-login" alt='logo Ocho Bits'/>
            </div>
            <div className="div-index divSignin">
                <h3>New account</h3>
                <form onSubmit={validations} className="myForm">
                    <div className="row">
                        <div className="col-sm-7  form-floating">
                            <input 
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="form-control" 
                            type="text" 
                            placeholder="." 
                            required
                            style={{height: '50px'}}/>
                            <label >First name</label>
                        </div>
                        <div className="col-sm form-floating">
                            <input 
                            name="identification" 
                            value={user.identification}
                            onChange={handleChange}
                            className="form-control" 
                            type="number" 
                            placeholder="." 
                            required
                            style={{height: '50px'}}/>
                            <label className="l1">Identification</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col form-floating">
                            <input
                                name="email" 
                                value={user.email}
                                onChange={handleChange}
                                className="form-control"
                                type="email"
                                placeholder="."
                                required
                                style={{height: '50px'}}/>
                            <label>E-mail</label>
                            <p className="required">{required.reqEmail}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm form-floating">
                            <input 
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            className="form-control"
                            type="password"
                            placeholder="."
                            required
                            style={{height: '50px'}}/>
                            <label>Password</label>
                            <p className="required">{required.reqPass}</p>
                        </div>
                        <div className="col-sm form-floating">
                            <input 
                            name="passConfirm" 
                            value={passConfirm}
                            onChange={handleChange2}
                            className="form-control" 
                            type="password" 
                            placeholder="." 
                            required 
                            style={{height: '50px'}}/>
                            <label>Confirm password</label>  
                            <p className="required">{required.reqConfirmPass}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm form-floating">
                            <input 
                            name="birthtDay"
                            value={user.birthtDay}
                            onChange={handleChange}
                            className="form-control" 
                            type="date" 
                            placeholder="." 
                            required 
                            style={{height: '50px'}}/>
                            <label>Birth day</label>
                        </div>
                        <div className="col-sm form-floating">
                            <input 
                            name="monthBirthtDay" 
                            value={user.monthBirthtDay}
                            onChange={handleChange}
                            className="form-control" 
                            type="number" 
                            placeholder="." 
                            required 
                            style={{height: '50px'}}/>
                            <label>Month Birth day</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col form-floating">
                            <input 
                            name="address" 
                            value={user.address}
                            onChange={handleChange}
                            className="form-control" 
                            type="text" 
                            placeholder="." 
                            required 
                            style={{height: '50px'}}/>
                            <label>Adress</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col form-floating">
                            <input 
                            name="cellPhone" 
                            value={user.cellPhone}
                            onChange={handleChange}
                            className="form-control" 
                            type="number" 
                            placeholder="." 
                            required 
                            style={{height: '50px'}}/>
                            <label>CellPhone</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm form-floating">
                            <input 
                            name="zone" 
                            value={user.zone}
                            onChange={handleChange}
                            className="form-control" 
                            type="text" 
                            placeholder="." 
                            required 
                            style={{height: '50px'}}/>
                            <label >Zone</label>
                        </div>
                        <div className="col-sm select-father">
                            <select 
                            name="type"
                            value={user.type}
                            onChange={handleChange}
                            className="selected" 
                            required
                            style={{height: '50px'}}>
                                <option value="" disabled defaultValue>Type</option>
                                <option value="COORD">COORD</option>
                                <option value="ASE">ASE</option>
                                <option value="ADM">ADM</option>
                            </select>
                        </div>
                    </div>
                    <input className="btn-index btn-blue" type='submit' value="Sign up"/>
                </form>
                <hr/>
                <NavLink className="haveAcount" exact="true" to="/">I already have an account</NavLink>
            </div>
        </div>
    )
}

export default Signin;