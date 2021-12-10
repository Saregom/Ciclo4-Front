/* 
localhost:8080
144.22.242.102
*/
const getId = (id) =>{
    return document.getElementById(id)
}

$(function(){
    $('.div-bars').click(function(){
        $(".nav-menu-popup").css('display', 'block');
        $(".nav-menu-popup").animate({opacity:'0.4', duration:500});
        $(".nav-menu-left").animate({width:'200px', easing:'ease', duration:500});
    })
    $(".nav-menu-popup, .txt-menu-left").click(function(){
        $(".nav-menu-left").animate({width:'0px', easing:'ease', duration:500});
        $(".nav-menu-popup").animate({opacity:'0', duration:500});
        setTimeout(function(){
            $(".nav-menu-popup").css('display', 'none');
        }, 500)
    })
})

const beforeGet = (d1, d2) => {
    $(".aside-user").css('display', d1)
    $(".aside-laptop").css('display', d2)
    $(".welcome, .welcome2").css("display", "none")
    $(".aside-inputs-user, .aside-inputs-laptop").empty();
    $("#table-tables").css("box-shadow","0 0")
    $("#thead-tables, #tbody-tables").empty();
}

const afterGet = (nombres, aside, url, opc) => {
    for(const label of nombres){
        let asideInputs = "<label class='aside-label'>"+label[0].toUpperCase() + label.slice(1)+"</label>"
        asideInputs += "<input type='text' id="+label+" class='aside-input'>"

        $(aside).append(asideInputs)
    }
    GetDelAjax(url, "GET").done(function(datos){
        if(datos.length == 0){
            $(".welcome").html("There are not data to show")
            $(".welcome").css("display", "block")
        }else{
            let thead = "<tr>";
            for(const item of datos){
                for(const item2 in item){
                    thead+="<th class='th-tables'>"+item2+"</th>";
                }break;
            }
            thead+="<th class='th-tables'>Upd/Del</th></tr>";
            let tbody;
            for(const item of datos){
                tbody+="<tr>";
                for(const item2 in item){
                    tbody+="<td class='td-tables'>"+item[item2]+"</td>";
                }
                tbody+="<td class='td-tables'><button class='btn1-table' onclick='setInputs("+item.id+", "+opc+")'><i class='fas fa-pencil-alt'></i></button>"
                if(opc == 1){
                    tbody+="<button class='btn2-table' onclick='DelUser("+item.id+")'><i class='fas fa-trash-alt'></i></button></td></tr>";
                }else{
                    tbody+="<button class='btn2-table' onclick='DelLaptop("+item.id+")'><i class='fas fa-trash-alt'></i></button></td></tr>";
                }
                
            }
            $("#thead-tables").append(thead)
            $("#tbody-tables").append(tbody)
            $("#table").css("box-shadow","0 5px 10px 3px #bebebe")
        }
    })
}

const getUsers = async () => {
    beforeGet('block', 'none')
    let nombres = ["id", "identification", "name", "birthtDay", "monthBirthtDay", "address", "cellPhone", "email", "password",  "zone", "type"]
    afterGet(nombres, ".aside-inputs-user", "http://localhost:8080/api/user/all", 1)
}

const getLaptops = async () => {
    beforeGet('none', 'block')
    let nombres = ["id", "brand", "model", "procesor", "os", "description", "memory", "hardDrive", "availability", "price", "quantity", "photography"]
    afterGet(nombres, ".aside-inputs-laptop", "http://localhost:8080/api/laptop/all", 2)
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
        url="http://localhost:8080/api/user/"+id;
    }else{
        url="http://localhost:8080/api/laptop/"+id;
    }
    
    GetDelAjax(url, "GET").done(function(datos){
        //This method is so crazy
        for(const item in datos){
            $("#"+item+"").val(datos[item])
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
    let url = "http://localhost:8080/api/user/"+$("#id").val();
    let getId = GetDelAjax(url, "GET").done(function(datos){
        email = datos.email;
    })
    await getId; 
    GetDelAjax("http://localhost:8080/api/user/emailexist/"+$("#email").val(), "GET").done(function(datos){
        if(datos & email != $("#email").val()){
            alert("La direccion de correo ya existe")
            $("#email").css("border", "2px solid red")
        }else{
            myData={
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
            PosPutAjax("http://localhost:8080/api/user/update", "PUT", myData).done(function(datos){
                $(".aside-input").val("")
                getUsers();
                alert("Datos Actualizados!")
            })
        }
    })
}
const DelUser = (id) => {
    GetDelAjax("http://localhost:8080/api/user/"+id, "DELETE").done(function(datos){
        getUsers();
        alert("Datos Borrados!")
    })
}

const PostPutLaptop = () => {
    myData={
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
        url="http://localhost:8080/api/laptop/new"
        alerta="Datos Guardados!";
    }else{
        url="http://localhost:8080/api/laptop/update"
        alerta="Datos Actualizados!";
    }
    vacios(myData)
    PosPutAjax(url, opc, myData).done(function(datos){
        $(".aside-input").val("")
        getLaptops();
        alert(alerta)
    })
}
const DelLaptop = (id) => {
    GetDelAjax("http://localhost:8080/api/laptop/"+id, "DELETE").done(function(datos){
        getLaptops();
        alert("Datos Borrados!")
    })
}