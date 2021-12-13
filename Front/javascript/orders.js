/* 
localhost:8080
144.22.242.102
*/

const addOrder = () =>{
    let tRow = document.querySelectorAll(".aside-tbody-ord tr")
    let nextId = tRow.length+1

    let tbody = "<tr id='tr"+nextId+"'>"
    tbody += "<td><button class='btn2-table' type='button' onclick='removeOrder("+nextId+")'><i class='fas fa-trash-alt'></i></button></td>"
    tbody += "<td><input class='inp-asi input-aside-id' type='text' required></td>"
    tbody += "<td><input class='inp-asi input-aside-qu' type='text' required></td>"
    tbody +="</tr>"
    
    $(".aside-table-ord tbody").append(tbody)
}
const removeOrder = (id) =>{
    $("#tr"+id).remove()
}

const sendOrder = async () =>{
    let date = new Date(); 
    let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    let salesMan = {};
    let products = {}
    let quantities = {};

    let idUser = sessionStorage.getItem("idUser")
    await GetDelAjax("http://144.22.242.102/api/user/"+idUser, "GET").done(function(datos){
        salesMan = {...datos}
    })

    let inpId = document.querySelectorAll(".input-aside-id")
    let inpQu = document.querySelectorAll(".input-aside-qu")
    for(i=0;i<inpId.length;i++){
        let idLap = inpId[i].value

        await GetDelAjax("http://144.22.242.102/api/laptop/"+idLap, "GET").done(function(datos){
            products[i+1] = {...datos}
        });

        let quantity = inpQu[i].value
        quantities[i+1] = quantity
    }

    myData={
        registerDay: isoDateTime,
        status: "Pendiente",
        salesMan: salesMan,
        products: products,
        quantities: quantities
    };
    await PosPutAjax("http://144.22.242.102/api/order/new", "POST", myData).done(function(datos){
        alert("Your order code is: #"+datos.id+""+datos.salesMan.id)
        location.reload()
    })
}

const setOrderProducts = () =>{
    GetDelAjax("http://144.22.242.102/api/laptop/all", "GET").done(function(datos){
        if(datos.length == 0){
            $(".alert1").css("display", "block")
        }else{
            for(i=0;i<datos.length;i++){
                let table = "<div class='col col-orders'>"
                table += "<div class='div-table-prod'>"
                table += "<table class='table-ord-prod'>"
                table += "<tbody>"
                for(const item in datos[i]){
                    if(item == "quantity" || item == "photography"){
                        continue
                    }
                    table+="<tr>"
                    table +="<th>"+item+":</th>";
                    table+="<td >"+datos[i][item]+"</td></tr>";
                }
                table+="</tbody></table></div></div>"
                $(".row-tables-prod").append(table)
            }
        }
    })
}

const setAseOrders =  async () =>{
    let user = await getIdUser()
    GetDelAjax("http://144.22.242.102/api/order/zona/"+user.zone, "GET").done(function(datos){
        if(datos.length == 0){
            $(".alert2").css("display", "block")
        }else{
            $(".div-table-ord").css("display", "block")
            for(const item of datos){
                let date = new Date(item.registerDay).toLocaleDateString()
                let table = "<tr>"
                table += "<td>"+item.salesMan.identification+"</td>";
                table += "<td>"+item.salesMan.name+"</td>";
                table += "<td>"+item.salesMan.email+"</td>";
                table += "<td>"+date+"</td>";
                table += "<td>"+item.id + item.salesMan.id+"</td>";
                table += "<td>"+item.status+"</td>";
                table += "<td><button class='btn1-table' onclick='orderDetails("+item.id+")'><i class='fas fa-eye'></i></button></td>";
                    
                table+="</tr>"
                $(".table-ord-coor tbody").append(table)
            }
        }
    })
}

const orderDetails = (id) =>{
    $(".table tbody").empty()
    GetDelAjax("http://144.22.242.102/api/order/"+id, "GET").done(function(datos){
        let date = new Date(datos.registerDay).toLocaleDateString()
        let options = ["Pendiente", "Aprobada", "Rechazada"]
        for(const opt of options){
            if(opt == datos.status){
                let index = options.indexOf(opt)
                options.splice(index, 1)
            }
        }
        let option1 = options[0];
        let option2 = options[1];

        let thead = "<th id='thSave'>Save</th>"
        let table = "<tr>"
        table += "<td>"+datos.salesMan.identification+"</td>";
        table += "<td>"+datos.salesMan.name+"</td>";
        table += "<td>"+datos.salesMan.email+"</td>";
        table += "<td>"+date+"</td>";
        table += "<td>"+datos.id + datos.salesMan.id+"</td>";
        table += "<td><select name='status' class='select' required>";
        table += "<option value="+datos.status+">"+datos.status+"</option>";
        table += "<option value="+option1+">"+option1+"</option>";
        table += "<option value="+option2+">"+option2+"</option></select></td>";
        table += "<td><button class='btn2-table' type='button' onclick='hideOrderDetails()'><i class='fas fa-eye-slash'></i></button></td>";
        table += "<td><button class='btn1-table' type='submit' onclick='saveStatus("+datos.id+")'><i class='fas fa-save'></i></button></td>";
        table+="</tr>"

        $(".table-ord-coor tbody").append(table)
        $(".table-ord-coor thead tr").append(thead)

        /* detalle de orden */
        let table2Thead;
        for(const item in datos.products){
            table2Thead += "<tr>"
            for(const item2 in datos.products[item]){
                if(item2 == "quantity"){
                    table2Thead +="<th>stock</th>";
                }
                if(item2 == "photography"){
                    continue;
                }
                table2Thead +="<th>"+item2+"</th>";
            }break;
        }
        
        let table2Tbody;
        for(const item in datos.products){
            table2Tbody += "<tr>"
            for(const item2 in datos.products[item]){
                if(item2 == "photography"){
                    continue;
                }
                table2Tbody +="<td>"+datos.products[item][item2]+"</td>";
            }
            table2Tbody +="<td>"+datos.quantities[item]+"</td></tr>";
        }
        $(".details").html("Order Details")
        $(".table-ord-details-coor thead").append(table2Thead)
        $(".table-ord-details-coor tbody").append(table2Tbody)
    })
}

const hideOrderDetails = () =>{
    $(".table tbody").empty()
    $("#thSave").remove()
    $(".details").html("")
    $(".table-ord-details-coor thead").empty()
    $(".table-ord-details-coor tbody").empty()
    setAseOrders()
}

const saveStatus = async (id) =>{
    myData={
        id:id,
        status: $(".select").val()
    };
    await PosPutAjax("http://144.22.242.102/api/order/update", "PUT", myData).done(function(datos){
        alert("Updated status to: "+$(".select").val())
    })
    hideOrderDetails()
}