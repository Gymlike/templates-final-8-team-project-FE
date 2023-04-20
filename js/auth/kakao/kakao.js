jQuery(document).ready(function ($) {
    getKakaoMe();
    "use strict";

});

document.querySelector('.img__btn').addEventListener('click', function () {
    document.querySelector('.cont').classList.toggle('s--signup');
});

// 상단 프로필
function getKakaoMe() {
    var settings = {
        "url": "http://ec2-43-200-226-255.ap-northeast-2.compute.amazonaws.com/api/profile/kakao",
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