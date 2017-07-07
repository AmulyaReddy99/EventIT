// window.onload=function(){
// 	document.getElementById('login_btn').onclick=function() {
// 		alert('sent');
// 	};
// };

// //buttons...
//login - login_btn ; register - register_btn ; logout - logout_btn

$(document).ready(function(){
  $("#register_btn").click(function(){ 
    fname = document.getElementById('fname').value;
	lname = document.getElementById('lname').value;
	dob = document.getElementById('dob').value;
	email = document.getElementById('email').value;
	contact = document.getElementById('contact').value;
	newUser = document.getElementById('newUser').value;
	npsw = document.getElementById('npsw').value;
	confirmnpsw = document.getElementById('confirmnpsw').value;
    if((fname!== "") && (lname!== "") && (dob!== "") && (email!== "") && (contact!== "") && (newUser!== "") && (npsw!== "") && (confirmnpsw!== "") && (npsw === confirmnpsw)){
    	document.getElementById('validity').innerHTML= "Registered"; 
		$("#validity").fadeIn().delay(1500).fadeOut();
		setTimout(function () {
        // send file
            window.location = '../index.html';
        }, 1600);
	}
    else {
        document.getElementById('validity').innerHTML= "Not registered. Check fields";
        $("#validity").fadeIn().delay(1500).fadeOut();	
    }
  });
  $("#login_btn").click(function(){ 
    uname = document.getElementById('uname').value;
    psw = document.getElementById('psw').value;
    if((uname!== "") && (psw!== "")){
    	document.getElementById('check_credentials').innerHTML= "Logged-in"; 
		$("#check_credentials").fadeIn().delay(1500).fadeOut();	
		setTimeout(function () {
        // send file
            window.location = '../index.html';
        }, 1600);
	}
    else {
        document.getElementById('check_credentials').innerHTML= "Not logged-in. Check fields";
        $("#check_credentials").fadeIn().delay(1500).fadeOut();	
    }
    //document.getElementById('nm').innerHTML = uname;
  });
});
// see below





// //login ...
// $(document).ready(function()
// {
// 	var button = document.getElementById('login_btn');
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
// 					var me = document.getElementById('nm');
// 					me.innerHTML = name;
// 					res.sendFile('/index.html', {root});
// 				}
// 				else {
// 					alert('Invalid credentials. You might not be registered.');
// 				}
// 			}
// 		};
// 		var nameInput = document.getElementById('uname');
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
// 	var register = document.getElementById('register_btn');
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
// 		var nameInput = document.getElementById('newname');
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
// 	var logout = document.getElementById('logout_btn');
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