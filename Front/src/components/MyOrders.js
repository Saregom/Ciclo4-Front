import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const MyOrders = () =>{

    const [filter, setFilter ] = useState({
        radio: "",
        status: "Pendiente",
        date: ""
    })

    const [alert, setAlert] = useState("")

    const [orders, setOrders ] = useState([])

    const [buttonDetails, setButtonDetails ] = useState("")

    const [detailsH1, setDetailsH1 ] = useState("")

    const [orderDetailsTbody, setOrderDetailsTbody ] = useState([])

    const [orderDetailsThead, setOrderDetailsThead ] = useState([])

    const filterChange = (event) =>{
        setFilter({...filter, radio: event.target.value})
    }

    const statusChange = (event) =>{
        setFilter({...filter, status: event.target.value})
    }

    const dateChange = (event) =>{
        setFilter({...filter, date: event.target.value})
    }

    const filterType = () =>{
        if(filter.radio === "status"){
            return(
                <select value={filter.status} onChange={statusChange} required>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Aprobada">Aprobada</option>
                    <option value="Rechazada">Rechazada</option>
                </select>
            )
        }else if(filter.radio === "date"){
            return(
                <input type="date" value={filter.date} onChange={dateChange} required></input>
            )
        }
        return []
    }

    function afterGet (data){
        setDetailsH1("")
        setOrderDetailsThead([])
        setOrderDetailsTbody([])
        setButtonDetails("")
        setOrders(data)
    }

    const callOrders = async () => {
        let id = sessionStorage.getItem("idUser")
        await axios.get("http://144.22.242.102/api/order/salesman/"+id).then(function(res){
            if(res.data.length === 0){
                setAlert("You don't have any order")
            }
            afterGet(res.data)
        }); 
    }

    useEffect(  () =>{
        const callOrdersEffect = async () => {
            let id = sessionStorage.getItem("idUser")
            await axios.get("http://144.22.242.102/api/order/salesman/"+id).then(function(res){
                if(res.data.length === 0){
                    setAlert("You don't have any order")
                }
                afterGet(res.data)
            }); 
        }
        callOrdersEffect()
    }, [])

    function applyFilter (event){
        event.preventDefault()
        setAlert("")
        let id = sessionStorage.getItem("idUser")
        if(filter.radio === "date"){
            axios.get("http://144.22.242.102/api/order/date/"+filter.date+"/"+id).then(function(res){
                if(res.data.length === 0){
                    setAlert("There isn't any order at date: "+filter.date)
                }
                afterGet(res.data)
            }); 
        }else if(filter.radio === "status"){
            axios.get("http://144.22.242.102/api/order/state/"+filter.status+"/"+id).then(function(res){
                if(res.data.length === 0){
                    setAlert("There isn't any order with status: "+filter.status)
                }
                afterGet(res.data)
            }); 
        }else{
            callOrders()
        }
    }

    const setTbodyOrders = () => {
        if(orders.length === 0){
            return []
        }else{
            let tableTr = []
            for(const ord of orders){
                let myDate = new Date(ord.registerDay)
                myDate.setMinutes(myDate.getMinutes() + myDate.getTimezoneOffset())
                let date = myDate.toLocaleDateString()
                
                let myButton;

                if(buttonDetails === "hidden"){
                    myButton = <button className='btn2-table' onClick={ callOrders } ><FontAwesomeIcon className="fas fa-eye-slash" icon={ faEyeSlash }/></button>
                }else{
                    myButton = <button className='btn1-table' onClick={() => setTbodyOrder(ord.id) }><FontAwesomeIcon className="fas fa-eye" icon={ faEye }/></button>
                }
                tableTr.push(
                    <tr key={ord.id}>
                        <td>{ord.id +""+ ord.salesMan.id}</td>
                        <td>{date}</td>
                        <td>{ord.status}</td>
                        <td>{myButton}</td>
                    </tr>
                )
            }
            return tableTr
        }
    }

    const setTbodyOrder = async (id) =>{
        let myOrder = {}
        await axios.get("http://144.22.242.102/api/order/"+id).then(function(res){
            myOrder = {...res.data}
            setButtonDetails("hidden")
            setOrders([res.data])
        });

        let tOrderDetailTr = []
        let tOrderDetailTh = []
        for(const product in myOrder.products){
            for(const key in myOrder.products[product]){
                if(key === "quantity"){
                    tOrderDetailTh.push(<th key={"stock"}>stock</th>)
                }
                if(key === "photography"){
                    continue;
                }
                tOrderDetailTh.push(<th key={key}>{key}</th>)
            }break;
        }
        let i = 0
        for(const product in myOrder.products){
            let tOrderDetailTd = []
            for(const key in myOrder.products[product]){
                if(key === "photography"){
                    continue;
                }
                let val =  myOrder.products[product][key]
                tOrderDetailTd.push(<td key={key}>{""+val+""}</td>)
            }
            tOrderDetailTd.push(<td key={"quantity2"}>{myOrder.quantities[product]}</td>)
            tOrderDetailTr.push(
                <tr key={i++}>{tOrderDetailTd}</tr>
            )
        }
        setDetailsH1("Order Details")
        setOrderDetailsThead(tOrderDetailTh)
        setOrderDetailsTbody(tOrderDetailTr)
    }

    return(
        <>
            <div className="main main-orders">
                <aside className="aside aside-my-orders">
                    <h2 className="aside-name-myorder">Filtter by: </h2>
                    <div onChange={filterChange} className="div-filter">
                        <div>
                            <input id="radioNone" name="filter" type="radio" className="radio filter-my-order" value="none" defaultChecked/>
                            <label htmlFor="radioNone">None</label>
                        </div>
                        <div>
                            <input id="radioDate" name="filter" type="radio" className="radio filter-my-order" value="date"/>
                            <label htmlFor="radioDate">Date</label>
                        </div>
                        <div>
                            <input id="radioStatus" name="filter" type="radio" className="radio filter-my-order" value="status"/>
                            <label htmlFor="radioStatus">Status</label>
                        </div>
                    </div>
                    <form onSubmit={applyFilter}>
                        <div className="div-filter-type">
                            {filterType()}
                        </div>
                        <button type="submit" className="aside-btn">Apply filter</button>
                    </form>
                </aside>
                <div className="main2 main-orders-myorder">
                    <h1 className="title-page">My orders</h1>
                    <h2 className="alert2">{alert}</h2>
                    <div className="div-table div-table-ord">
                        <table className="table table-ord-myorder" style={{marginBottom: '0'}}>
                            <thead>
                                <tr>
                                    <th>#Order</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>{setTbodyOrders()}</tbody>
                        </table>
                    </div>
                    <h1 className="details">{detailsH1}</h1>
                    <div className="div-table">
                        <table className="table table-ord-details-myorder" style={{marginBottom: '0', displat: 'none'}}>
                            <thead><tr>{orderDetailsThead}</tr></thead>
                            <tbody>{orderDetailsTbody}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MyOrders;