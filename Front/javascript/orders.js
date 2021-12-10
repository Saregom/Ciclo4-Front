/* 
localhost:8080
144.22.242.102
*/
/* const setPerfil = () =>{
    let id = sessionStorage.getItem("idUser")
    GetDelAjax("http://localhost:8080/api/user/"+id).done(function(datos){
        
    })
} */

const setOrderProducts = () =>{
    GetDelAjax("http://localhost:8080/api/laptop/all", "GET").done(function(datos){
        $(".products").empty()
        if(datos.length == 0){
            $(".alert").css("display", "block")
        }else{
            for(i=0;i<datos.length;i++){
                let table = "<div class='col-auto col-orders'>"
                table += "<table class='table-ord-pro'>"
                table += "<tbody class='tbody-ord-pro'>"
                for(const item in datos[i]){
                    if(item == "quantity" || item == "photography"){
                        continue
                    }
                    table+="<tr class='tr-ord-pro'><th class='th-ord-pro'>"+item+":</th>";
                    table+="<td class='td-ord-pro'>"+datos[i][item]+"</td></tr>";
                }
                table += "</tbody></table></div>"
                $(".products").append(table)
            }
        }
    })
}