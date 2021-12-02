const getId = (id) =>{
    return document.getElementById(id)
}

const getUsers2 = () => {
    $(".welcome").css("display", "none")
    $(".aside-name").html("User")
    $(".div-aside-inputs").empty();
    $("#thead").empty();
    $("#tbody").empty();

    getId("inpC").disabled = true;
    getId("lblC").title = "disabled"
    getId("inpU").checked = true;
    
    let asideInputs;
    let arrayLabels = ["Id", "Name", "Identification", "Email", "Password", "Address", "CellPhone", "Zone", "Type"]
    for(const label of arrayLabels){
        asideInputs = "<label class='aside-label'>"+label+"</label>"
        asideInputs += "<input type='text' id="+label+" class='aside-input'>"

        $(".div-aside-inputs").append(asideInputs)
    }
   
    $.ajax({
        url: "http://localhost/api/user/all",
        type:"GET",
        contentType:'json',
        success: function(datos){
            let thead = "<tr>";
            let tbody = "<tr>";
            
            thead+="<th>Id</th>";
            thead+="<th>Name</th>";
            thead+="<th>Identification</th>";
            thead+="<th>Email</th>";
            thead+="<th>Password</th>";
            thead+="<th>Address</th>";
            thead+="<th>CellPhone</th>";
            thead+="<th>Zone</th>";
            thead+="<th>Type</th>";
            thead+="</tr>";
            for(const item of datos){
                tbody+="<td>"+item.id+"</td>";
                tbody+="<td>"+item.name+"</td>";
                tbody+="<td>"+item.identification+"</td>";
                tbody+="<td>"+item.email+"</td>";
                tbody+="<td>"+item.password+"</td>";
                tbody+="<td>"+item.address+"</td>";
                tbody+="<td>"+item.cellPhone+"</td>";
                tbody+="<td>"+item.zone+"</td>";
                tbody+="<td>"+item.type+"</td>";
                tbody+="</tr>";
            }
            $("#thead").append(thead)
            $("#tbody").append(tbody)
            $("#table").css("box-shadow","0 5px 10px 3px #bebebe")
        }
    });
}

const getLaptops = () => {
    $(".welcome").css("display", "none")
    $(".aside-name").html("Laptops")
    $(".div-aside-inputs").empty();
    $("#thead").empty();
    $("#tbody").empty();

    let inpC = getId("inpC")
    getId("lblC").title = ""
    inpC.disabled = false;
    inpC.checked = true;

    let asideInputs;
    let arrayLabels = ["Id", "brand", "model", "procesor", "os", "description", "memory", "hardDrive", "availability", "price", "quantity", "photography"]
    for(const label of arrayLabels){
        asideInputs = "<label class='aside-label'>"+label+"</label>"
        asideInputs += "<input type='text' id="+label+" class='aside-input'>"

        $(".div-aside-inputs").append(asideInputs)
    }
    
    $.ajax({
        url: "http://localhost/api/laptop/all",
        type:"GET",
        contentType:'json',
        success: function(datos){
            
            let thead = "<tr>";
            let tbody = "<tr>";
            
            thead+="<th>Id</th>";
            thead+="<th>brand</th>";
            thead+="<th>model</th>";
            thead+="<th>procesor</th>";
            thead+="<th>os</th>";
            thead+="<th>description</th>";
            thead+="<th>memory</th>";
            thead+="<th>hardDrive</th>";
            thead+="<th>availability</th>";
            thead+="<th>price</th>";
            thead+="<th>quantity</th>";
            thead+="<th>photography</th>";
            thead+="</tr>";
            for(const item of datos){
                tbody+="<td>"+item.id+"</td>";
                tbody+="<td>"+item.brand+"</td>";
                tbody+="<td>"+item.model+"</td>";
                tbody+="<td>"+item.procesor+"</td>";
                tbody+="<td>"+item.os+"</td>";
                tbody+="<td>"+item.description+"</td>";
                tbody+="<td>"+item.memory+"</td>";
                tbody+="<td>"+item.hardDrive+"</td>";
                tbody+="<td>"+item.availability+"</td>";
                tbody+="<td>"+item.price+"</td>";
                tbody+="<td>"+item.quantity+"</td>";
                tbody+="<td>"+item.photography+"</td>";
                tbody+="</tr>";
            }
            $("#thead").append(thead)
            $("#tbody").append(tbody)
            $("#table").css("box-shadow","0 5px 10px 3px #bebebe")
        }
    });
}

