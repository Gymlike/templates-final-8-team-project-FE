$(document).ready(function () {   
    localStorage.setItem('tablenumber', 1)
    localStorage.setItem('tbody_1',1)
    localStorage.setItem('tbody_2',1)
    localStorage.setItem('tbody_3',1)

  }) 

  
      //--------------------[테이블 열 삭제 함수 시작]-------------------------
  function deleteRow(delte){
    console.log(delte)
    var para = delte.split("_")
    console.log(para[0])
    
    console.log("para:",para)
    var item_id = localStorage.getItem(para[0]+"_"+para[1])          
    var vari = item_id         
    console.log(para[0] +"_"+ para[1] + "_row_"+vari)                              
    if(delte != para[0] +"_"+ para[1] + "_row_"+vari){                                 
      alert("마지막 열만 삭제할수있습니다.")               
      return
    }
    var next_id_sum = item_id*1-1
    var next_id = localStorage.setItem(para[0]+"_"+para[1], next_id_sum) 
    delte = "#"+delte 
    $('tr').remove(delte)   
  }


      //--------------------[테이블 열 삭제 함수 종료]-------------------------

      //--------------------[테이블 열 추가 함수 시작]-------------------------
  function rowInsert(in_row_id){  
    
    var datas ="tbody_"+in_row_id
    console.log(datas)
    var item_id = localStorage.getItem(datas)
    console.log(item_id)                              
    if(item_id*1 > 3){                                
      alert("4개이상의 열은 생성할수 없습니다.")        
      return                                          
    }                                                 
    var next_id_sum = item_id*1+1
    var next_id = localStorage.setItem(datas, next_id_sum)
    var temp_html=`
          <tr id = "${datas}_row_${next_id_sum}" value = ${next_id_sum} class="row-anim">
              <td ng-repeat="y in x track by $index" ng-dblclick="table.modifyData(rowID,$index)">
                <input id="${datas}_month_${next_id_sum}" placeholder="${next_id_sum}">개월</td>

              <td class="del-cell">
                <input id="${datas}_price_${next_id_sum}" placeholder="${next_id_sum}">원
                <button class="btn btn-danger" value = "${datas}_row_${next_id_sum}" onclick="deleteRow(this.value)">열 삭제<span
                    class="glyphicon glyphicon-remove-circle"></span></button></td>
            </tr>
    `
    datas = "#"+datas
    $(datas).append(temp_html)
  }
      //--------------------[테이블 열 추가 함수 종료]-------------------------
  
      //--------------------[테이블 삭제 함수 시작]-------------------------
  function droptable(delte){ 
    var item_id = localStorage.getItem('tablenumber')          
    var vari = item_id-1                                       
    if(delte != "table"+vari){                                 
      alert("맨 마지막 테이블만 삭제할수있습니다.")               
      return
    }
    var next_id_sum = item_id*1-1
    localStorage.setItem('tablenumber', next_id_sum) 
    var delrow = "tbody_"+ vari
    localStorage.setItem(delrow, 1) 
    delte = "#"+delte 
    $('div').remove(delte) 
  }

      //--------------------[테이블 생성 함수 종료]-------------------------

      //--------------------[테이블 생성 함수 시작]-------------------------
  function createtable() {
    var item_id = localStorage.getItem('tablenumber')
    if(item_id*1 > 3){
      alert("3개이상의 테이블은 생성할수 없습니다.")
      return
    }
    var next_id_sum = item_id*1+1
    var next_id = localStorage.setItem('tablenumber', next_id_sum) 
    let temp_html = 
    `<div class="container" id = "table${item_id}" style = "margin-bottom:9px;">
            <div class="row">
              <div class="col-md-12"> 
                <center>
                <input id="tablename${item_id}" placeholder="필라테스, 헬스장시설 등록비용 내용 변경가능" style = "width:80%; max-width:550px;margin-bottom:9px;">
                </center>
              </div>
            </div> 
            
            <div class="table-responsive table-anim" ng-repeat="table in TABLES">
              <table class="table table-striped table-bordered table-hover" >
                <tbody id ="tbody_${item_id}">
                  <tr class="info">
                    <th ng-repeat="x in table.schema">월</th>
                    <th>가격(원)</th>
                  </tr>
                  <tr id = "tbody_${item_id}_row_1" value = 1 class="row-anim">
                    <td ng-repeat="y in x track by $index" ng-dblclick="table.modifyData(rowID,$index)">
                      <input id="tbody_${item_id}_month_1" placeholder="1">개월</td>

                    <td class="del-cell">
                      <input id="tbody_${item_id}_price_1" placeholder="1">원
                      <button class="btn btn-danger" value = "tbody_${item_id}_row_1" onclick="deleteRow(this.value)">열 삭제<span
                          class="glyphicon glyphicon-remove-circle"></span></button></td>
                  </tr>
                </tbody>
              </table>
              <div class="col-xs-12">
                <div class="col-xs-6 text-left">
                  <button class="btn btn-success" onclick="rowInsert(${item_id})">열 추가</button>
                  <button class="btn btn-danger" value = "table${item_id}" onclick="droptable(this.value)">테이블 삭제</button>
                </div>
              </div> 
            </div>
          </div> 
    ` 
    $('#price_table').append(temp_html) 
  }


      //--------------------[테이블 생성 끝]-------------------------
  function gymwritepost() { 
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
    }
    var presigned = {
      // "url": "http://ec2-43-200-226-255.ap-northeast-2.compute.amazonaws.com/api/gym/presigned",
      "url": "http://ec2-43-200-226-255.ap-northeast-2.compute.amazonaws.com/api/gym/pre-signed",
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

    let dtoownerNumber = $('#uownerNumber').val();
    let dtoContent = $('#ucontent').val();
    let dtoTitle = $('#utitle').val();
    let dtoregion = $('#sample3_address').val()+ $('#sample3_detailAddress').val()+ $('#sample3_extraAddress').val();
    let dtogymName = $('#ugymName').val();
    let openTime= $("#uopentime").val()
    let amenities = "시설"; 
    //체크박스 값(value) 가져오기
    $("input[name=amenities]:checked").each(function() {
      amenities = amenities+"_" + $(this).val();
    });
    let amenitiesDetail = $("#uamenities").val()
    let price = ""

    var tablenumbers = localStorage.getItem('tablenumber') 
    for(var i=0; i<tablenumbers*1-1; i++){
      var table_count = "#tablename"+(i+1) 
      if(i ==0){
        price = price+$(table_count).val()
      }
      else {
        price = price+ "."+$(table_count).val()
      }
      // tbody_1_row_1 tbody_2_row_2 tbody_2_row_3
      var row_count = localStorage.getItem('tbody_'+(i+1)) 
      var row_table = 'tbody_'+(i+1) 
      for(var j =0; j<row_count*1; j++){
        var row_month = "#"+row_table +"_month_"+(j+1)
        var row_price = "#"+row_table +"_price_"+(j+1)
        price = price + "_"+$(row_month).val() + "_"+$(row_price).val()  
      }
    } 
    if(dtoownerNumber == null){
      alert("사업자 번호를 작성해야합니다.")
      return
    }
    if(dtoContent == null){
      alert("사업자 번호를 작성해야합니다.")
      return
    }
    if(dtoTitle == null){
      alert("사업자 번호를 작성해야합니다.")
      return
    }
    var settings = {
      // "url": "http://ec2-43-200-226-255.ap-northeast-2.compute.amazonaws.com/api/gym/owner/write_post",
      "url": "http://ec2-43-200-226-255.ap-northeast-2.compute.amazonaws.com/api/gym/owner/write-post",
      "method": "POST",
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
        "openTime": openTime,
        "amenities":amenities,
        "amenitiesDetail":amenitiesDetail,
        "price": price
      }),
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      alert(response);
      localStorage.removeItem('tablenumber') 
      localStorage.removeItem('tbody_1')
      localStorage.removeItem('tbody_2')
      localStorage.removeItem('tbody_3')
      window.location = "/index.html"
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

  // 우편번호 찾기 찾기 화면을 넣을 element 
  var element_wrap = document.getElementById('wrap');


  function foldDaumPostcode() {
    // iframe을 넣은 element를 안보이게 한다.
    element_wrap.style.display = 'none';
  }

  function sample3_execDaumPostcode() {
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