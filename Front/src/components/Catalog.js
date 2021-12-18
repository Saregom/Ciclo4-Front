import axios from "axios";
import React, { useEffect, useState } from "react";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'; */

const Catalog = () =>{

    const [filter, setFilter ] = useState({
        radio: "none",
        price: 0,
        description: ""
    })

    const [alert, setAlert] = useState("")

    const [laptop] = useState({
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
        photography: "",
    });

    const [listLaptop, setListLaptop ] = useState([])

    const filterChange = (event) =>{
        setFilter({...filter, radio: event.target.value})
    }

    const priceChange = (event) =>{
        setFilter({...filter, price: event.target.value})
    }

    const descriptionChange = (event) =>{
        setFilter({...filter, description: event.target.value})
    }

    const callLaptops = () => {
        axios.get("http://144.22.242.102/api/laptop/all").then(function(res){
            if(res.data.length === 0){
                setAlert("There aren't products")
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
        }else if(filter.radio === "price"){
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

    const setThead = () => {
        let keys = Object.keys(laptop)
        let tableTh = []
        let i = 0
        for(const key of keys){
            tableTh.push(<th key={i++}>{key[0].toUpperCase() + key.slice(1)}</th>)
        }
        return tableTh
    }

    const setTbody = () => {
        let tableTr = []
        let i = 0
        for(const myLaptop of listLaptop){
            let tableTd = []
            
            for(const key in myLaptop){
                if(key === "quantity"){
                    continue;
                }
                tableTd.push(<td key={key}>{""+myLaptop[key]+""}</td>)
            }
            tableTr.push(<tr key={i++}>{tableTd}</tr>)
        }
        return tableTr
    }

    return(
        <div className="main main-tables">
            <aside className="aside aside-tables">
                <h2 className="aside-name-myorder">Filtter by: </h2>
                <div onChange={filterChange} className="div-filter">
                    <div>
                        <input id="radioNone" name="filter" type="radio" className="radio filter-my-order" value="none" defaultChecked/>
                        <label htmlFor="radioNone">None</label>
                    </div>
                    <div>
                        <input id="radioPrice" name="filter" type="radio" className="radio filter-my-order" value="price"/>
                        <label htmlFor="radioPrice">Price</label>
                    </div>
                    <div>
                        <input id="radioDescription" name="filter" type="radio" className="radio filter-my-order" value="description"/>
                        <label htmlFor="radioDescription">Description</label>
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
                <h1 className="title-page">Laptops catalog</h1>
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

export default Catalog;