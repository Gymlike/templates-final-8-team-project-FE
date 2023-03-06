jQuery(document).ready(function($) {  
	getUserMe();
	"use strict"; 
});

document.querySelector('.img__btn').addEventListener('click', function () {
document.querySelector('.cont').classList.toggle('s--signup');
});

// 회원가입
function signUp() {
	const username = $('#username').val();
	if(!username) {
		return alert("ID를 입력하세요.")
	}
	const password = $('#password').val();
	if(!password) {
		return alert("비밀번호를 입력하세요.")
	}	
	const password2 = $('#password2').val();
	if(!password2) {
		return alert("비밀번호를 확인하세요.")
	}	
	const nickName = $('#nickName').val();
	if(!nickName) {
		return alert("닉네임을 입력하세요.")
	}
	const phoneNumber = $('#phoneNumber').val();
	if(!phoneNumber) {
		return alert("휴대폰번호를 입력하세요.")
	}
	const email = $('#email').val();
	if(!email) {
		return alert("이메일을 입력하세요.")
	}

	if(localStorage.getItem('verifyEmailCode') == 1) {
	var settings = {
		"url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/user/signup",
		"method": "POST",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({
			"username": $('#username').val(),
			"password": $('#password').val(),
			"password2": $('#password2').val(),
			"nickName": $('#nickName').val(),
			"phoneNumber": $('#phoneNumber').val(),
			"email": $('#email').val(),
			"verifyEmail": $("#verifyEmail").val
	}),
	}
	$.ajax(settings).done(function (response) {
		console.log(response);
		alert("회원가입 완료")
		localStorage.removeItem('verifyEmailCode')
		document.querySelector('.cont').classList.toggle('s--signup')
		location.reload();
	}).fail(function (response) {
		console.log(response.responseJSON);
		if (response.responseJSON.statusCode === 409) {
			alert("중복된 ID입니다.")
		} if (response.responseJSON.statusCode === 408) {
			alert("중복된 닉네임입니다.")
		} if (response.responseJSON.statusCode === 407) {
			alert("중복된 이메일입니다.")
		} if (response.responseJSON.statusCode === 406) {
			alert("중복된 휴대폰번호입니다.")
		}
	})} else {
		alert("이메일 인증 후 다시 시도해주세요.")
	}}

// 로그인
function logIn() {
	var settings = {
		"url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/user/login",
		"method": "POST",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({
			"username": $('#logInID').val(),
			"password": $('#logInpassword').val()
		}),
	};

	$.ajax(settings).done(function (response, status, xhr) {
		console.log(response);
		console.log(xhr.getResponseHeader('Authorization'))
		localStorage.setItem('accessToken', xhr.getResponseHeader('Authorization'))
		alert("로그인 완료")
		history.back()
	}).fail(function (response) {
		console.log(response.responseJSON);
		if (response.responseJSON.statusCode === 404) {
			alert("ID와 비밀번호를 확인하여주세요.")
		} else {
			alert("서버에 문제가 발생하였습니다.");
		}
	});
}

//로그아웃
function logout() {
	var settings = {
		"url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/user/logout",
		"method": "DELETE",
		"timeout": 0,
		"headers": {
		  "Authorization": localStorage.clear('accessToken')
		},
	  };
	  
	  $.ajax(settings).done(function (response, status, xhr) {
		console.log(response);
		console.log(status)
		if (status === 403) {
			window.location = "/index.html"
		}
		console.log(response.nickName);
		$('#loginUser').hide();
		$('#mypage').hide();
		$('#MainLogout').hide();
		$('#MainLogin').show();
		$('#MainSignUp').show();
		$('#loginUser').clear(response.nickName + "님 환영합니다.");
	  });
}

// 상단 프로필
function getUserMe() {
	var settings = {
		"url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/profile",
		"method": "GET",
		"timeout": 0,
		"headers": {
		  "Authorization": localStorage.getItem('accessToken')
		},
	  };
	  
	  $.ajax(settings).done(function (response, status, xhr) {
		console.log(response);
		console.log(status)
		if (status === 403) {
			window.location.href
		}
		console.log(response.nickName);
		$('#loginUser').show();
		$('#loginUser').append(response.nickName + "님 환영합니다.");
		$('#mypage').show();
		$('#ownermypage').hide();
		$('#MainLogout').show();
		$('#MainLogin').hide();
		$('#MainSignUp').hide();
		$('#adminpage').hide();
	  });
}

//이메일 보내기
function sendEmail() {
var settings = {
	"url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/user/email?email=" + $('#email').val(),
	"method": "POST",
	"timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
	console.log(response);
	alert("이메일이 발송되었습니다.")
	$('#verifyEmail').show();
	$('#verifyEmail2').show();
	$('#sendEmail2').hide();
	$('#sendEmail3').show();
  }).fail (function (response) {
	console.log(response.responseJSON);
	if (response.responseJSON.status === 404) {
		alert("중복된 이메일입니다. 다른 이메일을 사용하여주세요.")
	}
	if (response.responseJSON.statusCode === 400) {
		alert("잘못된 이메일형식입니다. 다시 한번 확인해주세요.")
	}
})}

//이메일 코드 인증
function verifymail() {
	var settings = {
		"url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/user/verifyCode?code=" + $('#EmailCode').val(),
		"method": "POST",
		"timeout": 0,
	  };
	  
	  $.ajax(settings).done(function (response) {
		if(response == 1) {
			localStorage.setItem('verifyEmailCode', 1)
			alert("이메일 인증에 성공하였습니다.")
			$('#emailOk').show();
			$('#verifyEmail').hide();
			$('#verifyEmail2').hide();
			$('#sendEmail3').hide();
			email.readOnly = true;
		} else {
			localStorage.setItem('verifyEmailCode', 0)
			console.log(response);
			alert("전송된 코드를 다시 한번 확인해주세요.")
		}
	  });
	}

function ownersignup() {
	window.location = "/ownerlogin.html"
}