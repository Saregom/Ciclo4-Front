import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt} from '@fortawesome/free-solid-svg-icons';


const Users = () =>{

    const [myAlert, setMyAlert] = useState("")

    const [user, setUser ] = useState({
        id:"",
        identification: "",
        name: "",
        birthtDay: "",
        monthBirthtDay: "",
        address: "",
        cellPhone: "",
        email: "",
        password: "",
        zone: "",
        type: "",
    });

    const [listUser, setListUser ] = useState([])

    const [optionCrud, setOptionCrud ] = useState("POST")

    const myRef = React.createRef()

    const inputChange = (event) => {
        const {name, value} = event.target
        setUser({...user, [name]:value})
    }

    const crudChange = (event) => {
        setOptionCrud(event.target.value)
    }

    const callUsers = () => {
        axios.get("http://144.22.242.102/api/user/all").then(function(res){
            if(res.data.length === 0){
                setMyAlert("There aren't products")
            }
            setListUser(res.data)
        }); 
    }

    useEffect(() => {
        const callUsersEfect = () => {
            axios.get("http://144.22.242.102/api/user/all").then(function(res){
                if(res.data.length === 0){
                    setMyAlert("There aren't products")
                }
                setListUser(res.data)
            }); 
        }
        callUsersEfect()
    }, []);

    useEffect(() => {
        const changeOptionCrud = () => {
            let inp = myRef.current
            if(optionCrud === "POST"){
                setUser({...user, id:""})
                inp.disabled = true
                inp.style.opacity = "0.3"
                inp.title  = "Disabled"
            }else{
                inp.disabled = false
                inp.style.opacity = "1"
                inp.title  = ""
            }
        }
        changeOptionCrud()
    }, [optionCrud]);
    
    const setInputs = () => {
        let keys = Object.keys(user)
        let divInputs = []
        for(const key of keys){
            let type = "text"
            if(key === "id" || key === "identification" || key === "monthBirthtDay" || key === "cellPhone"){
                type = "number"
            }else if(key === "password"){
                type = "password"
            }else if(key === "birthtDay"){
                type = "date"
            }

            if(key === "id"){
                divInputs.push(
                    <div key={key}>
                        <label className='aside-label'>
                            { key[0].toUpperCase() + key.slice(1)}
                        </label>
                        <input 
                            ref={myRef}
                            name={key}
                            value={user[key]}
                            onChange={inputChange} 
                            type={type}
                            className='aside-input' 
                            required
                            >
                        </input>
                    </div>
                )
                continue;
            }else if(key === "zone"){
                divInputs.push(
                    <div key={key}>
                        <select
                            name={key}
                            value={user[key]}
                            onChange={inputChange}
                            className="aside-input" 
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
                )
                continue;
            }else if(key === "type"){
                divInputs.push(
                    <div key={key}>
                        <select
                            name={key}
                            value={user[key]}
                            onChange={inputChange}
                            className="aside-input" 
                            required
                            style={{height: '50px'}}>
                                <option value="" disabled defaultValue>Type</option>
                                <option value="CLIENT">CLIENT</option>
                                <option value="ASE">ASE</option>
                                <option value="COOR">COOR</option>
                                <option value="ADM">ADM</option>
                            </select>
                    </div>
                )
                continue;
            }

            divInputs.push(
                <div key={key}>
                    <label className='aside-label'>
                        { key[0].toUpperCase() + key.slice(1)}
                    </label>
                    <input 
                        name={key}
                        value={user[key]}
                        onChange={inputChange} 
                        type={type}
                        className='aside-input' 
                        required>
                    </input>
                </div>
            )
        }
        return divInputs
    }

    const setTextInputs = (id) => {
        axios.get("http://144.22.242.102/api/user/"+id).then(function(res){
            let myUser = {...res.data}
            myUser.birthtDay = myUser.birthtDay.substring(0, 10)
            setUser(myUser)
            setOptionCrud("PUT")
        }); 
    }

    const setThead = () => {
        let keys = Object.keys(user)
        let userTh = []
        let i = 0
        for(const key of keys){
            userTh.push(<th key={i++}>{ key[0].toUpperCase() + key.slice(1)}</th>)
        }
        userTh.push(<th key={i++}>Upd/Del</th>)
        return userTh
    }

    const setTbody = () => {
        let userTr = []
        let i = 0
        for(const users of listUser){
            let userTd = []
            
            for(const key in users){
                if(key === "birthtDay"){
                    let myDate = new Date(users[key])
                    myDate.setMinutes(myDate.getMinutes() + myDate.getTimezoneOffset())
                    let date = myDate.toLocaleDateString()
                    userTd.push(<td key={key}>{date}</td>)
                    continue;
                }
                userTd.push(<td key={key}>{users[key]}</td>)
            }
            userTd.push(
            <td key={i++}>
                <button className='btn1-table' onClick={() => setTextInputs(users.id)}><FontAwesomeIcon className="fas fa-pencil-alt" icon={ faPencilAlt }/></button>
                <button className='btn2-table' onClick={() => delet(users.id)}><FontAwesomeIcon className="fas fa-trash-alt" icon={ faTrashAlt }/></button>
            </td>)
            userTr.push(<tr key={i++}>{userTd}</tr>)
        }
        return userTr
    }

    const postPut = async (event) => {
        event.preventDefault()
        let emailexist

        await axios.get(`http://144.22.242.102/api/user/emailexist/${user.email}`).then(function(res){
            emailexist = res.data
        })

        if(optionCrud === "POST"){
            if(emailexist){
                alert("La direccion de correo ya existe")
            }else{
                axios.post("http://144.22.242.102/api/user/new", user).then(function(res){
                    console.log("created")
                    callUsers()
                    alert("Created data")
                })
            }
        }else{
            let myEmail
            await axios.get(`http://144.22.242.102/api/user/${user.id}`).then(function(res){
                myEmail = res.data.email
            })
            if(emailexist & myEmail !== user.email){
                alert("La direccion de correo ya existe")
            }else{
                axios.put("http://144.22.242.102/api/user/update", user).then(function(res){
                    console.log("updated")
                    callUsers()
                    alert("Updated data")
                }); 
            }
        }
    }

    const delet = (id) => {
        axios.delete("http://144.22.242.102/api/user/"+id).then(function(res){
            callUsers()
            alert("Deleted data")
        }); 
    }

    return(
        <>
            <div className="main2 main2-tables">
            <h2 className="alert2">{myAlert}</h2>
                <div className="div-table">
                    <table className="table" style={{marginBottom: '0'}}>
                        <thead><tr>{setThead()}</tr></thead>
                        <tbody>{setTbody()}</tbody>
                    </table>
                </div>
            </div>
            <aside className="aside aside-tables">
                <div className="aside-user">
                    <h2 className="aside-name">User</h2>
                    <select value={optionCrud} onChange={crudChange} className='aside-inpu'>
                        <option value="POST">Create</option>
                        <option value="PUT">Update</option>
                    </select>

                    <form onSubmit={postPut}>
                        <div className="aside-inputs-user">
                            {setInputs()}
                        </div>
                        <input className="aside-btn" type="submit" value="Save"/>
                    </form>
                </div>
            </aside>
        </>
    )
}

export default Users;