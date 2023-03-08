
/* ----------------------- 운동시설 보여주기 함수 시작----------------------  */

function getGymPostMain() {
  var settings = {
    
    // "url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/gym/all",
    "url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/gym/all",
    "method": "GET",
    "timeout": 0,
  };


  $.ajax(settings).done(function (response) {
    console.log(response);
    let gymReponse = response
    
    count =0;
    for (let i = 0; i < gymReponse.length; i++) {
      let gymIid = gymReponse[i]['id']
      let title = gymReponse[i]['title']
      let content = gymReponse[i]['content']
      let gymName = gymReponse[i]['gymName']
      let location = gymReponse[i]['location']
      let time = gymReponse[i]['createdDate']
      let image = gymReponse[i]['image']
      let rating = gymReponse[i]['rating']
      var noimage= image.slice(-5)

      if(noimage==="이미지없음"){
        image = "https://nbcfinalproject.s3.ap-northeast-2.amazonaws.com/freeBoard/e8e0a530-a4c5-4c1b-b06d-5a64922c9ee3noImage.PNG"	
      }
      let temp_html = ""
      if (rating != 0) {
        temp_html = `                   
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                      <div class="property-item mb-30">
                        <a href="gym_show_post.html?${gymIid}" class="img">
                          <img src="${image}" alt="Image" class="img-fluid" />
                        </a>

                        <div class="property-content">
                          <div class="price mb-2"><span>"평점 : ${rating}점"</span></div>
                          <div>
                            <span class="city d-block mb-3">글 제목 : ${title}</span>


                          <div class="specs d-flex mb-4">
                            <span class="d-block d-flex align-items-center me-3"> 
                              <span class="caption">지역 : ${location}</span>
                            </span> 
                          </div>

                          <div class="specs d-flex mb-4"> 
                            <span class="d-block d-flex align-items-center"> 
                              <span class="caption">시설이름 : ${gymName}</span>
                            </span>
                          </div> 

                            <a
                              href="gym_show_post.html?${gymIid}"
                              class="btn btn-primary py-2 px-3"
                            >상세 내용</a
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  ` 
        count += 1
      }
      $('#gym_show_post_box').append(temp_html)
    }
    
    if (count ==0){
      temp_html = `                    
                    <div class="property-item mb-30">
                      <h><pre>현재 후기가 등록된 운동시설이 없어요 운동시설을
                      체험해보시고 자신이 경험한 곳이 순위에 올라가게 할수있어요!</pre></h>
                    </div> 
                ` 
     $('#gym_show_post_box').append(temp_html)
    }
  });
}

/* ----------------------- 운동시설 보여주기 함수 끝----------------------  */