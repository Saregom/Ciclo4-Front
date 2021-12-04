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
                loadHome(datos)
            }
        }
    })
}

const loadHome = (datos) => {
    $('.con1').css('display', 'none')
    $('.father-preload').css('display', 'flex')
    setTimeout(function(){
        window.location.href = 'home.html#'+datos.name;
    },1500);
}

$(document).ready(function () {
    if (window.location.hash) {
        let name = window.location.hash.substring(1)
        $('.t-m-name').html(name.replace("%20", " "))
    }
});

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
        console.log(correct)
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
        let id;
        let idArray = [];
        for(const items of datos){
            idArray.push(items.id)
        }
        idArray.sort((a,b)=>b-a)
        id = idArray[0]+1
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
                loadHome(datos)
            }
        });
    })
}