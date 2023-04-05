window.addEventListener('beforeunload', function(event){
    //로그아웃
    function logout() {
        var settings = {
            "url": "http://localhost:8080/api/logout",
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
    //확인하고 싶다면 아래와 같이 두줄이나
  //event.preventDefault();만 넣어주면 됩니다. 모든 브라우저가 안될 수 도 있으니 두번째것을
  //넣어주는 것이 좋습니다.
    // 명세에 따라 preventDefault는 호출해야하며, 기본 동작을 방지합니다.
    //event.preventDefault();
    
    // 대표적으로 Chrome에서는 returnValue 설정이 필요합니다.
    //event.returnValue = '';
});
