
      /* ----------------------- 운동시설 보여주기 함수 시작----------------------  */
  
      function getGymPost(){ 
        var settings = {
          "url": "http://localhost:8080/api/gym",
          "method": "GET",
          "timeout": 0, 
        }; 
 
        
        $.ajax(settings).done(function (response) { 
          console.log(response);
          let gymReponse = response
          for (let i = 0; i < gymReponse.length; i++) {
              let gymIid = gymReponse[i]['id']
              let title = gymReponse[i]['title']
              let content = gymReponse[i]['content']
              let gymName = gymReponse[i]['gymName']
              let location = gymReponse[i]['location']
              let time = gymReponse[i]['createdDate']
              let image = gymReponse[i]['image'] 
              let rating = gymReponse[i]['rating']
              let temp_html="";
              switch(rating){
                  case 0: 
                  temp_html = `
                                
                                <div class="property-item">
                                    <a href="gym_show_post.html?${gymIid}" class="img">
                                      <img src="${image}" alt="Image" class="img-fluid" />
                                    </a>

                                    <div class="property-content">
                                      <div class="price mb-2"><span>"리뷰가 없어요 최초로 작성해보세요"</span></div>
                                      <div> 
                                        <span class="city d-block mb-3">글 제목 : ${title}</span>

                                        <div class="specs d-flex mb-4">
                                          <span class="d-block d-flex align-items-center me-3"> 
                                            <span class="caption">지역 : ${location}</span>
                                          </span>
                                          <span class="d-block d-flex align-items-center"> 
                                            <span class="caption">시설이름 : ${gymName}</span>
                                          </span>
                                        </div>

                                        <a
                                          href="gym_show_post.html?${gymIid}"
                                          class="btn btn-primary py-2 px-3"
                                          >See details</a
                                        >
                                      </div>
                                    </div>
                                    </div> 
                                `
                    break;
                  default: 

                  temp_html = `
                                
                                <div class="property-item">
                                    <a href="gym_show_post.html?${gymIid}" class="img">
                                      <img src="${image}" alt="Image" class="img-fluid" />
                                    </a>

                                    <div class="property-content">
                                      <div class="price mb-2"><span>"${rating}"</span></div>
                                      <div> 
                                        <span class="city d-block mb-3">글 제목 : ${title}</span>

                                        <div class="specs d-flex mb-4">
                                          <span class="d-block d-flex align-items-center me-3"> 
                                            <span class="caption">지역 : ${location}</span>
                                          </span>
                                          <span class="d-block d-flex align-items-center"> 
                                            <span class="caption">시설이름 : ${gymName}</span>
                                          </span>
                                        </div>

                                        <a
                                          href="gym_show_post.html?${gymIid}"
                                          class="btn btn-primary py-2 px-3"
                                          >See details</a
                                        >
                                      </div>
                                    </div>
                                    </div> 
                                `

              }
              $('#gym_show_post_box').append(temp_html) 
          } 
        });
    }
    
      /* ----------------------- 운동시설 보여주기 함수 끝----------------------  */