
      /* ----------------------- 운동시설 보여주기 함수 시작----------------------  */
  
      function getGymPost(){ 
        var settings = {
          
          // "url": "http://ec2-3-36-89-51.ap-northeast-2.compute.amazonaws.com/api/gym",
          "url": "http://localhost:8080/api/gym",
          "method": "GET",
          "timeout": 0, 
        }; 
 
        
        $.ajax(settings).done(function (response) { 
          console.log(response);
          let gymReponse = response.data
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
              var noimage= image.slice(-5)

              if(noimage==="이미지없음"){
                image = "https://nbcfinalproject.s3.ap-northeast-2.amazonaws.com/freeBoard/e8e0a530-a4c5-4c1b-b06d-5a64922c9ee3noImage.PNG"	
              }
              switch(rating){
                  case 0: 
                  temp_html = ` 
                  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">

                                <div class="property-item  mb-30">
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
                                        </div>

                                        <div class="specs d-flex mb-4"> 
                                          <span class="d-block d-flex align-items-center"> 
                                            <span class="caption">시설이름 : ${gymName}</span>
                                          </span>
                                        </div> 
                                        
                                        <a   href="gym_show_post.html?${gymIid}"
                                          class="btn btn-primary py-2 px-3"
                                          >상세 내용</a>
                                      </div>
                                    </div>
                                </div> 
                            </div>
                        `
                    break;
                  default: 

                  temp_html = `
                  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                                <div class="property-item mb-30">
                                    <a href="gym_show_post.html?${gymIid}" class="img">
                                      <img src="${image}" alt="Image" class="img-fluid" />
                                    </a>

                                    <div class="property-content">
                                      <div class="price mb-2"><span> [평점   ${rating}]</span></div>
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
                                        <a   href="gym_show_post.html?${gymIid}"
                                          class="btn btn-primary py-2 px-3"
                                          >상세 내용</a>
                                      </div>
                                    </div>
                                </div> 
                            </div>
                        `
              }
              $('#gym_show_all_post_box').append(temp_html) 
          } 
          let page = response.page
      let totalCount = response.totalCount
      let countPage = response.countPage
      let startPage = ((page - 1) / 10) * 10 + 1;
      let endPage = startPage + countPage - 1;
      let totalPage = response.totalPage; 
      if (totalPage < page) {
        page = totalPage;
      }
      if (endPage > totalPage) {
        endPage = totalPage
      }
 
      var param = document.location.href.split("?");
        console.log("현재페이지 : " + param[1])
        //이전페이지
        if (page > 1) {
            let temp_html = `<a href="gym_search_post.html?${page - 1}">pre</a>`
            $('#gymPaging').append(temp_html);
        }
        //한 화면에 보여지는 페이지 수만큼 반복 하여 번호로 나타냄
        for (let i = startPage; i <= endPage; i++) {
            let number = i
            let temp_html = `<a href="gym_search_post.html?${number}">${number}</a>`
            $('#gymPaging').append(temp_html);
        }
        //다음페이지 page
        if (page < totalPage) {
            let temp_html = `<a href="gym_search_post.html?${page + 1}">next</a>`
            $('#gymPaging').append(temp_html);
        } 
        });
    }
    
    
      /* ----------------------- 운동시설 보여주기 함수 끝----------------------  */