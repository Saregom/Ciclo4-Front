const changeDiv = (opc) => {
    $('.div').css('display', 'none')
    $(opc).css('display', 'block');
}

const verifyUser = () => {
    $.ajax({
        url: "http://localhost:8080/api/user/"+$("#email1").val()+"/"+$("#pass1").val(),
        method: "GET",
        dataType: "json",
        success: function (datos) {
            if(datos.id==null){
                alert("Email o contraseña incorrectos")
            }else{
                $('.div').css('display', 'none')
                $('.welcome').html('Bienvenido '+datos.name)
                $('#back').html('Volver')
            }
        }
    })
}

const verifyEmail = () => {
    $.ajax({
        url: "http://localhost:8080/api/user/"+$("#email").val(),
        method: "GET",
        dataType: "json",
        success: function (datos) {
            if(datos){
                $(".rEmail").html("La direccion de correo ya existe")
                validations(0)
            }else{
                $(".rEmail").html("")
                validations(1)
            }
        }
    })
}

const validations = (num) => {
    let correct=num;
    if($("#pass").val().length<8){
        $(".rPass").html("La contraseña debe tener minimo 8 caracteres")
    }else{
        $(".rPass").html("")
        correct++
    }

    if($("#pass").val() != $("#passConfirm").val()){
        $(".rConfirmPass").html("Las contraseñas no coinciden")
    }else{
        $(".rConfirmPass").html("")
        correct++
    }

    if(correct==3){
        registerClient()
    }
    correct=0
}

const registerClient = () =>{
    myData={ 
        email:$("#email").val(),
        password:$("#pass").val(),
        name:$("#name").val()
    };
    $.ajax({
        url: "http://localhost:8080/api/user/new",
        type:"POST",
        data: JSON.stringify(myData),
        contentType:'application/JSON',
        success: function(respuesta){
            alert("Registro exitoso")
            location.reload()
        }
    });
}