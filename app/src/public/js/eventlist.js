$(document).ready(function(){

var authUrl = 'https://auth.delightful47.hasura-app.io/';
var dataUrl = 'https://data.delightful47.hasura-app.io/';

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var category = getUrlVars()["category"];

var SortByCategory = function SortByCategory(data) {
    for (var i = data.length - 1; i >= 0; i--) {
        var evetemplate = `<div class="row">
                            <div class="col-md-7">
                                <a href="portfolio-item.html?event_id=${data[i].id}">
                                    <img class="img-responsive img-hover" src="http://placehold.it/700x300" alt="">
                                </a>
                            </div>
                            <div class="col-md-5">
                                <h3>${data[i].event_name}</h3>
                                <h4>Subheading</h4>
                                <p>${data[i].details}</p>
                                <a class="btn btn-primary" href="portfolio-item.html?event_id=${data[i].id}">View Project</i></a>
                            </div>
                        </div><br>`;
                        console.log(data[i].id);
                        console.log(data[i].event_name);
                        // export data[i].id to other page

        $('#eveTemp').append(evetemplate);
    }
}
//var categoryName = //fetch category
    // create views to categories
        $.ajax({
        method: 'POST',
        url: dataUrl + "v1/query",
        dataType: "json",
        contentType: "application/json",
        //headers: {'Authorization' : 'Bearer ' + token},
        data: JSON.stringify({
            "type": "select",
            "args": {
              "table": "events",
              "columns": ["event_name", "details", "category", "id"], 
              "where": {"category": category}//requested categ
            }
        })
        }).done(function(data){
            console.log(data);
            document.getElementById("categ").innerHTML= data[0].category;

            if (data.length == 0){
                $('#category_hdng').html('<p><h1 align="center"><font color = #A9A9A9>No events found</h1></p>')
            }else{
                SortByCategory(data);
            }
        }).fail(function(e){
            console.log(e); 
    });
});