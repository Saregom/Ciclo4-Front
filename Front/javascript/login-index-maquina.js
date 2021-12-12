/* 
localhost:8080
144.22.242.102
*/
const GetDelAjax = (url, type) =>{
    return $.ajax({
        url: url,
        type: type,
        contentType:'application/JSON'
    });
}

const PosPutAjax = (url, type, data) =>{
    return $.ajax({
        url: url,
        type:type,
        contentType:'application/JSON',
        data: JSON.stringify(data),
    });
}

const getIdUser = async () =>{
    let idUser = sessionStorage.getItem("idUser")
    let result;
    await GetDelAjax("http://localhost:8080/api/user/"+idUser, "GET").done(function(datos){
        result = datos
    })
    return result
}

const mainChanger = (page) => {
    if(page == ""){
        sessionStorage.removeItem("url")
        sessionStorage.removeItem("idUser")
        sessionStorage.removeItem("name")
    }else{
        sessionStorage.setItem("url", page)
    }

    let myUrl = sessionStorage.getItem("url")
    if(myUrl != null){
        procces(myUrl)
    }else{
        location.reload()
    }
}
const procces = (myUrl) => {
    switch(myUrl){
        case "home.html": document.title = "Home - Ocho Bits";break;
        case "tables.html": document.title = "Tables - Ocho Bits";break;
        case "orders.html": document.title = "Orders - Ocho Bits";break;
        default: document.title = "Login - Ocho Bits"
    }
    $('.main-changer').load(myUrl)
    if(myUrl != "login.html"){
        $('.header').css("display", "flex")
        $('.t-m-name').html(sessionStorage.getItem("name"))
    }
    if(myUrl == "orders.html"){
        let id = sessionStorage.getItem("idUser")
        if(id!=null){
            GetDelAjax("http://localhost:8080/api/user/"+id, "GET").done(function(datos){
                if(datos.type == "ASE"){
                    setOrderProducts()
                    $(".main-orders-coor").css("display", "none")
                    $(".main-orders-ase").css("display", "block")
                }else{
                    setAseOrders()
                    $(".main-orders-ase").css("display", "none")
                    $(".main-orders-coor").css("display", "block")
                }
            })
        }
    }
}

$(document).ready(function() {
    let myUrl = sessionStorage.getItem("url")
    if(myUrl == null){
        sessionStorage.setItem("url", "login.html")
        myUrl = sessionStorage.getItem("url")
    }
    procces(myUrl)
    /* console.log("22") */
    /* setTimeout(function(){$('.main-changer').css('display', 'block')},1000); */
    //$('.main-changer').css('display', 'block')
});

const changeDiv = (opc) => {
    $('.div-index').css('display', 'none')
    $(opc).css('display', 'block');

    if(opc==".divSignin"){
        $('.con-index').css('max-width', '600px')
    }else{
        $('.con-index').css('max-width', '450px')
    }
}

const verifyUser = () => {
    GetDelAjax("http://localhost:8080/api/user/"+$("#email1").val()+"/"+$("#pass1").val(), "GET").done(function(datos){
        if(datos.id==null){
            alert("Email o contraseña incorrectos")
        }else{
            sessionStorage.setItem("name", datos.name)
            sessionStorage.setItem("idUser", datos.id)
            mainChanger('home.html')
        }
    })
}

const validations = () => {
    GetDelAjax("http://localhost:8080/api/user/emailexist/"+$("#email").val(), "GET").done(function(datos){
        if(datos){
            $(".rEmail").html("La direccion de correo ya existe")
            correct = false
        }else{
            $(".rEmail").html("")
            correct = true
        }

        if($("#pass").val().length<8){
            $(".rPass").html("La contraseña debe tener minimo 8 caracteres")
            correct = false
        }else{
            $(".rPass").html("")
        }
    
        if($("#pass").val() != $("#passConfirm").val()){
            $(".rConfirmPass").html("Las contraseñas no coinciden")
            correct = false
        }else{
            $(".rConfirmPass").html("")
        }
        
        if(correct){
            registerClient()
        }
    })   
}

const registerClient = () =>{
    GetDelAjax("http://localhost:8080/api/user/all", "GET").done(function(datos){
        let myData={
            name:$("#name").val(),
            identification:$("#identification").val(),
            birthtDay:$("#birthDay").val(),
            monthBirthtDay:$("#mBirthDay").val(),
            email:$("#email").val(),
            password:$("#pass").val(),
            address:$("#address").val(),
            cellPhone:$("#cellPhone").val(),
            zone:$("#zone").val(),
            type:$("#type").val(),
        };
        PosPutAjax("http://localhost:8080/api/user/new", "POST", myData).done(function(datos){
            alert("Registro exitoso")
            sessionStorage.setItem("name", datos.name)
            sessionStorage.setItem("idUser", datos.id)
            mainChanger('home.html')
        });
    })
}