$(document).ready(function(){

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
var event_id = getUrlVars()["event_id"];

var authUrl = 'http://auth.c100.hasura.me/';
var dataUrl = 'http://data.c100.hasura.me/';

var Body = function Body(data) {
    for (var i = data.length - 1; i >= 0; i--) {
        var DetailsOfEve = `<div class="row">
                            <div class="col-lg-12">
                                <h1 class="page-header">${data[i].event_name}
                                </h1>
                                <ol class="breadcrumb">
                                    <li><a href="index.html">Home</a>
                                    </li>
                                    <li class="active">${data[i].event_name}</li>
                                </ol>
                            </div>
                        </div><br>
                        <!-- /.row -->

                        <!-- Portfolio Item Row -->
                        <div class="row">

                            <div class="col-md-8">
                                <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                                    <!-- Indicators -->
                                    <ol class="carousel-indicators">
                                        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                                        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                                        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                                    </ol>

                                    <!-- Wrapper for slides -->
                                    <div id="img" class="carousel-inner">
                                        <div class="item active">
                                            <img class="img-responsive" src="http://placehold.it/750x500" alt="">
                                        </div>
                                        <div class="item">
                                            <img class="img-responsive" src="http://placehold.it/750x500" alt="">
                                        </div>
                                        <div class="item">
                                            <img class="img-responsive" src="http://placehold.it/750x500" alt="">
                                        </div>
                                    </div>

                                    <!-- Controls -->
                                    <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                                        <span class="glyphicon glyphicon-chevron-left"></span>
                                    </a>
                                    <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
                                        <span class="glyphicon glyphicon-chevron-right"></span>
                                    </a>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <h3>Event Description</h3>
                                <p>${data[i].details}</h3>
                                <ul>
                                    <li>${data[i].date}</li>
                                    <li>${data[i].time}</li>
                                    <li>${data[i].place}</li>
                                    <li>${data[i].fullprice}</li>
                                    <li>${data[i].email}</li>
                                    <li>${data[i].ph_of_org}</li>
                                </ul>    
                        `;

        $('#DetailsTemp').html(DetailsOfEve);

    $("#cmt").ready(function(){

        $.ajax({
            method: 'POST',
            url: dataUrl + 'v1/query',
            dataType: "json",
            contentType: "application/json",
            //headers: {'Authorization' : 'Bearer ' + token},
            data: JSON.stringify({
                "type": "select",
                "args": {
                    "table": "comments",
                    "columns": ["comment"], 
                    "where": {"event_id": event_id}//requested event_id
                }
            })
            }).done(function(data){
                for (var i = data.length - 1; i >= 0; i--) {
                    $('#allComments').append('<div>'+data[i].comment+'</div');
                }
            }).fail(function(e){
                console.log(e);
                alert("Failed to fetch data");
            });

        $('#booknow').click(function(){
            $('#booknow').html('Done');
            $.ajax({
                method: 'POST',
                url: dataUrl + 'v1/query',
                dataType: "json",
                contentType: "application/json",
                //headers: {'Authorization' : 'Bearer ' + token},
                data: JSON.stringify({
                    "type": "insert",
                    "args": {
                        "table": "ue_table",
                        "objects": [
                            {
                                'username': "Sreelatha79",
                                'event_id': event_id
                            }
                        ]
                    }
                })
            });
        });

        $("#comment").click(function(){
            if($('#comment').val() !== ""){
                $('#comment').keypress(function(event){
                var keycode = (event.keyCode ? event.keyCode : event.which);
                    if(keycode == '13'){
                        $('#allComments').prepend($('#comment').val()+'<br>');
                        $.ajax({
                            method: 'POST',
                            url: dataUrl + 'v1/query',
                            //headers: {'Authorization' : 'Bearer ' + token},
                            data: JSON.stringify({
                                "type": "insert",
                                "args": {
                                    "table": "comments",
                                    "objects": [
                                        {
                                            'comment': $('#comment').val(),
                                            'event_id': event_id
                                        }
                                    ]
                                }
                            }), 
                            dataType: "json",
                            contentType: "application/json"
                        });
                        $('#comment').val() = "";
                    }
                });
            }
        });
    });
    }
}

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
              "columns": ["event_name", "details", "time", "date", "place", "ph_of_org", "email", "fullprice", "id", "category"], 
              "where": {"id": event_id}//requested event
            }
        })
        }).done(function(data){
            console.log(data.length);
            if (data.length === 0){
                $('#category_hdng').html('<br><p><h1 align="center"><font color = #A9A9A9>No events found</h1></p>')
            }else{
                Body(data);
            }
        }).fail(function(e){
            console.log(e); 
    });
});