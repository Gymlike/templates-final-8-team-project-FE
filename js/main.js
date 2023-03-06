jQuery(document).ready(function($) {  
	getUserMe();
	"use strict"; 

});

function getUserMe(){
	var settings = {
		"url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/profile",
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