import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt} from '@fortawesome/free-solid-svg-icons';


const Users = () =>{
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

    useEffect(() => {
        axios.get("http://144.22.242.102/api/user/all").then(function(res){
            setListUser(res.data)
        }); 
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target
        setUser({...user, [name]:value})
    }
    
    const setInputs = () => {
        let keys = Object.keys(user)
        return keys.map((key, i) => { //for of
            return (<div key={i}>
                <label className='aside-label'>
                    { key[0].toUpperCase() + key.slice(1)}
                </label>
                <input 
                    name={key}
                    value={user[key]}
                    onChange={handleChange} 
                    type="text"
                    className='aside-input' 
                    required>
                </input>
            </div>)
        })
    }

    const setTextInputs = (id) => {
        axios.get("http://144.22.242.102/api/user/"+id).then(function(res){
            setUser(res.data)
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

    const put = (event) => {
        event.preventDefault()
        axios.put("http://144.22.242.102/api/user/update", user).then(function(res){
            console.log(user)
            alert("Updated Data")
        }); 
    }

    const delet = (id) => {
        axios.delete("http://144.22.242.102/api/user/"+id).then(function(res){
            alert("Deleted data")
        }); 
    }

    return(
        <>
            <div className="main2 main2-tables">
                <div className="div-table">
                    <table className="table" style={{marginBottom: '0'}}>
                        <thead><tr>{setThead()}</tr></thead>
                        <tbody>{setTbody()}</tbody>
                    </table>
                </div>
            </div>
            <aside className="aside aside-tables">
                <h2>User</h2>
                <div className="aside-user">
                    <form onSubmit={put}>
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