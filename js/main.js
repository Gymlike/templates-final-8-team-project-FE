jQuery(document).ready(function($) {  
	getUserMe();
	"use strict"; 

});

function getUserMe(){
	var settings = {
		"url": "http://localhost:8080/api/profile",
		"method": "GET",
		"timeout": 0,
		"headers": {
		  "Authorization": localStorage.getItem("accessToken")
		},
	  };
	  
	  $.ajax(settings).done(function (response) { 
		console.log(response);
		console.log(response.nickName);
		
		$('#loginUser').append(response.nickName + "님 반갑습니다.");
	  });
}