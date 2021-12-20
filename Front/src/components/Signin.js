import { useState } from "react";
import axios from 'axios';
import { ReactComponent as Logo } from './sources/logo-ochobits2.svg';
import { useNavigate, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

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
        type: "CLIENT",
    });

    const [passConfirm, setPassConfirm ] = useState("");

    const [typePass, setTypePass ] = useState("password");

    const [required, setRequired ] = useState({
        reqEmail: "",
        reqPass: "",
        reqConfirmPass: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target
        setUser({...user, [name]:value})
    }

    const passConfirmChange = (event) => {
        setPassConfirm(event.target.value)
    }

    const typePassChange = (type) => {
        setTypePass(type)
    }

    const btnPassword = () => {
        let myType, myIcon
        if(typePass === "password"){
            myType="text"
            myIcon = faEye
        }else if(typePass === "text"){
            myType="password"
            myIcon = faEyeSlash
        }
        return(
            <button className='btn-show-pass' type="button" onClick={() => typePassChange(myType)}><FontAwesomeIcon className="fas fa-eye" icon={ myIcon }/></button>
        )
    }
    
    const validations = async (event) => {
        event.preventDefault()
        const reqs = {
            reqEmail: "",
            reqPass: "",
            reqConfirmPass: ""
        }

        await axios.get(`http://144.22.242.102/api/user/emailexist/${user.email}`).then(function(res){
            const data = res.data
            reqs.reqEmail = (data) ? "Email is already in use" : ""
        });
        reqs.reqPass = (user.password.length<8) ? "The password must have at least 8 characters" : ""

        reqs.reqConfirmPass = (user.password !== passConfirm) ? "Passwords don't match" : ""

        setRequired({...reqs})
        let correct = true;
        for(const msg in reqs){
            if(reqs[msg].length !== 0){
                correct = false
                alert("There are errors, check inputs")
                break;
            }
        }
        if(correct){
            registerClient()
        }
    }

    let navigate = useNavigate();
    const registerClient = () =>{
        axios.post(`http://144.22.242.102/api/user/new/`, user).then(function(res){
            sessionStorage.setItem("idUser", res.data.id)
            navigate("/home", { replace: true });
            alert("Successful registration!")
        });
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
                            type={typePass}
                            placeholder="."
                            autoComplete="off"
                            required
                            style={{height: '50px'}}/>
                            <label>Password</label>
                            <p className="required">{required.reqPass}</p>
                        </div>
                        <div className="col form-floating">
                            <input 
                            name="passConfirm" 
                            value={passConfirm}
                            onChange={passConfirmChange}
                            className="form-control" 
                            type={typePass}
                            placeholder="."
                            autoComplete="off" 
                            required 
                            style={{height: '50px'}}/>
                            <label>Confirm password</label>  
                            <p className="required">{required.reqConfirmPass}</p>
                        </div>
                        <div className="col-auto col-show-pass">
                            {btnPassword()}
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
                        <div className="col-sm form-floating">
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
                        <div className="col-sm form-floating">
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
                        <div className="col select-father">
                            <select
                            name="zone"
                            value={user.zone}
                            onChange={handleChange}
                            className="selected" 
                            required
                            style={{height: '50px'}}>
                                <option value="" disabled defaultValue>Zone</option>
                                <option value="Zone 1">Zone 1</option>
                                <option value="Zone 2">Zone 2</option>
                                <option value="Zone 3">Zone 3</option>
                                <option value="Zone 4">Zone 4</option>
                                <option value="Zone 5">Zone 5</option>
                                <option value="Zone 6">Zone 6</option>
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