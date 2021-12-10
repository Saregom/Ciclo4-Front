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

const mainChanger = (page) => {
    if(page == ""){
        sessionStorage.removeItem("url")
        sessionStorage.removeItem("idUser")
        sessionStorage.removeItem("name")
    }else{
        sessionStorage.setItem("url", page)
    }
    /* mainChanger2() */
    location.reload()
}

/* const mainChanger2 = () => {
    console.log("inside 1")
    $('.main-changer').css('display', 'none')
    $('.father-preload').css('display', 'flex')
    let myUrl = sessionStorage.getItem("url")
    if(myUrl != null){
        $('.main-changer').load(myUrl)
    }
    setTimeout(function(){
        $('.father-preload').css('display', 'none')
        if(myUrl != "index.html" & myUrl != null){
            $('.myHeader').css('display', 'flex')
            $('.t-m-name').html(sessionStorage.getItem("name"))
            document.title = "Ocho Bits - Home"
        }
        $('.main-changer').css('display', 'block')
    },1000);
    console.log("inside 2")
} */

$(document).ready(function () {
    $('.main-changer').css('display', 'none')
    $('.father-preload').css('display', 'flex')
    let myUrl = sessionStorage.getItem("url")
    if(myUrl != null){
        $('.main-changer').load(myUrl)
    }
    setTimeout(function(){
        $('.father-preload').css('display', 'none')
        if(myUrl != "index.html" & myUrl != null){
            $('.myHeader').css('display', 'flex')
            $('.t-m-name').html(sessionStorage.getItem("name"))
            document.title = "Ocho Bits - Home"
        }
        $('.main-changer').css('display', 'block')
    },1000);

    if(myUrl == "orders.html"){
        let id = sessionStorage.getItem("idUser")
        if(id!=null){
            GetDelAjax("http://localhost:8080/api/user/"+id, "GET").done(function(datos){
                if(datos.type == "ASE"){
                    $(".main-orders").css("display", "block")
                    $(".main-orders2").css("display", "none")
                }else{
                    $(".main-orders2").css("display", "block")
                    $(".main-orders").css("display", "none")
                }

                //setOrderProducts()
            })
            
        }
        setOrderProducts()

    }
    
    
    
    /* 
    ajax(id)

    
    */
});

const changeDiv = (opc) => {
    $('.div').css('display', 'none')
    $(opc).css('display', 'block');

    if(opc==".divSignin"){
        $('.container').css('max-width', '600px')
    }else{
        $('.container').css('max-width', '450px')
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
        myData={
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