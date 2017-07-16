$(document).ready(function(){

    var authUrl = 'http://auth.c100.hasura.me/';
    var dataUrl = 'http://data.c100.hasura.me/';

    $("#register_btn").click(function(){ 

    window.getCookie = function(name) 
    {
        match = document.cookie.match(new RegExp(name + '=([^;]+)'));
        if (match) return match[1];
    }
    var token=window.getCookie("auth_token");

        if((newUser!== "") && (npsw!== "") && (confirmnpsw!== "")){
        	if(npsw !== confirmnpsw) {alert('Confirm Password not matched')}
            $.ajax({
                url: authUrl + 'signup',
                method: 'POST',
                dataType: "json",
                contentType: "application/json",
                headers: {'Authorization' : 'Bearer ' + token},
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
    	} else{alert('Please fill all details');}
    });

    //login
    $("#login_btn").on("click",function(){

        $.ajax({
            url: authUrl + 'login',
            method: 'POST',
            dataType: "json",
            contentType: "application/json",
            headers: {'Authorization' : 'Bearer ' + token},
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

    $("#logout_btn").on("click",function(){
        $.ajax({
            method: 'POST',
            url: authUrl + 'logout',
            headers: {'Authorization': 'Bearer ' + token},
            done: function(e) {    
               console.log(e);
               alert("error");
            },
            fail:function(data){
                alert("logged-out");
                window.location = '/login_register.html';
            },
            dataType: "json",
            contentType: "application/json"
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