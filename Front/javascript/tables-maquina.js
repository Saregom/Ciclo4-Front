/* 
localhost:8080
144.22.242.102
*/
const getId = (id) =>{
    return document.getElementById(id)
}

const optionTable = (opc) => {
    $(".option-table .col").css({"background-color": "white", "color": "black"})
    $(opc).css({"background-color": "#5a57e7", "color": "white"})
}

const beforeGet = (d1, d2) => {
    $(".aside-user").css('display', d1)
    $(".aside-laptop").css('display', d2)
    $(".aside-inputs-user, .aside-inputs-laptop").empty()
    $(".aside-tables h2").css("display", "none")
    $(".div-table").css("box-shadow","0 0")
}

const afterGet = (nombres, aside, url, opc) => {
    let asideInputs =""
    
    for(let label of nombres){
        let type = "text";
        let inpLabel = label;
        if(label == "birthtDay"){
            label = "birthDay"
            type = "date"
        }
        if(label == "monthBirthtDay"){
            label = "monthBirthDay"
            type = "number"
        }
        if(label == "id" || label == "identification" || label == "cellPhone" || label == "price" || label == "quantity" ){
            type = "number"
        }
        asideInputs += "<label class='aside-label'>"+label[0].toUpperCase() + label.slice(1)+"</label>"
        if(label == "type"){
            asideInputs += "<select name='type' class='aside-input' id='type' required>";
            asideInputs += "<option value='' selected disabled hidden></option>";
            asideInputs += "<option value='ASE'>ASE</option>";
            asideInputs += "<option value='COORD'>COORD</option>";
            asideInputs += "<option value='ADM'>ADM</option></select>";
            continue;
        }
        if(label == "availability"){
            asideInputs += "<select name='availability' class='aside-input' id='availability' required>";
            asideInputs += "<option value='' selected disabled hidden></option>";
            asideInputs += "<option value='true'>True</option>";
            asideInputs += "<option value='false'>False</option></select>";
            continue;
        }
        asideInputs += "<input type="+type+" id="+inpLabel+" class='aside-input' required>"
    }
    $(aside).html(asideInputs)
    GetDelAjax(url, "GET").done(function(datos){
        if(datos.length == 0){
            $(".welcome").html("No data to show")
            $(".welcome").css("display", "block")
        }else{
            let thead = "<tr>";
            for(const item of datos){
                console.log(item)
                for(let key in item){
                    console.log(key)
                    console.log(item[key] = obj.name)
                    if(key == "birthtDay"){
                        key = "birthDay"
                    }else if(key == "monthBirthtDay"){
                        key = "monthBirthDay"
                    }
                    thead+="<th class='th-tables'>"+key+"</th>";
                }break;
            }
            thead+="<th class='th-tables'>Upd/Del</th></tr>";
            let tbody;
            for(const item of datos){
                tbody+="<tr>";
                for(const key in item){
                    let val = item[key];
                    if(key == "birthtDay"){
                        val = new Date(val).toLocaleDateString()
                    }
                    tbody+="<td class='td-tables'>"+val+"</td>";
                }
                tbody+="<td class='td-tables'><button class='btn1-table' onclick='setInputs("+item.id+", "+opc+")'><i class='fas fa-pencil-alt'></i></button>"
                if(opc == 1){
                    tbody+="<button class='btn2-table' onclick='DelUser("+item.id+")'><i class='fas fa-trash-alt'></i></button></td></tr>";
                }else{
                    tbody+="<button class='btn2-table' onclick='DelLaptop("+item.id+")'><i class='fas fa-trash-alt'></i></button></td></tr>";
                }
            }
            $(".table thead").html(thead)
            $(".table tbody").html(tbody)
            $(".div-table").css("box-shadow","0 0 10px #B8B8B8")
        }
    })
}

const getUsers = async (opc) => {
    optionTable(opc)
    beforeGet('block', 'none')
    let nombres = ["id", "identification", "name", "birthtDay", "monthBirthtDay", "address", "cellPhone", "email", "password",  "zone", "type"]
    afterGet(nombres, ".aside-inputs-user", "http://144.22.242.102/api/user/all", 1)
}

