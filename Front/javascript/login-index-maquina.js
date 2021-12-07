const mainChanger = (page) => {
    sessionStorage.setItem("url", page)
    location.reload()
}

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
    $.ajax({
        url: "http://144.22.242.102/api/user/"+$("#email1").val()+"/"+$("#pass1").val(),
        method: "GET",
        dataType: "json",
        success: function (datos) {
            if(datos.id==null){
                alert("Email o contraseña incorrectos")
            }else{
                sessionStorage.setItem("name", datos.name)
                mainChanger('home.html')
            }
        }
    })
}

const verifyEmail = () => {
    return $.ajax({
        url: "http://144.22.242.102/api/user/emailexist/"+$("#email").val(),
        method: "GET",
        dataType: "json",
    })
}
const validations = () => {
    verifyEmail().done(function(datos){
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

const getUsers = () => {
    return $.ajax({
        url: "http://144.22.242.102/api/user/all",
        type:"GET",
        contentType:'json'
    });
}
const registerClient = () =>{
    getUsers().done(function(datos){
        let id = 1;
        if(datos.length != 0){
            let idArray = [];
            for(const items of datos){
                idArray.push(items.id)
            }
            idArray.sort((a,b)=>b-a)
            id = idArray[0]+1
        }
        myData={
            id:id,
            name:$("#name").val(),
            identification:$("#identification").val(),
            email:$("#email").val(),
            password:$("#pass").val(),
            address:$("#address").val(),
            cellPhone:$("#cellPhone").val(),
            zone:$("#zone").val(),
            type:$("#type").val(),
        };
        $.ajax({
            url: "http://144.22.242.102/api/user/new",
            type:"POST",
            data: JSON.stringify(myData),
            contentType:'application/JSON',
            success: function(datos){
                alert("Registro exitoso")
                sessionStorage.setItem("name", datos.name)
                mainChanger('home.html')
            }
        });
    })
}