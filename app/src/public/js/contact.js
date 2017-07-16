$(document).ready(function(){

var dataUrl = 'http://data.c101.hasura.me/';

    window.getCookie = function(name) 
      {
        match = document.cookie.match(new RegExp(name + '=([^;]+)'));
        if (match) return match[1];
      }
    var token=window.getCookie("auth_token");

  $("#submit_btn").click(function(){ 
    name = document.getElementById('name').value;
    phone = document.getElementById('phone').value;
    email = document.getElementById('email').value;
    message = document.getElementById('message').value;
    
    if((name!== "") && (phone!== "") && (email!== "") && (message!== "")){
        $.ajax({
            method: 'POST',
            url: dataUrl + 'v1/query',
            //headers: {'Authorization' : 'Bearer ' + token},
            data: JSON.stringify({
                "type": "insert",
                "args": {
                    "table": "messages",
                    "objects": [
                        {
                            'message': message,
                            'username': name 
                        }
                    ]
                }
            }), 
            dataType: "json",
            contentType: "application/json"
        });
    	document.getElementById('test').innerHTML= "Message sent by "+name+" sucesfully"; 
		$("#test").fadeIn().delay(3000).fadeOut();	
	}
    else {
        document.getElementById('test').innerHTML= "Not sent. Check fields";
        $("#test").fadeIn().delay(3000).fadeOut();	
    }
  });

// store message and details in database i.e. insert
// view for messages by a particular username 

 });