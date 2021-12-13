/* 
localhost:8080
144.22.242.102
*/
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
    $(".menu-logo-user, .div-menu-user").click(function(){
        $(".nav-menu-popup2, .info-user").css("display", "block")
    })
    $(".nav-menu-popup2").click(function(){
        $(".nav-menu-popup2, .info-user").css("display", "none")
    })
})

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
    await GetDelAjax("http://144.22.242.102/api/user/"+idUser, "GET").done(function(datos){
        result = datos
    })
    return result
}

const mainChanger = (page) => {
    if(page == "login.html"){
        sessionStorage.removeItem("idUser")
        sessionStorage.removeItem("name")
    }
    sessionStorage.setItem("url", page)
    let myUrl = sessionStorage.getItem("url")
    if(myUrl != "login.html"){
        initialProcces(myUrl)
        setInfoPerfil()
    }else{
        location.reload()
    }
}
const initialProcces = (myUrl) => {
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
            GetDelAjax("http://144.22.242.102/api/user/"+id, "GET").done(function(datos){
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

const setInfoPerfil = () =>{
    let id = sessionStorage.getItem("idUser")
    GetDelAjax("http://144.22.242.102/api/user/"+id, "GET").done(function(datos){
        let info = "<h3>"+datos.name+"</h3>"
        info += "<label>"+datos.type+" - "+datos.zone+"</label>"
        info += "<hr>"
        info += "<p>"+datos.email+"</p>"
        info += "<p>"+datos.identification+"</p>"
        info += "<hr>"
        info += "<p class='logout' onclick='mainChanger(\"login.html\")'>Logout</p>"
        $(".info-user").html(info)
    })
}

$(document).ready(function() {
    let myUrl = sessionStorage.getItem("url")
    if(myUrl == null){
        sessionStorage.setItem("url", "login.html")
        myUrl = sessionStorage.getItem("url")
    }
    if(myUrl != "login.html"){
        setInfoPerfil()
    }
    initialProcces(myUrl)
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
    GetDelAjax("http://144.22.242.102/api/user/"+$("#email1").val()+"/"+$("#pass1").val(), "GET").done(function(datos){
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
    GetDelAjax("http://144.22.242.102/api/user/emailexist/"+$("#email").val(), "GET").done(function(datos){
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
    GetDelAjax("http://144.22.242.102/api/user/all", "GET").done(function(datos){
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
        PosPutAjax("http://144.22.242.102/api/user/new", "POST", myData).done(function(datos){
            alert("Registro exitoso")
            sessionStorage.setItem("name", datos.name)
            sessionStorage.setItem("idUser", datos.id)
            mainChanger('home.html')
        });
    })
}