jQuery(document).ready(function ($) {
    getOwnerMe();
    "use strict";

});

document.querySelector('.img__btn').addEventListener('click', function () {
    document.querySelector('.cont').classList.toggle('s--signup');
});


// 회원가입
function signUp() {
    var settings = {
        "url": "http://localhost:8080/api/owner/signup",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "username": $('#username').val(),
            "password": $('#password').val(),
            // "password2": $('#password2').val(),
            "nickName": $('#nickName').val(),
            "phoneNumber": $('#phoneNumber').val(),
            "email": $('#email').val(),
            "storeName": $('#storeName').val(),
            "ownerNumber": $('#ownerNumber').val()
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        alert("회원가입 완료")
        document.querySelector('.cont').classList.toggle('s--signup');
    });
}


// 로그인
function logIn() {
    var settings = {
        "url": "http://localhost:8080/api/owner/login",
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
        window.location = 'index.html'
    }).fail(function (response) {
        console.log(response.responseJSON);
        if (response.responseJSON.statusCode === 400) {
            alert("ID와 비밀번호를 확인하여주세요.")
        } else {
            alert("ID와 비밀번호를 확인하여주세요.");
        }
    });
}

//로그아웃
function logout() {
    var settings = {
        "url": "http://localhost:8080/api/owner/logout",
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
function getOwnerMe() {
    var settings = {
        "url": "http://localhost:8080/api/owners",
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
        $('#MainLogout').show();
        $('#MainLogin').hide();
        $('#MainSignUp').hide();
        $('#adminpage').hide();
    });
}