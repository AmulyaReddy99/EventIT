$(document).ready(function(){

var authUrl = 'https://auth.delightful47.hasura-app.io/';
var dataUrl = 'https://data.delightful47.hasura-app.io/';

    window.getCookie = function(name) 
    {
        match = document.cookie.match(new RegExp(name + '=([^;]+)'));
        if (match) return match[1];
    }
    var token=window.getCookie("cookie_name"); console.log(token);
    var username=window.getCookie("username"); console.log(username);


    $.ajax({
        method: 'POST',
        url: dataUrl + "v1/query",
        dataType: "json",
        contentType: "application/json",
        //headers: {'Authorization' : 'Bearer ' + token},
        data: JSON.stringify({ 
            "type": "select",
                "args": {
                    "table": "user",
                    "columns": ["uname", "fname", "lname", "dob", "phno", "email"],
                    "where": {"uname": username}
                }
            })// json obj and args are closed
        }).done(function(data){
        	console.log(data.length);
            $('#uName').html(username);
            $('#Name').html(data[0].fname +" "+ data[0].lname);
            $('#d0b').html('DOB: '+ data[0].dob);
            $('#eMail').html('<a  href="mailto:'+ data[0].email+'"> '+data[0].email+'</a>');
            $('#phNo').html(data[0].phno);
        }).fail(function(e){
            console.log(e);
    });


    $("#collapseChat").click(function(){ 
    	$('#template').html('');

        $.ajax({
            method: 'POST',
            url: dataUrl + "v1/query",
            dataType: "json",
            contentType: "application/json",
            headers: {'Authorization' : 'Bearer ' + token},
            data: JSON.stringify({ 
                "type": "select",
                    "args": {
                        "table": "messages",
                        "columns": ["message", "timestamp"],
                        "where": {"username": username}
                    }
                })// json obj and args are closed
            }).done(function(data){
            	if (data.length == 0){
                    $('#template').html('<p><h1 align="center"><font color = #A9A9A9>No messages yet</h1></p>')
                }
            	else{$('#no_msg').html('<hr>Total --> '+data.length+' messages');
                for (var i = data.length - 1; i >= 0; i--) {
                    $('#template').append('<p>'+data[i].message+'</p><p>'+data[i].timestamp+'</p><hr>');
                }}
                //$('#title').innerHTML = "All Messages ("+JSON.stringify(data.length)+")";
            }).fail(function(e){
                console.log(e);
        });
    });
// --------------------Change profile----------------------------------------------------


    $("#done").click(function(){ 
        ne = $('#newEmail').val();
        nc = $('#newContact').val();

        $.ajax({
            method: 'POST',
            url: dataUrl + "v1/query",
            dataType: "json",
            contentType: "application/json",
            headers: {'Authorization' : 'Bearer ' + token},
            data: JSON.stringify({
                "type": "update",
                "args": {
                    "table": "user",
                    "$set": {
                        "email": ne,
                        "phno": nc,
                    },
                    "where": {"uname": username}
                }
                })// json obj and args are closed
            }).done(function(data){
                document.getElementById('eMail').innerHTML= ne; 
                document.getElementById('phNo').innerHTML= nc; 

                //$('#title').innerHTML = "All Messages ("+JSON.stringify(data.length)+")";
            }).fail(function(e){
                console.log(e);
        });
       // modal.style.display = "none";
    });










});