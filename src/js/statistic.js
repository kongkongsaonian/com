$(function() {
    $.ajax({ 
        
        type: "GET",   
        url: "https://zhihu-daily.leanapp.cn/api/v1/themes",
        dataType: "json",
        success: function(res){

        var lists = res['THEMES'];
        var tbodyHtml = "";
        var   dateYestoday = lists['limit'];
        var   dateToday = lists.limit;
        for (var i = 0, len = lists['others'].length ; i < len ; i++) {

            tbodyHtml += `<tr><td>${lists['others'][i].description}</td><td>${lists['others'][i].color}</td><td>${lists['others'][i].name}</td>/tr>`;

        }
        $('.date-yestoday').text(dateYestoday);
        $('.date-today').text(dateToday);
        $('tbody').html(tbodyHtml);

        },
        error: function(jqXHR){     
            alert("网络故障"+jqXHR.status);
        }
    });


});