
function userIsOwner() { 
    var para = document.location.href.split("?"); 
    var settings = {
      // "url": "http://localhost:8080/api/gym/owner/write-owner",
      "url": "http://localhost:8080/api/owner/"+ para[1]+ "/write-owner",
      "method": "GET",
      "timeout": 0,
    };
  
    $.ajax(settings).done( function(reponse) {
        if(reponse){
            let temp_html = ```
                                <button onclick="putGymPost()">수정</button>
                                <button onclick="deleteGymPost()">삭제</button>
                                <button onclick="discountPrice()">할인</button>
                            ``` 
            $('#userIsOwner').append(temp_html) 
        }
    });
}