import axios from "axios";
import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import LaptopsList from "./laptopsList";

const MakeOrder = () =>{

    const [inputsOrder, setinputsOrder ] = useState({list:[]})

    const [keyI, setKeyI ] = useState(1)

    const [myRef, setMyRef ] = useState({1:React.createRef()})

    const [OrdProd, setOrdProd ] = useState({0: 0})

    const [OrdQuan, setOrdQuan ] = useState({0: 0})

    const OrdProdChange = (event) =>{
        const {name, value} = event.target
        const items = {[name]:value}
        setOrdProd(Object.assign(OrdProd, items))
    }

    const OrdQuanChange = (event) =>{
        const {name, value} = event.target
        const items = {[name]:value}
        setOrdQuan(Object.assign(OrdQuan, items))
    }

    const addOrder = () =>{
        let tableTr = [
            <tr key={keyI} ref={myRef[keyI]}>
                <td><button className='btn2-table' type="button" onClick={() => removeOrder(keyI)}><FontAwesomeIcon className="fas fa-trash-alt" icon={ faTrashAlt }/></button></td>
                <td><input
                    className='inp-asi input-aside-id'
                    name={keyI}
                    onChange={OrdProdChange}
                    type='number'
                    required/>  
                </td>
                <td><input
                    className='inp-asi input-aside-qu'
                    name={keyI}
                    onChange={OrdQuanChange}
                    type='number'
                    required/>
                </td>
            </tr>
        ]

        let mylist = inputsOrder.list
        setMyRef({[keyI+1]: React.createRef()})
        setKeyI(keyI+1)
        setinputsOrder({list:mylist.concat(tableTr)} )
    }


    const removeOrder = (id) =>{
        myRef[id].current.remove()
        let myObj = OrdProd
        delete myObj[id]
        let myObj2 = OrdQuan
        delete myObj2[id]
        setOrdProd(myObj); setOrdQuan(myObj2)
    }

    const postOrders = async (event) =>{
        event.preventDefault()

        let date = new Date(); 
        let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
        let salesMan = {}, products = {}, quantities = {}

        let id = sessionStorage.getItem("idUser")
        await axios.get(`http://144.22.242.102/api/user/${id}`).then(function(res){
            salesMan = {...res.data}
        }); 
        
        let indx = 1
        for(const id in OrdProd){
            let idLap = OrdProd[id]
            await axios.get(`http://144.22.242.102/api/laptop/${idLap}`).then(function(res){
                products[indx] = {...res.data}
            });
            quantities[indx] = OrdQuan[id]
            indx++
        }
        let myData={
            registerDay: isoDateTime,
            status: "Pendiente",
            salesMan: salesMan,
            products: products,
            quantities: quantities
        };

        axios.post("http://144.22.242.102/api/order/new", myData).then(function(res){
            alert("Your order code is: #"+res.data.id+""+res.data.salesMan.id)
        });
    }

    return(
        <>
            <div className="main main-orders-ase">
                <aside className="aside aside-top">
                    <h3 className="aside-name">Make your order</h3>
                        <form onSubmit={postOrders}>
                            <table className="table aside-table-ord" style={{marginBottom: '0'}}>
                                <thead className="aside-thead">
                                    <tr>
                                        <th>Del</th>
                                        <th>Lap. Id</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody className="aside-tbody-ord">
                                    <tr>
                                        <th>
                                            <button 
                                            type="button" 
                                            disabled title="disabled"><FontAwesomeIcon className="fas fa-trash-alt" icon={ faTrashAlt }/></button>
                                        </th>
                                        <td>
                                            <input 
                                            className="inp-asi input-aside-id"
                                            name={0}
                                            onChange={OrdProdChange}
                                            type="number"
                                            required/>
                                        </td>
                                        <td>
                                            <input
                                            className="inp-asi input-aside-qu"
                                            name={0}
                                            onChange={OrdQuanChange}
                                            type="number"
                                            required/>
                                        </td>
                                    </tr>
                                    {inputsOrder.list}
                                </tbody>
                            </table>
                            <button className="btn1-table btn-aside-ord" onClick={addOrder} type="button"><FontAwesomeIcon className="fas fa-plus" icon={ faPlus }/></button>
                            <input className="aside-btn" type="submit" value="Send order"/>
                        </form>
                </aside>
                <div className="main2 main2-orders">
                    <h1>Laptops</h1>
                    <LaptopsList/>
                </div>
                
            </div>
        </>
    )
}

export default MakeOrder;