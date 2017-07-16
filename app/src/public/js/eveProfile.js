$(document).ready(function(){

var authUrl = 'http://auth.c100.hasura.me/';
var dataUrl = 'http://data.c100.hasura.me/';

var eveProfile = function eveProfile(data){
    for (var i = data.length - 1; i >= 0; i--) {
        var eveProfile = `<div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a>${data[i].event_name}</a>
                    </h4>
                </div>
                <div>
                    <div class="panel-body">
                        <p>${data[i].details}</p>
                        <ul>
                            <li>${data[i].category}</li>
                            <li>${data[i].date}</li>
                            <li>${data[i].time}</li>
                            <li>${data[i].place}</li>
                        </ul>
                    </div>
                </div>
            </div>`;

        $("#eveProfile").prepend(eveProfile); 
    }
}

var Profile = function Profile(data1){
    for (var i = data1.length - 1; i >= 0; i--) {
        var id = data1[i].event_id;
        console.log(data1[i].event_id);
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
                  "columns": ["event_name", "details", "category", "time", "date", "place"], 
                  "where": {"id": id}//requested categ
                }
            })
            }).done(function(data){
                console.log(data.length);
                if (data.length === 0){
                    $('#category_hdng').html('<br><p><h1 align="center"><font color = #A9A9A9>No events found</h1></p>')
                }else{
                    eveProfile(data);
                }
            }).fail(function(e){
            console.log(e); 
        });  
    } 
}

$.ajax({
        method: 'POST',
        url: dataUrl + "v1/query",
        dataType: "json",
        contentType: "application/json",
        //headers: {'Authorization' : 'Bearer ' + token},
        data: JSON.stringify({
            "type": "select",
            "args": {
              "table": "ue_table",
              "columns": ["event_id"], 
              "where": {"username": "Sreelatha79"}//requested event
            }
        })
        }).done(function(data){
            console.log(data.length);
            Profile(data);          
        }).fail(function(e){
            console.log(e); 
    });
});