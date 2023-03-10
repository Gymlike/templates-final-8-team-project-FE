function regenerateToken() {
    var accessToken = localStorage.getItem("accessToken")
    var settings = {
        "url": "http://localhost:8080/api/user/token/regenerate",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "accessToken": accessToken
        }),
      };
    console.log("accessToken : ", refreshToken)
    $.ajax(settings).done(function (response, xhr) {
        console.log(response);
		localStorage.setItem('accessToken', xhr.getResponseHeader('Authorization')) 
    }).fail(function (response){
        console.log("response : ", response)
        alert("로그인을해야 입력이 가능합니다."); 
        localStorage.removeItem("accessToken") 
    }); 
}
