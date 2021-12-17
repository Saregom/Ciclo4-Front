import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSave } from '@fortawesome/free-solid-svg-icons';

const OrdersCoor = () =>{

    const [myAlert, setAlert] = useState("")

    const [orders, setOrders ] = useState([])

    const [status, setStatus ] = useState("")

    const [orderId, setOrderId ] = useState(0)

    const [buttonDetails, setButtonDetails ] = useState("")

    const [detailsH1, setDetailsH1 ] = useState("")

    const [orderDetailsTbody, setOrderDetailsTbody ] = useState([])

    const [orderDetailsThead, setOrderDetailsThead ] = useState([])

    /* function afterGet (data){
        setOrderId(0)
        setDetailsH1("")
        setOrderDetailsThead([])
        setOrderDetailsTbody([])
        setButtonDetails("")
        setOrders(data)
    } */

    const callOrders = async () => {
        let id = sessionStorage.getItem("idUser")
        await axios.get("http://144.22.242.102/api/user/"+id).then(function(res){
            let zone = res.data.zone
            axios.get("http://144.22.242.102/api/order/zona/"+zone).then(function(res){
                if(res.data.length === 0){
                    setAlert("There aren't orders")
                }
                setOrderId(0)
                setDetailsH1("")
                setOrderDetailsThead([])
                setOrderDetailsTbody([])
                setButtonDetails("")
                setOrders(res.data)
            });
        }); 
    }
    
    useEffect(  () =>{
         callOrders()
    }, [])

    const setTbodyOrders = () => {
        if(orders.length === 0){
            return []
        }else{
            let tableTr = []
            for(const ord of orders){
                let date = new Date(ord.registerDay).toLocaleDateString()
                let myButton;
                if(buttonDetails === "hidden"){
                    myButton = <button className='btn2-table' onClick={ callOrders } ><FontAwesomeIcon className="fas fa-eye-slash" icon={ faEyeSlash }/></button>
                }else{
                    myButton = <button className='btn1-table' onClick={() => setTbodyOrder(ord.id) }><FontAwesomeIcon className="fas fa-eye" icon={ faEye }/></button>
                }
                tableTr.push(
                    <tr key={ord.id}>
                        <td>{ord.salesMan.identification}</td>
                        <td>{ord.salesMan.name}</td>
                        <td>{ord.salesMan.email}</td>
                        <td>{date}</td>
                        <td>{ord.id +""+ ord.salesMan.id}</td>
                        <td>{ord.status}</td>
                        <td>{myButton}</td>
                    </tr>
                )
            }
            return tableTr
        }
    }

    const statusChange = (event) =>{
        setStatus(event.target.value)
    }

    const setTableStatus = () =>{
        if(orderId === 0){
            return []
        }else{
            return(
                <div className="div-table div-table-status">
                    <table className="table table-ord-status" style={{marginBottom: '0'}}>
                        <thead>
                            <tr>
                                <th>Change Status</th>
                                <th>Save</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <select value={status} onChange={statusChange}>
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="Aprobada">Aprobada</option>
                                        <option value="Rechazada">Rechazada</option>
                                    </select>
                                </td>
                                <td>
                                    <button className='btn1-table' onClick={put} ><FontAwesomeIcon className="fas fa-save" icon={ faSave }/></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    const setTbodyOrder = async (id) =>{
        let myOrder = {}
        await axios.get("http://144.22.242.102/api/order/"+id).then(function(res){
            myOrder = {...res.data}
            setButtonDetails("hidden")
            setStatus(myOrder.status)
            setOrders([res.data])
            setOrderId(id)
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

    const put = () => {
        let myData={
            id: orderId,
            status: status
        };
        axios.put("http://144.22.242.102/api/order/update", myData).then(function(res){
            alert("Updated status: " + status)
        });
    }

    return(
        <>
            <div className="container main-orders-coor">
                <h1>Commercial Advisor Orders</h1>
                <h2 className="alert2">{myAlert}</h2>
                <div className="div-table div-table-ord">
                    <table className="table table-ord-coor" style={{marginBottom: '0'}}>
                        <thead>
                            <tr>
                                <th>Identification</th>
                                <th>Name</th>
                                <th>E-mail</th>
                                <th>Date</th>
                                <th>#Order</th>
                                <th>Status</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>{setTbodyOrders()}</tbody>
                    </table>
                </div>
                {setTableStatus()}
                <h1 className="details">{detailsH1}</h1>
                <div className="div-table">
                    <table className="table table-ord-details-coor" style={{marginBottom: '0', displat: 'none'}}>
                        <thead><tr>{orderDetailsThead}</tr></thead>
                        <tbody>{orderDetailsTbody}</tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default OrdersCoor;