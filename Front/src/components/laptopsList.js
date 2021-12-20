import axios from "axios";
import { useEffect, useState } from "react";
/* import { getListLaptop } from "./Catalog"  */ 


const LaptopsList = (props) =>{

    const [myAlert, setAlert] = useState("")

    const [listLaptop, setListLaptop ] = useState([])

    /* if(applyFilter() == ) */
    /* console.log(getListLaptop()) */

    const listImages = [
        "https://drive.google.com/thumbnail?id=1OC73x8yMaOEBKdlEHTB2Qrkix2BbrUb3",
        "https://drive.google.com/thumbnail?id=1MiwEqpb37VgZW_YGSAypFVCi2Shz9syq",
        "https://drive.google.com/thumbnail?id=1BvYybPXfe1hIReEJ0-xpgCYEUb1krenW"   
    ]

    useEffect(() => {
        const callLaptops = () =>{
            axios.get("http://144.22.242.102/api/laptop/all").then(function(res){
                if(res.data.length === 0){
                    setAlert("There aren't products")
                }
                setListLaptop(res.data)
                
            }); 
        }
        callLaptops()
    }, []);

    useEffect(() => {
        if(Object.keys(props).length !== 0){
            /* if(props.listLaptop.length !== 0){
                setListLaptop(props.listLaptop)
            }else{
                setListLaptop([])
            } */
            setListLaptop(props.listLaptop)
            setAlert(props.myAlert)
        }
    }, [props]);

    const setTbody = () => {
        let table = []
        if(listLaptop.length === 0){
            return []
        }else{
            let i1 = 0
            let i2 = 0
            for(const laptop of listLaptop){
                let tableTr = []
                if(i2 === listImages.length){
                    i2 = 0
                }
                for(const key in laptop){
                    if(key === "quantity" || key === "photography" || key === "description"){
                        continue
                    }
                    tableTr.push(<tr key={key}><th>{key}</th><td>{""+laptop[key]+""}</td></tr>)
                }
                tableTr.push(<tr key={"description"}><td className="description" colSpan="2">{laptop.description}</td></tr>)

                table.push( 
                    <div key={i1++} className='col col-orders'>
                        <div className='div-table-prod'>
                            <table className='table-ord-prod'>
                                <thead><tr><th colSpan="2"><img src={listImages[i2++]} alt="img1"/></th></tr></thead>
                                <tbody>{tableTr}</tbody>
                            </table>
                        </div>
                    </div>)
            }
        }
        return table
    }

    return(
        <div>
            <h2 className="alert1">{myAlert}</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 row-tables-prod">
                {setTbody()}
            </div>
        </div>
    )
}

export default LaptopsList;