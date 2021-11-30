const getUsers2 = () => {
    $.ajax({
        url: "http://localhost/api/user/all",
        type:"GET",
        contentType:'json',
        success: function(datos){
            /* let tbodyUser = $("#tbodyUser")
            let theadUser = $("#theadUser") */
            let theadUser = "<tr>";
            let tbodyUser = "<tr>";
            
            /* theadUser+="<tr>"; */
            theadUser+="<th>Id</th>";
            theadUser+="<th>Name</th>";
            theadUser+="<th>Identification</th>";
            theadUser+="<th>Email</th>";
            theadUser+="<th>Password</th>";
            theadUser+="<th>Address</th>";
            theadUser+="<th>CellPhone</th>";
            theadUser+="<th>Zone</th>";
            theadUser+="<th>Type</th>";
            theadUser+="</tr>";
            for(const item of datos){
                /* tbodyUser+="<tr>"; */
                tbodyUser+="<td>"+item.id+"</td>";
                tbodyUser+="<td>"+item.name+"</td>";
                tbodyUser+="<td>"+item.identification+"</td>";
                tbodyUser+="<td>"+item.email+"</td>";
                tbodyUser+="<td>"+item.password+"</td>";
                tbodyUser+="<td>"+item.address+"</td>";
                tbodyUser+="<td>"+item.cellPhone+"</td>";
                tbodyUser+="<td>"+item.zone+"</td>";
                tbodyUser+="<td>"+item.type+"</td>";
                tbodyUser+="</tr>";
            }
            $("#theadUser").append(theadUser)
            $("#tbodyUser").append(tbodyUser)
        }
    });
}