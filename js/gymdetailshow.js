

function getSelectGymPost() {
  var para = document.location.href.split("?");
  console.log(para[1])
  var settings = {
    // "url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/gym/" + para[1],
    "url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/gym/" + para[1],
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    let gymReponse = response
    let id = gymReponse['id']
    let title = gymReponse['title']
    let content = gymReponse['content']
    let gymName = gymReponse['gymName']
    let location = gymReponse['location']
    let time = gymReponse['createdDate']
    let price = gymReponse['price']
    let image = gymReponse['image']
    let opentime = gymReponse['openTime']
    let amenities = gymReponse['amenities']
    let amenitiesDetail = gymReponse['amenitiesDetail']
    let discountPrice = gymReponse['discountPrice']
    var noimage= image.slice(-5)

    if(noimage==="이미지없음"){
      image = "https://nbcfinalproject.s3.ap-northeast-2.amazonaws.com/freeBoard/e8e0a530-a4c5-4c1b-b06d-5a64922c9ee3noImage.PNG"	
    }
    $('#gym_title').text(gymName + " 시설 소개")
    let temp_html = `<div class="card">
                                <p class="save-date">작성시간 ${time}</p>
                                <div class="card-body" >
                                    <h2 style="float: left;"><img src="${image}" style="display: block; width:300px; hieght:300px;" >${title}</h2> 
                                    <div class="card-body" id="amenities_image"> 
                                    </div> 
                                </div> 
                                <hr size="3" width="100%" align="left" color="green"> 
                                <div id = "gym_content" style = "margin-left:10px;border:9px">
                                  <li>센터 소개</li>
                                  <pre class="card-text">${content}</pre>
                                </div>
                                <hr size="3" width="100%" align="left" color="green"> 
                                
                                <div class="card-body">
                                <ul>
                                  <li>
                                    <p>업체명</p>
                                    <p>${gymName}</p>
                                  </li>
                                  <hr size="3" width="100%" align="left" color="green">
                                  <li>
                                    <p>영업시간</p>
                                    <p>${opentime}</p>
                                  </li>
                                  <hr size="3" width="100%" align="left" color="green">
                                  <li>
                                    <p>편의시설 이용 정보</p>
                                    <pre>${amenitiesDetail}</pre>
                                  </li> 
                                  <hr size="3" width="100%" align="left" color="green">
                                  <li>
                                    <p>주소</p>
                                    <p>${location}</p>
                                  </li>
                                  <hr size="3" width="100%" align="left" color="green">
                                </ul>

                                </div> 
                            </div>`
    
    $('#./gymshowpost_box').append(temp_html) 
    
    let price1 = price.split("."); 
    let isFalse = true  
    for(let i =0; i<price1.length; i++){ 
      let price2 = price1[i].split("_");
      let temp_html_price = 
      `   
        <div class="memcw" style="margin-top:9px;">
          <div style="background-color:blue; width:50%; margin:0 auto; border-radius: 10px;"><h2 style="color:white; text-align: center;">${price2[0]}<h2></div>

          <div id="gym_price_${i}" style =" outline : solid; width:80%; margin:10px auto; border-radius: 10px; "> 
          </div>
        </div>  
      `
      
      $('#./gymshowpost_price').append(temp_html_price) 
    }
    
    var discountList =""
    
    console.log(discountList)
    for(let i =0; i<price1.length; i++){ 
        let price2 = price1[i].split("_"); 
        if(discountPrice != null){
          discountList = discountPrice.split("_")
          var discountList2 = discountList[i+1].split(".")
          const discount_date = new Date().getTime() 
          if(discountList2[2]*1>discount_date){
            for(let j=1; j<price2.length;j+= 2){
              if(discountList2[0]*1 == i+1){
                let avg_in = roundToTwo(price2[j+1]/price2[j])
                var total_price = price2[j+1]*(100 - discountList2[1]*1)/100
                var month_price = avg_in*(100 - discountList2[1]*1)/100
                let row_html_price=
                  `
                  <hr size="3" width="100%" align="left" color="green">
                  <div class="membox" style ="margin-left:5px;width:25%; float:left">
                    <span class="mc1">${price2[j]}개월</span>
                    </div>
                    
                  <div class="membox" style ="margin-left:5px;width:35%; float:left">
                    <span class="mc2" id="total_price_${i}"><strike>${price2[j+1]}</strike><em>￦(원)</em></span> 
                    <span class="mc3">월 ${total_price}<em>￦(원)(${discountList2[1]}%할인가)</em></span>
                  </div>
                  <div class="membox">
                    <span class="mc3" id="month_price_${i}">월 <strike>${avg_in}</strike><em>￦(원)</em></span>
                    <span class="mc3">월 ${month_price}<em>￦(원)(${discountList2[1]}%할인가)</em></span>
                  </div>
                  <hr size="3" width="100%" align="left" color="green">
                  `   
                let add_in = "#gym_price_"+i
                $(add_in).append(row_html_price)  
              }else{ 
  
              let row_html_price=
                `
                <hr size="3" width="100%" align="left" color="green">
                <div class="membox" style ="margin-left:5px;width:25%; float:left">
                  <span class="mc1">${price2[j]}개월</span>
                  </div>
                  
                <div class="membox" style ="margin-left:5px;width:35%; float:left">
                  <span class="mc2" id="total_price_${i}">${price2[j+1]}<em>￦(원)</em></span> 
                </div>
                <div class="membox">
                  <span class="mc3" id="month_price_${i}">월 ${avg_in}<em>￦(원)</em></span>
                </div>
                <hr size="3" width="100%" align="left" color="green">
                `   
              let add_in = "#gym_price_"+i
              $(add_in).append(row_html_price)  
              }
            }
          }else{
            for(let j=1; j<price2.length;j+= 2){
              let avg_in = roundToTwo(price2[j+1]/price2[j])
  
              let row_html_price=
                `
                <hr size="3" width="100%" align="left" color="green">
                <div class="membox" style ="margin-left:5px;width:25%; float:left">
                  <span class="mc1">${price2[j]}개월</span>
                  </div>
                  
                <div class="membox" style ="margin-left:5px;width:35%; float:left">
                  <span class="mc2" id="total_price_${i}">${price2[j+1]}<em>￦(원)</em></span> 
                </div>
                <div class="membox">
                  <span class="mc3" id="month_price_${i}">월 ${avg_in}<em>￦(원)</em></span>
                </div>
                <hr size="3" width="100%" align="left" color="green">
                `   
              let add_in = "#gym_price_"+i
              $(add_in).append(row_html_price)  
            } 
          }
        }else{
          for(let j=1; j<price2.length;j+= 2){
            let avg_in = roundToTwo(price2[j+1]/price2[j])

            let row_html_price=
              `
              <hr size="3" width="100%" align="left" color="green">
              <div class="membox" style ="margin-left:5px;width:25%; float:left">
                <span class="mc1">${price2[j]}개월</span>
                </div>
                
              <div class="membox" style ="margin-left:5px;width:35%; float:left">
                <span class="mc2" id="total_price_${i}">${price2[j+1]}<em>￦(원)</em></span> 
              </div>
              <div class="membox">
                <span class="mc3" id="month_price_${i}">월 ${avg_in}<em>￦(원)</em></span>
              </div>
              <hr size="3" width="100%" align="left" color="green">
              `   
            let add_in = "#gym_price_"+i
            $(add_in).append(row_html_price)  
          }
        }
    }
     
    var amenitiesList = amenities.split("_") 
    let point_html= ""
    for(var i=1; i<amenitiesList.length;i++){
      if(amenitiesList[i] == 1){
        point_html= point_html+`   
        <li style="float: left;" id = "img_1" ><img src="/images/icon_a.png" style="display: block" >수건</li>
        `
      }
      if(amenitiesList[i] == 2){
        point_html= point_html+`   
        <li style="float: left;" id = "img_2" ><img src="/images/icon_b.png" style="display: block" >주차장</li>
        `
      }
      if(amenitiesList[i] == 3){
        point_html= point_html+`   
        <li style="float: left;" id = "img_3" ><img src="/images/icon_c.png"  style="display: block" >WI_FI</li> 
        `
      }
      if(amenitiesList[i] == 4){
        point_html= point_html+`   
        <li style="float: left;" id = "img_4" ><img src="/images/icon_d.png"  style="display: block" >샤워시설</li>
        `
      }
      if(amenitiesList[i] == 5){
        point_html= point_html+`   
        <li style="float: left;" id = "img_5" ><img src="/images/icon_e.png"  style="display: block" >운동복</li>
        `
      }
      if(amenitiesList[i] == 6){
        point_html= point_html+`   
        <li style="float: left;" id = "img_6" ><img src="/images/icon_f.png"  style="display: block" >라커</li>
        `
      }
      if(amenitiesList[i] == 7){
        point_html= point_html+`   
        <li style="float: left;" id = "img_7" ><img src="/images/icon_g.png"  style="display: block" >이벤트</li>
        `
      }
      if(amenitiesList[i] == 8){
        point_html= point_html+`   
        <li  id = "img_8"><img src="/images/icon_h.png"  style="display: block" >인기업체</li> 
        `
      }
    } 
    $('#amenities_image').append(point_html)  

    // ----------------------------------[리뷰 불러오기]-----------------------------------------------------

    let ReviewList = response['postReview']

    for (let i = 0; i < ReviewList.length; i++) {
      var ReviewComment = ReviewList[i]['comment']
      var rating = ReviewList[i]['rating']
      // var createdDate =ReviewList[i]['creatDate']
      var ReviewId = ReviewList[i]['id']

      var gym_rating_Review = ""
      var gym_Review = ""
      switch (rating) {
        case 1:
          var gym_rating_Review =
            `           <div class="fw-bold">★☆☆☆☆</div>  `
          break;

        case 2:

          var gym_rating_Review =
            `         <div class="fw-bold">★★☆☆☆</div>  `
          break;

        case 3:
          var gym_rating_Review =
            `            <div class="fw-bold">★★★☆☆</div> `
          break;

        case 4:

          var gym_rating_Review =
            `                <div class="fw-bold">★★★★☆</div> `
          break;
        default:
          var gym_rating_Review =
            `
                  <div class="fw-bold">★★★★★</div>
                      `
      }
      var gym_Review =
        `  <div class="text-black-50">${ReviewComment}</div>  
            <button name="editReview" id ="editReview_${ReviewId}">수정</button>
            <button name="delReview" id ="delReview_${ReviewId}">삭제</button>
            
            
            <span style="display: none;" id="toggleReviewEdit_${ReviewId}">
              <textarea id="editReviewContent_${ReviewId}"></textarea> 
              <button name="saveReview" id="editReviewComment_${ReviewId}">댓글수정</button>
            </span> `


      $('#gymReview').append(gym_rating_Review)
      $('#gymReview').append(gym_Review)
    }

    // ----------------------------------[지도생성]-----------------------------------------------------


    // 지도를 생성합니다    
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(location, function (result, status) {

      // 정상적으로 검색이 완료됐으면 
      if (status === kakao.maps.services.Status.OK) {

        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${gymName}</div>`
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    });
  });



}
  // ----------------------------------[함수 끝]-----------------------------------------------------


var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
  mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 2 // 지도의 확대 레벨
  };


// ----------------------------------[해당버튼 클릭시 작성된 운동시설 삭제]-----------------------------------------------------
function deleteGymPost() {
  var para = document.location.href.split("?");
  console.log(para[1])
  var settings = {
    
    // "url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/gym/owner/" + para[1] +"/deletepost",
    "url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/gym/owner/" + para[1] +"/delete-post",
    "method": "DELETE",
    "timeout": 0,
    "headers": {
      "Authorization": localStorage.getItem('accessToken')
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    alert(response);
    window.location = "./gymallshowpost.html"
  }).fail(function (response){
    console.log(response.status);
    if(response.status === 404){
      alert("권한이 없습니다.");
    }else{
      alert("서버에 문제가 발생하였습니다.");
    }
  });
}
// ----------------------------------[함수 끝]-----------------------------------------------------
  
// ----------------------------------[해당버튼 클릭시 운동시설 수정]-----------------------------------------------------
function putGymPost() {
  
  var para = document.location.href.split("?");
   window.location = "/gymputdetailshowpost.html?"+para[1]
}
// ----------------------------------[함수 끝]-----------------------------------------------------

// ----------------------------------[해당버튼 클릭시 리뷰쓰기]-----------------------------------------------------


$('#gym_review_write').on("click", "button[name='enrollReview']", function () {
  if(doubleSubmitCheck()) return;
  var para = document.location.href.split("?");
  console.log(para[1])
  var review_star = document.getElementsByName('rating');
  console.log(review_star);
  var review_star_value = 5
  for (var i = 0; i < review_star.length; i++) {
    if (review_star[i].checked) {
      review_star_value = review_star[i].value;
      break;
    }
  }
  var settings = {
    
    // "url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/gymreview/" + para[1] + "/write",
    "url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/gymreview/" + para[1] + "/write",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Authorization": localStorage.getItem('accessToken'),
      "Content-Type": "application/json"
    },

    "data": JSON.stringify({
      "comment": $('#ReviewEnroll').val(),
      "rating": review_star_value
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    alert(response)
    window.location.reload()
  }).fail(function (response) {
    console.log(response.status);
    if (response.status === 403) {
      alert("로그인을해야 입력이 가능합니다.");
    } else if (response.status === 401) {
      alert("로그인을해야 입력이 가능합니다.");
    } else if (response.status === 404) {
      alert("로그인을해야 입력이 가능합니다.");
    } else if (response.status === 400) {
      alert("로그인을해야 입력이 가능합니다.");
    } else {
      alert("서버에 문제가 발생하였습니다.");
    }
  });
})
// ------------------------------------------------------------------------------------------------





// -----[해당 버튼 클릭시 리뷰삭제]-----------

$('#gymReview').on("click", "button[name='delReview']", function () {
  var para = document.location.href.split("?");
  var id_by_name = $(this).attr('id')

  console.log("reviewd" + id_by_name)
  var commentId = id_by_name.split("_")[1]
  console.log(commentId)
  var settings = {
    // para[1]+"/deletereview/"+commentId
    
    // "url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/gymreview/" + commentId + "/deletereview",
    "url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/gymreview/" + commentId + "/delete-review",
    "method": "DELETE",
    "timeout": 0,
    "headers": {
      "Authorization": localStorage.getItem('accessToken')
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    alert(response)
    window.location.reload();

  }).fail(function (response) {
    console.log(response.responseJSON);
    if (response.responseJSON.statusCode === 403) {
      alert(response.responseJSON.message)
    }
  });
})
// ------------------------------------------------



// -----[해당 버튼 클릭시 리뷰수정 창 나옴]-------------------

$('#gymReview').on("click", "button[name='editReview']", function () {

  var id_by_name = $(this).attr('id')
  console.log(id_by_name)
  var commentId = id_by_name.split("_")[1]
  console.log(commentId)

  $("#toggleReviewEdit_" + commentId).toggle();

})
// ---------------------------------------------------------



// -----[해당 버튼 클릭시 리뷰수정 요청]----------------------
$('#gymReview').on("click", "button[name='saveReview']", function () {


  var id_by_name = $(this).attr('id')

  var commentId = id_by_name.split("_")[1]
  console.log(commentId)
  var settings = {
    
    // "url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/gymreview/" + commentId + "/put-review",
    "url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/gymreview/" + commentId + "/put-review",
    "method": "PUT",
    "timeout": 0,
    "headers": {
      "Authorization": localStorage.getItem('accessToken'),
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "comment": $('#editReviewContent_' + commentId).val()
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    alert(response)
    window.location.reload();
  }).fail(function (response) {
    console.log(response.responseJSON);
    if (response.responseJSON.statusCode === 403) {
      alert(response.responseJSON.message)
      window.location.reload();
    }
    if (response.responseJSON.statusCode === 404) {
      alert("다른 유저의 댓글은 수정할 수 없습니다.")
      window.location.reload();
    }
  });
})

// ---------------------------------------------------------


var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
  mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 2 // 지도의 확대 레벨
  };
function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

function discountPrice(){
  var discount = localStorage.getItem('discountprice')
  if(discount*1 <1){
    var set_html = 
    `
    <div id="discount-div">
      <input type="text" style="width:100%" id="tablenumber" placeholder="할인할 테이블 번호(위에서 부터 1,2) 첫번째면 숫자 1 만 작성하시기 바랍니다.. 두번째면 2" />
      <br>
      <input type="text" style="width:100%"  id="discountposenteu" placeholder="할인이 퍼센트만 되며 20 입력시 20% 가됩니다.." />
      <br>
        <label>
              <p>
                  할인 종료날짜 <input type="date" name="date" id="discount_end" />
              </p>
          </label> 
      <button onclick="discountPriceUpdate()">할인적용</button>
    </div>
    `
    $('#discountPriceDiv').append(set_html)
    localStorage.setItem('discountprice', 1)
  }else{
    $('div').remove('#discount-div')   
    localStorage.setItem('discountprice', 0) 
  }
}

function discountPriceUpdate(){
  var para = document.location.href.split("?");
  console.log(para[1])
  const date_milliseconds = new Date($('#discount_end').val())
 
  var discount= "_" + $('#tablenumber').val() +
            "." +$('#discountposenteu').val()  +
            "." + date_milliseconds.getTime() 
  var settings = {
    
    // "url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/gymreview/" + commentId + "/put-review",
    "url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/gym/owner/"+para[1]+"/discount",
    "method": "PUT",
    "timeout": 0,
    "headers": {
      "Authorization": localStorage.getItem('accessToken'),
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "oneString": discount
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    alert(response)
    window.location.reload();
  }).fail(function (response) {
    console.log(response.responseJSON);
    if (response.responseJSON.statusCode === 403) {
      alert(response.responseJSON.message)
      window.location.reload();
    }
    if (response.responseJSON.statusCode === 404) {
      alert("권한이 없습니다.")
      window.location.reload();
    }
  });
}