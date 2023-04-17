
window.addEventListener('beforeunload', function(event){
    //로그아웃
    function logout() {
        var settings = {
            "url": "http://localhost:8080/api/logout",
            "method": "DELETE",
            "timeout": 0,
            "headers": {
                "Authorization": localStorage.getItem('accessToken')
            },
        };
        $.ajax(settings).done(function (response, status, xhr) {
            console.log(response);
            console.log(status) 
            console.log(response.nickName);
            localStorage.clear('accessToken')
            $('#loginUser').hide();
            $('#mypage').hide();
            $('#MainLogout').hide();
            $('#MainLogin').show();
            $('#MainSignUp').show();
            $('#loginUser').clear(response.nickName + "님 환영합니다.");
        });
    } 
    // // 명세에 따라 preventDefault는 호출해야하며, 기본 동작을 방지합니다.
    // event.preventDefault();
    
    // // 대표적으로 Chrome에서는 returnValue 설정이 필요합니다.
    // event.returnValue = '';
});
