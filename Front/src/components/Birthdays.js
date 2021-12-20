import axios from "axios";
import { useEffect, useState } from "react";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt} from '@fortawesome/free-solid-svg-icons'; */

const Birthdays = () =>{

    const [filter, setFilter ] = useState({
        radio: "none",
        birthday: 0
    })

    const [alert, setAlert] = useState("")

    const [listUser, setListUser ] = useState([])

    const filterChange = (event) =>{
        setFilter({...filter, radio: event.target.value})
    }

    const monthBirthdayChange = (event) =>{
        setFilter({...filter, birthday: event.target.value})
    }

    const callUsers = () => {
        axios.get("http://144.22.242.102/api/user/all").then(function(res){
            if(res.data.length === 0){
                setAlert("There aren't users")
            }
            setListUser(res.data)
        }); 
    }

    useEffect(() => {
        const callUsersEffect = () => {
            axios.get("http://144.22.242.102/api/user/all").then(function(res){
                if(res.data.length === 0){
                    setAlert("There aren't users")
                }
                setListUser(res.data)
            }); 
        }
        callUsersEffect()
    }, []);

    const filterType = () =>{
        if(filter.radio === "none"){
            return []
        }else if(filter.radio === "birthday"){
            return <input type="number" value={filter.birthday} onChange={monthBirthdayChange} required></input>
        }
    }

    function applyFilter (event){
        event.preventDefault()
        setAlert("")
        if(filter.radio === "birthday"){
            axios.get("http://144.22.242.102/api/user/birthday/"+filter.birthday).then(function(res){
                if(res.data.length === 0){
                    setAlert("There isn't any user with month birthday at: "+filter.birthday)
                }
                setListUser(res.data)
            }); 
        }else{
            callUsers()
        }
    }

    const setThead = () => {
        const user = ["name", "birthtDay", "monthtBirthday", "email", "zone", "type"];
        let userTh = []
        for(const key of user){
            userTh.push(<th key={key}>{ key[0].toUpperCase() + key.slice(1)}</th>)
        }
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
                if(key === "id" || key === "identification" || key === "cellPhone" || key === "address" || key === "password"){
                    continue;
                }
                userTd.push(<td key={key}>{users[key]}</td>)
            }
            userTr.push(<tr key={i++}>{userTd}</tr>)
        }
        return userTr
    }

    return(
        <div className="main main-tables">
            <aside className="aside aside-tables">
                <h2>Filter by:</h2>
                <div onChange={filterChange} className="div-filter">
                    <div>
                        <input id="radioNone" name="filter" type="radio" className="radio filter-my-order" value="none" defaultChecked/>
                        <label htmlFor="radioNone">None</label>
                    </div>
                    <div>
                        <input id="radioMonth" name="filter" type="radio" className="radio filter-my-order" value="birthday"/>
                        <label htmlFor="radioMonth">Month birthday</label>
                    </div>
                </div>
                <form onSubmit={applyFilter}>
                    <div className="div-filter-type">
                        {filterType()}
                    </div>
                    <button type="submit" className="aside-btn">Apply filter</button>
                </form>
            </aside>
            <div className="main2 main2-tables">
                <h1 className="title-page">Birthdays</h1>
                <h2 className="alert2">{alert}</h2>
                <div className="div-table">
                    <table className="table" style={{marginBottom: '0'}}>
                        <thead><tr>{setThead()}</tr></thead>
                        <tbody>{setTbody()}</tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Birthdays;