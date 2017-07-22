$(document).ready(function(){
    var dataUrl = 'http://data.c100.hasura.me/';
    $("#id03").click(function(){ 
        $.ajax({
            url: dataUrl + 'v1/query',
            method: 'POST',
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                "type": "insert",
                "args": {
                    "table": "user",
                    "objects": [
                        {
                            "fname": $('#fname').val(),
                            "lname": $('#lname').val(), 
                            "dob": $('#dob').val(),
                            "phno": $('#contact').val(),
                            "email": $('#email').val(),
                            "uname": $('#reuname').val()
                        }
                    ]

                }
            }) 
        });
        alert('Login to proceed...');
        window.location = '/login_register.html';
    });
});