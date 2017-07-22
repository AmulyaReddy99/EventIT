$(document).ready(function(){

    var authUrl = 'http://auth.c100.hasura.me/';
    var dataUrl = 'http://data.c100.hasura.me/';

    $("#register_btn").click(function(){ 

        if(($('#newUser').val()!== "") && ($('#npsw').val()!== "") && $('#confirmnpsw').val() && ($('#npsw').val() === $('#confirmnpsw').val())){
            $.ajax({
                url: authUrl + 'signup',
                method: 'POST',
                dataType: "json",
                contentType: "application/json",
               // headers: {'Authorization' : 'Bearer ' + token},
                data: JSON.stringify({
                    "username": $('#newUser').val(),
                    "password": $('#npsw').val(),
                })

            }).done(function(){
                alert('done');
            }).fail(function(data){
                if(window.status === 409)
                {alert('Username clash');}
            });
    	} else{
            alert('Please fill all details properly');  
            window.location = '/login_register.html'
        }
    });

    //login
    $("#login_btn").on("click",function(){

        $.ajax({
            url: authUrl + 'login',
            method: 'POST',
            dataType: "json",
            contentType: "application/json",
            // headers: {'Authorization' : 'Bearer ' + token},
            data: JSON.stringify({
                "username": $('#uname').val(),
                "password": $('#psw').val()
            })
        }).done(function(data){
            token = data.auth_token;
            userId = data.hasura_id;
            var d = new Date();
            d.setTime(d.getTime() + (1*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = 'cookie_name' + "=" + token + ";" + expires + ";path=/"
            document.cookie = 'username' + "=" + $('#uname').val() + ";" + expires + ";path=/"
            console.log(token);
            console.log(userId);
            window.location = '/index.html';

        }).fail(function(data){
            console.error(data);
            alert("failed");
    });
});

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
                // window.getCookie.Clear();
                window.location = '/login_register.html';
        });
    });
});
// see below





// //login ...
// $(document).ready(function()
// {
// 	var button = ('login_btn');
// 	button.onclick = function () {
// 	var request = new XMLHttpRequest();
// 		request.onreadystatechange = function(){
// 			if(request.readyState === XMLHttpRequest.DONE){
// 				if(request.status === 200){
//                         alert("Success!");  //added
//                         // user_id = JSON.parse(this.responseText).hasura_id;
//                         // console.log(this.responseText);    // returns JSON object
//                         // console.log("user_id = "+user_id);  
//                         // document.cookie='user_id='+user_id;
//                         // document.cookie='user_name='+username;
//                         //console.log(document.cookie);
// 					var name = request.responseText;
// 					name = JSON.parse(name);
// 					var me = ('nm');
// 					me.innerHTML = name;
// 					res.sendFile('/index.html', {root});
// 				}
// 				else {
// 					alert('Invalid credentials. You might not be registered.');
// 				}
// 			}
// 		};
// 		var nameInput = ('uname');
// 		var name = nameInput.value;
// 		//request.open('GET', '127.0.0.1:8000/submit-name?name=' + name, true);
// 		res.sendFile('/index.html', {root});

// 		request.open('POST','http://auth.c101.hasura.me/login',true);
// 		request.setRequestHeader('Content-Type','application/json');
// 		request.withCredentials=true; //added
// 		request.send(JSON.stringify({"username": newname, "password": password})); //password
// 	};
// });
// // register ...
// $(document).ready(function()
// {
// 	var register = ('register_btn');
// 	register.onclick = function () {

// 		var request = new XMLHttpRequest();
// 		request.onreadystatechange = function(){

// 			if(request.readyState === XMLHttpRequest.DONE){
// 				if(request.staus === 200){
// 					alert('Login to proceed');
// 					res.sendFile('/login_register.html', {root});
// 				}
// 				else {
// 					alert('Registration failed. Please try again');
// 				}
// 			}
// 		};
// 		var nameInput = ('newname');
// 		var name = nameInput.value;
// 		request.open('GET', '127.0.0.1:8000/submit-name?name=' + name, true);
// 		res.sendFile('/index.html', {root});

// 		request.open('POST','http://auth.c101.hasura.me/signup',true);
// 		request.setRequestHeader('Content-Type','application/json');
// 		request.send(JSON.stringify({"username": newname, "password": password })); //password
// 	};
// });
// // logout...
// $(document).ready(function()
// {
// 	var logout = ('logout_btn');
// 	logout.onclick = function () {

// 		var request = new XMLHttpRequest();
// 		request.onreadystatechange = function(){

// 			if(request.readyState === XMLHttpRequest.DONE){
// 				if(request.staus === 200){
// 					alert('Logged-out successfully');
// 					res.sendFile('/login_register.html', {root});
// 				}
// 				else {
// 					alert('Please try again. You are not logged-out.');
// 				}
// 			}
// 		};

// 		request.open('POST','http://auth.c101.hasura.me/logout',true);
// 		request.setRequestHeader('Content-Type','application/json');
// 		request.send(JSON.stringify({"username": newname, "password": password })); //password
// 	};
// });