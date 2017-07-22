$(document).ready(function(){

var authUrl = 'https://auth.delightful47.hasura-app.io/';
var dataUrl = 'https://data.delightful47.hasura-app.io/';

  $("#register_btn").click(function(){ 
    fname = $('#fname').val();
	lname = $('#lname').val();
	dob = $('#dob').val();
	email = $('#email').val();
	contact = $('#contact').val();
	newUser = $('#newUser').val();
	npsw = $('#npsw').val();
	confirmnpsw = $('#confirmnpsw').val();
    if((fname!== "") && (lname!== "") && (dob!== "") && (email!== "") && (contact!== "") && (newUser!== "") && (npsw!== "") && (confirmnpsw!== "") && (npsw === confirmnpsw)){
    	$.ajax({
            url: authUrl + 'signup',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({
                "username": $('#newUser').val(),
                "password": $('#npsw').val(),
            })

        }).done(function(){
            $('#validity').innerHTML= "Registered"; 
            $("#validity").fadeIn().delay(1000).fadeOut();
            setTimout(function () {
                window.location = '../index.html';
            }, 1100);
        }).fail(function(data){
            console.error(data);
            $('#validity').innerHTML= JSON.parse(data.responseText).message;
            $("#validity").fadeIn().delay(1000).fadeOut();
        });

        $.ajax({
            url: dataUrl + '/v1/query',
            method: 'POST',
            dataType: "json",
            contentType: "application/json",
            headers: {'Authorization' : 'Bearer ' + token},
            data: JSON.stringify({
                "type": "insert",
                "args": {
                  "table": "user",
                  "objects": [
                        {
                            'fname': "fname",
                            'lname': "lname",
                            'dob': "dob",
                            'uname': "newUser"
                        }
                    ]
                }
            })

        }).done(function(){
            alert('Saved your credentials! WELCOME');
        }).fail(function(data){
            alert('Unsaved');
        });
	}// if ends
    else{
        $('#validity').innerHTML= "Check if all fields are filled"; 
        $("#validity").fadeIn().delay(1000).fadeOut();
    }
  });

    //login
    $("#login_btn").on("click",function(){
        $.ajax({
            url: authUrl + 'login',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({
                "username": $('#uname').val(),
                "password": $('#psw').val()
            })
        }).done(function(data){
            token = data.auth_token;
            userId = data.hasura_id;

            window.location = '/index.html';
            var d = new Date();
            d.setTime(d.getTime() + (1*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = 'cookie_name' + "=" + token + ";" + expires + ";path=/"

        }).fail(function(data){
            console.error(data);
            alert("failed");
    });
});