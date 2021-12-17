import axios from "axios";
import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';


const MakeOrder = () =>{

    const [myAlert, setAlert] = useState("")

    const [inputsOrder, setinputsOrder ] = useState({list:[]})

    const [keyI, setKeyI ] = useState(1)

    const [myRef, setMyRef ] = useState({1:React.createRef()})

    const [OrdProd, setOrdProd ] = useState({0: 0})

    const [OrdQuan, setOrdQuan ] = useState({0: 0})

    const [listLaptop, setListLaptop ] = useState([])

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

        //let id = sessionStorage.getItem("idUser")
        await axios.get("http://144.22.242.102/api/user/3").then(function(res){
            salesMan = {...res.data}
        }); 
        
        let i = 1
        for(const id in OrdProd){
            let idLap = OrdProd[id]
            await axios.get("http://144.22.242.102/api/laptop/"+idLap).then(function(res){
                products[i] = {...res.data}
            });
            quantities[i] = OrdQuan[id]
            i++
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

    useEffect(() => {
        axios.get("http://144.22.242.102/api/laptop/all").then(function(res){
            if(res.data.length === 0){
                setAlert("There aren't products")
            }
            setListLaptop(res.data)
        }); 
    }, []);

    const setTbody = () => {
        let table = []
        let i = 0
        if(listLaptop.length === 0){
            return []
        }else{
            for(const laptop of listLaptop){
                let tableTr = []
                
                for(const key in laptop){
                    if(key === "quantity" || key === "photography"){
                        continue
                    }
                    tableTr.push(<tr key={key}><th>{key}</th><td>{""+laptop[key]+""}</td></tr>)
                }
                table.push( 
                    <div key={i++} className='col col-orders'>
                        <div className='div-table-prod'>
                            <table className='table-ord-prod'>
                                <tbody>{tableTr}</tbody>
                            </table>
                        </div>
                    </div>)
            }
        }
        return table
        
    }

    return(
        <>
            <div className="main main-orders-ase">
                <aside className="aside aside-orders">
                    <h2 className="aside-name">Make your order</h2>
                        <form onSubmit={postOrders}>
                            <table className="table aside-table-ord" style={{marginBottom: '0'}}>
                                <thead className="aside-thead">
                                    <tr>
                                        <th>Del</th>
                                        <th>Prod. Id</th>
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
                    <h1>Products</h1>
                    <h2 className="alert1">{myAlert}</h2>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 row-tables-prod">
                        {setTbody()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MakeOrder;