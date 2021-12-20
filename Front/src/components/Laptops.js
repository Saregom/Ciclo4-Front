import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Laptops = () =>{

    const [myAlert, setMyAlert] = useState("")

    const [laptop, setLaptop ] = useState({
        id: "",
        brand: "",
        model: "",
        procesor: "",
        os: "",
        description: "",
        memory: "",
        hardDrive: "",
        availability: "",
        price: "",
        quantity: "",
        photography: "",
    });

    const [listLaptop, setListLaptop ] = useState([])

    const [optionCrud, setOptionCrud ] = useState("POST")

    const myRef = React.createRef()

    const inputChange = (event) => {
        const {name, value} = event.target
        setLaptop({...laptop, [name]:value})
    }

    const crudChange = (event) => {
        setOptionCrud(event.target.value)
    }

    const callLaptops = () => {
        axios.get("http://144.22.242.102/api/laptop/all").then(function(res){
            if(res.data.length === 0){
                setMyAlert("There aren't products")
            }
            setListLaptop(res.data)
        }); 
    }

    useEffect(() => {
        const callLaptopsEffect = () => {
            axios.get("http://144.22.242.102/api/laptop/all").then(function(res){
                if(res.data.length === 0){
                    setMyAlert("There aren't products")
                }
                setListLaptop(res.data)
            }); 
        }
        callLaptopsEffect()
    }, []);

    useEffect(() => {
        const changeOptionCrud = () => {
            let inp = myRef.current
            if(optionCrud === "POST"){
                setLaptop({...laptop, id:""})
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
        let keys = Object.keys(laptop)
        let divInputs = []
        for(const key of keys){
            let type = "text"
            if(key === "id" || key === "price" || key === "quantity"){
                type = "number"
            }/* else if(key === "password"){
                type = "password"
            } */

            if(key === "id"){
                divInputs.push(
                    <div key={key}>
                        <label className='aside-label'>
                            { key[0].toUpperCase() + key.slice(1)}
                        </label>
                        <input 
                            ref={myRef}
                            name={key}
                            value={laptop[key]}
                            onChange={inputChange} 
                            type="number"
                            className='aside-input' 
                            required
                            >
                        </input>
                    </div>
                )
                continue;
            }else if(key === "availability"){
                divInputs.push(
                    <div key={key}>
                        <select
                            name={key}
                            value={laptop[key]}
                            onChange={inputChange}
                            className="aside-input" 
                            required
                            style={{height: '50px'}}>
                                <option value="" disabled defaultValue>Availability</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
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
                        value={laptop[key]}
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
        axios.get("http://144.22.242.102/api/laptop/"+id).then(function(res){
            setLaptop(res.data)
            setOptionCrud("PUT")
        }); 
    }

    const setThead = () => {
        let keys = Object.keys(laptop)
        let tableTh = []
        let i = 0
        for(const key of keys){
            tableTh.push(<th key={i++}>{key[0].toUpperCase() + key.slice(1)}</th>)
        }
        tableTh.push(<th key={i++}>Upd/Del</th>)
        return tableTh
    }

    const setTbody = () => {
        let tableTr = []
        let i = 0
        for(const laptop of listLaptop){
            let tableTd = []
            
            for(const key in laptop){
                tableTd.push(<td key={key}>{""+laptop[key]+""}</td>)
            }
            tableTd.push(
                <td key={i++}>
                    <button className='btn1-table' onClick={() => setTextInputs(laptop.id)}><FontAwesomeIcon className="fas fa-pencil-alt" icon={ faPencilAlt }/></button>
                    <button className='btn2-table' onClick={() => delet(laptop.id)}><FontAwesomeIcon className="fas fa-trash-alt" icon={ faTrashAlt }/></button>
                </td>
            )
            tableTr.push(<tr key={i++}>{tableTd}</tr>)
        }
        return tableTr
    }

    const postPut = (event) => {
        event.preventDefault()

        console.log(optionCrud)
        if(optionCrud === "POST"){
            axios.post("http://144.22.242.102/api/laptop/new", laptop).then(function(res){
                callLaptops()
                alert("Created data")
        }); 
        }else{
            axios.put("http://144.22.242.102/api/laptop/update", laptop).then(function(res){
                callLaptops()
                alert("Updated data")
            }); 
        }
    }

    const delet = (id) => {
        axios.delete("http://144.22.242.102/api/laptop/"+id).then(function(res){
            alert("Deleted data")
            callLaptops()
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
                <div className="aside-laptop">
                    <h2 className="aside-name">Laptops</h2>
                    <select value={optionCrud} onChange={crudChange} className='aside-inpu'>
                        <option value="POST">Create</option>
                        <option value="PUT">Update</option>
                    </select>
                        
                    <form onSubmit={postPut}>
                        <div className="aside-inputs-laptop">
                            {setInputs()}
                        </div>
                        <input className="aside-btn" type="submit" value="Save"/>
                    </form>
                </div>
            </aside>
        </>
    )
}

export default Laptops;