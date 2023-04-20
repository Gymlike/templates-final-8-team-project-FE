//리스트
$(document).ready(function () {
    var settings = {
        "url": "http://ec2-43-200-226-255.ap-northeast-2.compute.amazonaws.com/api/manager/standby",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {

        console.log(response);

        let rows = response
        for (let i = 0; i < rows.length; i++) {
            let id = rows[i]['id']
            let role = rows[i]['role']
            let nickname = rows[i]['nickname']

            let temp_html = ` <tr>
      <td>${id}</td>
      <td>${role}</td>
      <th>${nickname}</th>
      <th><button name="allowmanager" id ="allow_${id}" class = "allowbtn">수락</button></th>
      <th><button name="refusemanager" id ="refuse_${id}" class = "refusebtn">거절</button></th>
    </tr>`
            $('#standbylist').append(temp_html)
        }
    })
});


//승인
$('#standbylist').on("click", "button[name='allowmanager']", function () {

    var id_by_name = $(this).attr('id')

    console.log(id_by_name)
    var id = id_by_name.split("_")[1]
    console.log(id)

    var settings = {
        "url": "http://ec2-43-200-226-255.ap-northeast-2.compute.amazonaws.com/api/manager/standby/" + id,
        "method": "PATCH",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        alert("승인하였습니다.")
        window.location.reload();
    })
});

//거절
$('#standbylist').on("click", "button[name='refusemanager']", function () {

    var id_by_name = $(this).attr('id')

    console.log(id_by_name)
    var id = id_by_name.split("_")[1]
    console.log(id)

    var settings = {
        "url": "http://ec2-43-200-226-255.ap-northeast-2.compute.amazonaws.com/api/manager/standby/" + id,
        "method": "DELETE",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        alert("거절하였습니다.")
        window.location.reload();
    })
});
    