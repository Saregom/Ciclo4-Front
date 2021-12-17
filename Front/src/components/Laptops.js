import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Laptops = () =>{

    const [filter, setFilter ] = useState({
        radio: "none",
        price: 0,
        description: ""
    })

    const [alert, setAlert] = useState("")

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

    const [myRef, setMyRef ] = useState({
        inpId: React.createRef()
    })

    const filterChange = (event) =>{
        setFilter({...filter, radio: event.target.value})
    }

    const priceChange = (event) =>{
        setFilter({...filter, price: event.target.value})
    }

    const descriptionChange = (event) =>{
        setFilter({...filter, description: event.target.value})
    }

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
                setAlert("You don't have any order")
            }
            setListLaptop(res.data)
        }); 
    }

    useEffect(() => {
        callLaptops()
    }, []);

    const filterType = () =>{
        let myType, myValue, mychange
        if(filter.radio === "none"){
            return []
        }
        if(filter.radio === "price"){
            myType = "number"
            myValue = filter.price
            mychange = priceChange
        }else if(filter.radio === "description"){
            myType = "text"
            myValue = filter.description
            mychange = descriptionChange
        }
        return <input type={myType} value={myValue} onChange={mychange} required></input>
    }

    function applyFilter (event){
        event.preventDefault()
        if(filter.radio === "price"){
            axios.get("http://144.22.242.102/api/laptop/price/"+filter.price).then(function(res){
                if(res.data.length === 0){
                    setAlert("There isn't any laptop with price less or equal to: "+filter.price)
                }
                setListLaptop(res.data)
            }); 
        }else if(filter.radio === "description"){
            axios.get("http://144.22.242.102/api/laptop/description/"+filter.description).then(function(res){
                if(res.data.length === 0){
                    setAlert("There isn't any description with the word/s: "+filter.description)
                }
                setListLaptop(res.data)
            }); 
        }else{
            setAlert("")
            callLaptops()
        }
    }

    useEffect(() => {
        const changeOptionCrud = () => {
            let inp = myRef.inpId.current
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
        let i = 0
        for(const key of keys){
            if(key === "id"){
                divInputs.push(
                    <div key={i++}>
                        <label className='aside-label'>
                            { key[0].toUpperCase() + key.slice(1)}
                        </label>
                        <input 
                            ref={myRef.inpId}
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
            }
            divInputs.push(
                <div key={i++}>
                    <label className='aside-label'>
                        { key[0].toUpperCase() + key.slice(1)}
                    </label>
                    <input 
                        name={key}
                        value={laptop[key]}
                        onChange={inputChange} 
                        type="text"
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
            alert("Created data")
        }); 
        }else{
            axios.put("http://144.22.242.102/api/laptop/update", laptop).then(function(res){
                alert("Updated data")
            }); 
        }
    }

    const delet = (id) => {
        axios.delete("http://144.22.242.102/api/laptop/"+id).then(function(res){
            alert("Deleted data")
        }); 
    }

    return(
        <div className="main main-tables">
            <div className="main2 main2-tables">
                <h1 className="title-page">Laptops</h1>
                <h2 className="alert2">{alert}</h2>
                <div className="div-table">
                    <table className="table" style={{marginBottom: '0'}}>
                        <thead><tr>{setThead()}</tr></thead>
                        <tbody>{setTbody()}</tbody>
                    </table>
                </div>
            </div>
            <aside className="aside aside-tables">
                <h2 className="aside-name-myorder">Filtter by: </h2>
                <div onChange={filterChange} className="div-filter">
                    <div>
                        <input id="radioNone" name="filter" type="radio" className="radio filter-my-order" value="none" defaultChecked/>
                        <label htmlFor="radioNone">None</label>
                    </div>
                    <div>
                        <input id="radioDate" name="filter" type="radio" className="radio filter-my-order" value="price"/>
                        <label htmlFor="radioDate">Price</label>
                    </div>
                    <div>
                        <input id="radioStatus" name="filter" type="radio" className="radio filter-my-order" value="description"/>
                        <label htmlFor="radioStatus">Description</label>
                    </div>
                </div>
                <form onSubmit={applyFilter}>
                    <div className="div-filter-type">
                        {filterType()}
                    </div>
                    <button type="submit" className="aside-btn">Apply filter</button>
                </form>
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
        </div>
    )
}

export default Laptops;