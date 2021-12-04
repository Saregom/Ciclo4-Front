const getId = (id) =>{
    return document.getElementById(id)
}

$(function(){
    $('.div-bars').click(function(){
        $(".nav-menu-popup").css('display', 'block');
        $(".nav-menu-popup").animate({opacity:'0.4', duration:500});
        $(".nav-menu-left").animate({width:'200px', easing:'ease', duration:500});
    })
    $(".nav-menu-popup, .txt-menu").click(function(){
        $(".nav-menu-left").animate({width:'0px', easing:'ease', duration:500});
        $(".nav-menu-popup").animate({opacity:'0', duration:500});
        setTimeout(function(){
            $(".nav-menu-popup").css('display', 'none');
        }, 500)
    })
})

const beforeGet = () => {
    $(".welcome").css("display", "none")
    $(".aside-inputs-user").empty();
    $(".aside-inputs-laptop").empty();
    $("#table").css("box-shadow","0 0")
    $("#thead").empty();
    $("#tbody").empty();
}

const getUsers2 = () => {
    $(".aside-user").css('display', 'block')
    $(".aside-laptop").css('display', 'none')
    beforeGet()
    let asideInputs;
    let arrayLabels = ["id", "identification", "name", "address", "cellPhone", "email", "password",  "zone", "type"]
    for(const label of arrayLabels){
        asideInputs = "<label class='aside-label'>"+label[0].toUpperCase() + label.slice(1)+"</label>"
        asideInputs += "<input type='text' id="+label+" class='aside-input'>"

        $(".aside-inputs-user").append(asideInputs)
    }
    $.ajax({
        url: "http://localhost:8080/api/user/all",
        type:"GET",
        contentType:'json',
        success: function(datos){
            
            let thead = "<tr>";
            let tbody = "<tr>";
            for(const item of datos){
                for(const item2 in item){
                    thead+="<th>"+item2+"</th>";
                }
                break;
            }
            thead+="<th>Upd/Del</th>";
            thead+="</tr>";
            for(const item of datos){
                tbody+="<tr>";
                for(const item2 in item){
                    tbody+="<td>"+item[item2]+"</td>";
                }
                tbody+="<td>"+"<button class='btn1-table' onclick='setInputs("+item.id+", 1)'><i class='fas fa-pencil-alt'></i></button>"+"<button class='btn2-table' onclick='DelLaptop("+item.id+")'><i class='fas fa-trash-alt'></i></button>"+"</td>";
                tbody+="</tr>";
            }
            $("#thead").append(thead)
            $("#tbody").append(tbody)
            $("#table").css("box-shadow","0 5px 10px 3px #bebebe")
        }
    });
}

const getLaptops = () => {
    $(".aside-user").css('display', 'none')
    $(".aside-laptop").css('display', 'block')
    beforeGet()

    let asideInputs;
    let arrayLabels = ["id", "brand", "model", "procesor", "os", "description", "memory", "hardDrive", "availability", "price", "quantity", "photography"]
    for(const label of arrayLabels){
        asideInputs = "<label class='aside-label'>"+label[0].toUpperCase() + label.slice(1)+"</label>"
        asideInputs += "<input type='Text' id="+label+" class='aside-input'>"
        $(".aside-inputs-laptop").append(asideInputs)
    }
    asideOpcion()
    $.ajax({
        url: "http://localhost:8080/api/laptop/all",
        type:"GET",
        contentType:'json',
        success: function(datos){
            let thead = "<tr>";
            let tbody = "<tr>";
            for(const item of datos){
                for(const item2 in item){
                    thead+="<th>"+item2+"</th>";
                }
                break;
            }
            thead+="<th>Upd/Del</th>";
            thead+="</tr>"; 
            for(const item of datos){
                tbody+="<tr>";
                for(const item2 in item){
                    tbody+="<td>"+item[item2]+"</td>";
                }
                tbody+="<td>"+"<button class='btn1-table' onclick='setInputs("+item.id+", 2)'><i class='fas fa-pencil-alt'></i></button>"+"<button class='btn2-table' onclick='DelLaptop("+item.id+")'><i class='fas fa-trash-alt'></i></button>"+"</td>";
                tbody+="</tr>";
            }
            $("#thead").append(thead)
            $("#tbody").append(tbody)
            $("#table").css("box-shadow","0 5px 10px 3px #bebebe")
        }
    });
}


const getLaptop = () => {
    return $.ajax({
        url: "http://localhost:8080/api/laptop/all",
        type:"GET",
        contentType:'json'
    });
}
const asideOpcion = () => {
    getLaptop().done(function(datos){
        let id;
        let idArray = [];
        for(const items of datos){
            idArray.push(items.id)
        }
        idArray.sort((a,b)=>b-a)
        id = idArray[0]+1

        let opc = $('input:radio[name=optionLaptop]:checked').val()
        let inpid = getId("id")
        if(opc == "POST"){
            inpid.disabled = true;
            $("#id").css("opacity", "0.7")
            $("#id").val(id)
        }else{
            inpid.disabled = false;
            $("#id").css("opacity", "1")
        }
    })
    
}
const getIdUser = (url) => {
    return $.ajax({
        url: url,
        type:"GET",
        contentType:'json'
    });
}
const setInputs = (id, opc) => {
    getId("radioU2").checked = true
    asideOpcion()
    switch(opc){
        case 1:
            url="http://localhost:8080/api/user/"+id; break;
        case 2:
            url="http://localhost:8080/api/laptop/"+id; break;
    }
    
    getIdUser(url).done(function(datos){
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
    let promes = getIdUser(url).done(function(datos){
        email = datos.email;
        console.log("1")
    })
    await promes; 
    verifyEmail().done(function(datos){
        console.log("2")
        if(datos & email != $("#email").val()){
            alert("La direccion de correo ya existe")
            $("#email").css("border", "2px solid red")
        }else{
            myData={
                id:$("#id").val(),
                name:$("#name").val(),
                identification:$("#identification").val(),
                email:$("#email").val(),
                password:$("#password").val(),
                address:$("#address").val(),
                cellPhone:$("#cellPhone").val(),
                zone:$("#zone").val(),
                type:$("#type").val(),
            };
            vacios(myData)
            $.ajax({
                url: "http://localhost:8080/api/user/update",
                type: "PUT",
                data: JSON.stringify(myData),
                contentType:'application/JSON',
                success: function(datos){
                    $(".aside-input").val("")
                    getUsers2();
                    alert("Datos Actualizados!")
                }
            });
        }
    })
    
}
const DelUser = (id) => {
    $.ajax({
        url: "http://localhost:8080/api/user/"+id,
        type: "DELETE",
        success: function(datos){
            getUsers2();
            alert("Datos Borrados!")
        }
    });
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
    console.log(opc)
    switch(opc){
        case "POST":
            url="http://localhost:8080/api/laptop/new"
            alerta="Datos Guardados!"; break;
        case "PUT":
            url="http://localhost:8080/api/laptop/update"
            alerta="Datos Actualizados!"; break;
    }
    vacios(myData)
    $.ajax({
        url: url,
        type: opc,
        data: JSON.stringify(myData),
        contentType:'application/JSON',
        success: function(datos){
            $(".aside-input").val("")
            getLaptops();
            alert(alerta)
        }
    });
}
const DelLaptop = (id) => {
    $.ajax({
        url: "http://localhost:8080/api/laptop/"+id,
        type: "DELETE",
        success: function(datos){
            getLaptops();
            alert("Datos Borrados!")
        }
    });
}