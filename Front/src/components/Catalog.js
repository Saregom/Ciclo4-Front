import axios from "axios";
import React, { useEffect, useState } from "react";
import LaptopsList from "./laptopsList";

const Catalog = () =>{

    const [filter, setFilter ] = useState({
        radio: "none",
        price: 0,
        description: ""
    })

    const [myAlert, setMyAlert] = useState("")

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
                setMyAlert("There aren't products")
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
        setMyAlert("")
        if(filter.radio === "price"){
            axios.get("http://144.22.242.102/api/laptop/price/"+filter.price).then(function(res){
                if(res.data.length === 0){
                    setMyAlert("There isn't any laptop with price less or equal to: "+filter.price)
                }
                setListLaptop(res.data)
            }); 
        }else if(filter.radio === "description"){
            axios.get("http://144.22.242.102/api/laptop/description/"+filter.description).then(function(res){
                if(res.data.length === 0){
                    setMyAlert("There isn't any description with the word/s: "+filter.description)
                }
                setListLaptop(res.data)
            }); 
        }else{
            callLaptops()
        }
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
                <LaptopsList listLaptop={listLaptop} myAlert={myAlert}/>
            </div>
        </div>
    )
}

export default Catalog;