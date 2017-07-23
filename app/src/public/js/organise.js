$(document).ready(function(){

var dataUrl = 'https://data.delightful47.hasura-app.io/';

    window.getCookie = function(name) 
      {
        match = document.cookie.match(new RegExp(name + '=([^;]+)'));
        if (match) return match[1];
      }
    var token=window.getCookie("cookie_name");

  $("#upload_btn").click(function(){ 
    en = document.getElementById('event_name').value;
    dt = document.getElementById('date').value;
    tm = document.getElementById('time').value;
    place = document.getElementById('place').value;
    ph = document.getElementById('phno').value;
    email = document.getElementById('email_id').value;
    price = document.getElementById('price').value;
    catg = document.getElementById('category').value;
    wnum = document.getElementById('wk_number').value;
    wname = document.getElementById('wk_names').value;
    details = document.getElementById('description').value;
    //if((en!== "") && (dt!== "") && (tm!== "") && (place!== "") && (ph!== "") && (email!== "") && (price!== "") && (catg!== "") && (details!== "")){
        $.ajax({
            method: 'POST',
            url: dataUrl + 'v1/query',
            headers: {'Authorization' : 'Bearer ' + token},
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                "type": "insert",
                "args": {
                    "table": "events",
                    "objects": [
                        {
                            'event_name': en,
                            'date': dt,
                            //'time': tm,
                            'place': place,
                            'ph_of_org': ph,
                            'email': email,
                            'fullprice': price,
                            'category': catg,
                            'details': details,
                            'city_id': '5',
                            'image_link': 'www.somerandomimg.com'                            
                        }
                    ]
                }
            })
            }).done(function(data){
                document.getElementById('success').innerHTML= "Upload Successful"; 
                $("#success").fadeIn().delay(3000).fadeOut();
            }).fail(function(data){
                console.error(data);
                alert("failed");
            });	
	//}
    // else {
    //     document.getElementById('success').innerHTML= "Not uploaded. Check fields";
    //     $("#success").fadeIn().delay(3000).fadeOut();	
    // }
  });    

});
// inject them to profile and portfolio-item