const getLaptops = async (opc) => {
    optionTable(opc)
    beforeGet('none', 'block')
    let nombres = ["id", "brand", "model", "procesor", "os", "description", "memory", "hardDrive", "availability", "price", "quantity", "photography"]
    afterGet(nombres, ".aside-inputs-laptop", "http://144.22.242.102/api/laptop/all", 2)
    asideOpcion()
}

const asideOpcion = () => {
    let opc = $('input:radio[name=optionLaptop]:checked').val()
    let inpId = getId("id")
    
    if(opc == "POST"){
        inpId.disabled = true;
        inpId.title = "Disabled"
        $("#id").css("opacity", "0.3")
        $("#id").val("")
    }else{
        inpId.disabled = false;
        inpId.title = ""
        $("#id").css("opacity", "1")
    }
}

const setInputs = (id, opc) => {
    getId("radioU2").checked = true
    asideOpcion()
    let url = ""
    if(opc == 1){
        url="http://144.22.242.102/api/user/"+id;
    }else{
        url="http://144.22.242.102/api/laptop/"+id;
    }
    
    GetDelAjax(url, "GET").done(function(datos){
        for(const key in datos){
            let val = datos[key];
            if(key == "birthtDay"){
                val = val.substr(0, 10)
            }
            $("#"+key+"").val(""+val+"")
        }
    })
}

const vacios = (myData) => {
    for(const dato in myData){
        if(myData[dato]==""){
            myData[dato]=null
        }
    }
}
const PutUser = async () => {
    let email;
    let url = "http://144.22.242.102/api/user/"+$("#id").val();
    let getId = GetDelAjax(url, "GET").done(function(datos){
        email = datos.email;
    })
    await getId; 
    GetDelAjax("http://144.22.242.102/api/user/emailexist/"+$("#email").val(), "GET").done(function(datos){
        if(datos & email != $("#email").val()){
            alert("La direccion de correo ya existe")
            $("#email").css("border", "2px solid red")
        }else{
            let myData={
                id:$("#id").val(),
                name:$("#name").val(),
                identification:$("#identification").val(),
                birthtDay:$("#birthtDay").val(),
                monthBirthtDay:$("#monthBirthtDay").val(),
                email:$("#email").val(),
                password:$("#password").val(),
                address:$("#address").val(),
                cellPhone:$("#cellPhone").val(),
                zone:$("#zone").val(),
                type:$("#type").val(),
            };
            vacios(myData)
            PosPutAjax("http://144.22.242.102/api/user/update", "PUT", myData).done(function(datos){
                $(".aside-input").val("")
                getUsers(".opt-users");
                alert("Datos Actualizados!")
            })
        }
    })
}
const DelUser = (id) => {
    GetDelAjax("http://144.22.242.102/api/user/"+id, "DELETE").done(function(datos){
        getUsers(".opt-users");
        alert("Datos Borrados!")
    })
}

const PostPutLaptop = () => {
    let myData={
        id:$("#id").val(),
        brand:$("#brand").val(),
        model:$("#model").val(),
        procesor:$("#procesor").val(),
        os:$("#os").val(),
        description:$("#description").val(),
        memory:$("#memory").val(),
        hardDrive:$("#hardDrive").val(),
        availability:$("#availability").val(),
        price:$("#price").val(),
        quantity:$("#quantity").val(),
        photography:$("#photography").val(),
    };
    let opc = $('input:radio[name=optionLaptop]:checked').val()
    let url;
    if(opc == "POST"){
        url="http://144.22.242.102/api/laptop/new"
        alerta="Datos Guardados!";
    }else{
        url="http://144.22.242.102/api/laptop/update"
        alerta="Datos Actualizados!";
    }
    vacios(myData)
    PosPutAjax(url, opc, myData).done(function(datos){
        $(".aside-input").val("")
        getLaptops(".opt-laptops");
        alert(alerta)
    })
}
const DelLaptop = (id) => {
    GetDelAjax("http://144.22.242.102/api/laptop/"+id, "DELETE").done(function(datos){
        getLaptops(".opt-laptops");
        alert("Datos Borrados!")
    })
}