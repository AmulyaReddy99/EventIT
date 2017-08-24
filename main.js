// window.onload=function(){
// 	document.getElementById('login_btn').onclick=function() {
// 		alert('sent');
// 	};
// };



//login ...

	var button = document.getElementById('login_btn');
	button.onclick = function () {
	var request = new XMLHttpRequest();
		request.onreadystatechange = function(){
			if(request.readyState === XMLHttpRequest.DONE){
				if(request.status === 200){
					var name = request.responseText;
					name = JSON.parse(name);
					var me = document.getElementById('nm');
					me.innerHTML = name;
					res.sendFile('/index.html', {root});
				}
				else {
					alert('Invalid credentials. You might not be registered.');
				}
			}
		};
		var nameInput = document.getElementById('uname');
		var name = nameInput.value;
		//request.open('GET', '127.0.0.1:8000/submit-name?name=' + name, true);
		res.sendFile('/index.html', {root});

		request.open('POST','http://auth.c101.hasura.me/login',true);
		request.setRequestHeader('Content-Type','application/json');
		request.send(JSON.stringify({"username": newname, "password": password})); //password
	};

// register ...
var register = document.getElementById('register_btn');
register.onclick = function () {

	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){

		if(request.readyState === XMLHttpRequest.DONE){
			if(request.staus === 200){
				alert('Login to proceed');
				res.sendFile('/login_register.html', {root});
			}
			else {
				alert('Registration failed. Please try again');
			}
		}
	};
	var nameInput = document.getElementById('newname');
	var name = nameInput.value;
	request.open('GET', '127.0.0.1:8000/submit-name?name=' + name, true);
	res.sendFile('/index.html', {root});


	request.open('POST','http://auth.c101.hasura.me/signup',true);
	request.setRequestHeader('Content-Type','application/json');
	request.send(JSON.stringify({"username": newname, "password": password })); //password
};

// logout...
var logout = document.getElementById('logout_btn');
logout.onclick = function () {

	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){

		if(request.readyState === XMLHttpRequest.DONE){
			if(request.staus === 200){
				alert('Logged-out successfully');
				res.sendFile('/login_register.html', {root});
			}
			else {
				alert('Please try again. You are not logged-out.');
			}
		}
	};

	request.open('POST','http://auth.c101.hasura.me/logout',true);
	request.setRequestHeader('Content-Type','application/json');
	request.send(JSON.stringify({"username": newname, "password": password })); //password
};