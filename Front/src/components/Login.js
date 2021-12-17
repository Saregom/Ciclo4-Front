import { useState } from "react";
import axios from 'axios';
import { ReactComponent as Logo } from './sources/logo-ochobits2.svg';
import { useNavigate, NavLink } from 'react-router-dom';

const Login = () =>{

    const [user, setUser ] = useState({
        email: "",
        password: ""
    });

    let navigate = useNavigate();
    const verifyUser = (event) => {
        event.preventDefault()
        axios.get("http://144.22.242.102/api/user/"+user.email+"/"+user.password).then(function(res){
            const data = res.data
            if(data.id == null){
                alert("Email o contraseña incorrectos")
            }else{
                sessionStorage.setItem("idUser", data.id)
                navigate("/home", { replace: true });
                alert(`Bienvenido ${data.name}`)
            }
        });
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setUser({...user, [name]:value})
    }

    /* const submit = withRouter(({ history })) => {
        history().push('/home');
    }) */

    return(
        <div className="cont cont-login">
            <div className="div-logo">
                <Logo className="logo-login" alt='logo Ocho Bits'/>
            </div>
            <div className="div-index divLogin">
                <h3>Log in</h3>
                <form onSubmit={verifyUser}>
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
                        </div>
                    </div>
                    <div className="row">
                        <div className="col form-floating">
                            <input
                            name="password"
                            value={user.pass}
                            onChange={handleChange}
                            id="pass1" 
                            className="form-control"
                            type="password"
                            placeholder="."
                            required
                            style={{height: '50px'}}/>
                            <label>Password</label>
                        </div>
                    </div>
                    <input className="btn-index btn-blue" type="submit" value="Log in"/>
                </form>
                <hr/>
                <NavLink className="txt" exact="true" to="/signin"><button className="btn-index btn-green">Create account</button></NavLink>
                
            </div>
        </div>
    )
}

export default Login;