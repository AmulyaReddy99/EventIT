$(document).ready(function(){
    $("#logout_btn").on("click",function(){

    window.getCookie = function(name) 
    {
        match = document.cookie.match(new RegExp(name + '=([^;]+)'));
        if (match) return match[1];
    }
    var token=window.getCookie("cookie_name"); console.log(token);

        $.ajax({
            method: 'POST',
            url: authUrl + 'user/logout',
            headers: {'Authorization': 'Bearer ' + token}
            }).fail( function(e) {    
               console.log(e);
               alert("error");
            }).done(function(data){
                alert("logged-out");
                window.location = '/login_register.html';
        });
    });
});