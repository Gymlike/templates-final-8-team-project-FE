$('form').submit(function(e) {
    e.preventDefault();

var settings = {
"url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/validate",
"method": "POST",
"timeout": 0,
"headers": {
"Content-Type": "application/json"
},
"data": JSON.stringify({
"b_no": $('#b_no').val(),
"start_dt": $('#start_dt').val(),
"b_nm": $('#b_nm').val(),
"p_nm": $('#p_nm').val(),
}),
};

$.ajax(settings).done(function(response) {
console.log(response);
if (response === "01") {
localStorage.setItem('validate', 1)
localStorage.setItem('b_no', $('#b_no').val());
localStorage.setItem('start_dt', $('#start_dt').val());
localStorage.setItem('b_nm', $('#b_nm').val());
localStorage.setItem('p_nm', $('#p_nm').val());
alert("사업자번호 인증 성공");
window.close()

} else {
localStorage.setItem('validate', 0)
localStorage.removeItem('b_no', $('#b_no').val());
localStorage.removeItem('start_dt', $('#start_dt').val());
localStorage.removeItem('b_nm', $('#b_nm').val());
localStorage.removeItem('p_nm', $('#p_nm').val());
  alert("사업자번호 인증에 실패하였습니다. 확인 후 다시 시도해주세요.");
}
}).fail(function(jqXHR, textStatus, errorThrown) {
alert("오류 발생: " + textStatus);
});
})