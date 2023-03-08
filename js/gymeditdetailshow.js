var para = document.location.href.split("?");
console.log(para[1])
function gymPutPost() { 
    var presignedUrlg = "이미지.jpa"
     
    //--------------------[프리사인url발급요청---]-------------------------
    var imageFileSize = document.getElementById("gym_File").files.length
    var imageFile
    var imageFileName
    if (imageFileSize === 0) {
      imageFile ="없음"
      imageFileName ="이미지없음"
    } else {
      imageFile = document.getElementById("gym_File").files[0]
      imageFileName =document.getElementById("gym_File").files[0].name
      var presigned = {
        // "url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/gym/presigned",
        "url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/gym/pre-signed",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": localStorage.getItem('accessToken'),
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "imageName": imageFileName
        }),
      };
      $.ajax(presigned).done(function (response) {
        presignedUrlg = response.toString() 
        //--------------------[프리사인url발급성공시 S3에 이미지 upload요청--]-------------------------
        var upload = {
          "url": presignedUrlg,
          "method": "PUT",
          "timeout": 0,
          "processData": false,
          "Content-Type": "binary/octet-stream",
          "data": imageFile
        };
  
        $.ajax(upload).done(function (response) {
          console.log(response);
        }).fail(function (response) {
          console.log(response.status);
          if(response.status === 404) {
            alert("로그인을해야 입력이 가능합니다.");
          } else {
            alert("서버에 문제가 발생하였습니다.");
          }
        });
      });
  
    } 

    let dtoownerNumber = $('#uownerNumber').val();
    let dtoContent = $('#ucontent').val();
    let dtoTitle = $('#utitle').val();  
    let dtoregion = $('#sample3_address').val()+ $('#sample3_detailAddress').val()+ $('#sample3_extraAddress').val();
    let dtogymName = $('#ugymName').val();
    console.log(dtogymName)
    let openTime= $("#uopentime").val()
    let amenities = "시설"; 

    //체크박스 값(value) 가져오기
    $("input[name=amenities]:checked").each(function() {
      amenities = amenities+"_" + $(this).val();
    });
    let amenitiesDetail = $("#uamenities").val()
    var settings = {
    "url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/gym/owner/" + para[1] +"/putpost",
    "method": "PUT",
    "timeout": 0,
    "headers": {
    "Authorization": localStorage.getItem('accessToken'),
    "Content-Type": "application/json"
    },
    "data": JSON.stringify({
        "title": dtoTitle,
        "contents": dtoContent,
        "ownerNumber": dtoownerNumber,
        "gymName": dtogymName,
        "region": dtoregion,
        "imageUrl":imageFileName,
        "openTime":openTime,
        "amenitiesDetail":amenitiesDetail
    }),
};

    $.ajax(settings).done(function (response) {
        console.log(response);
        alert(response);
        window.location = "./gymshowpost.html?"+para[1]
    }).fail(function (response) {
        console.log(response.status);
        if (response.status === 403) {
            alert("가격은 숫자만 입력가능합니다.");
        } else if (response.status === 401) {
            alert("모든 내용을 입력 해야합니다.");
        } else if (response.status === 404) {
            alert("로그인을해야 입력이 가능합니다.");
        } else {
            alert("서버에 문제가 발생하였습니다.");
        }

    });
}

var element_wrap = document.getElementById('wrap');


function foldDaumPostcode() {
    // iframe을 넣은 element를 안보이게 한다.
    element_wrap.style.display = 'none';
}

function sample5_execDaumPostcode() {
    // 현재 scroll 위치를 저장해놓는다.
    var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    new daum.Postcode({
        oncomplete: function (data) {
            // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if (data.userSelectedType === 'R') {
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample3_extraAddress").value = extraAddr;

            } else {
                document.getElementById("sample3_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample3_postcode').value = data.zonecode;
            document.getElementById("sample3_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample3_detailAddress").focus();

            // iframe을 넣은 element를 안보이게 한다.
            // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
            element_wrap.style.display = 'none';

            // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
            document.body.scrollTop = currentScroll;
        },
        // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
        onresize: function (size) {
            element_wrap.style.height = size.height + 'px';
        },
        width: '100%',
        height: '100%'
    }).embed(element_wrap);

    // iframe을 넣은 element를 보이게 한다.
    element_wrap.style.display = 'block';
}
document.getElementById("mypage").style.display = "none";
document.getElementById("MainLogout").style.display = "none";
document.getElementById("adminpage").style.display = "none";
if (localStorage.getItem('accessToken') === null) {
    $('#findbyIdandPw').show()
} else {
    $('#findbyIdandPw').hide()
}