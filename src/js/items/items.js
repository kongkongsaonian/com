;$(function(){

	//模拟数据库
	const $mask = $('#mask');
	const $list = $('.list-all');
	const stroge = window.localStorage;
	var tempList = [];

	function getLists() {
		return JSON.parse(stroge.getItem('lists'))
	}

	var dataLists = getLists();
	var fragementHtml = '';
	if(  dataLists === null) {
		tempList.push({'desc': "要有好奇心", 'url': 'https://www.qdaily.com'});
		var temString = JSON.stringify(tempList)
		stroge.setItem('lists', temString)
		dataLists = tempList;
	}
	for (var i = 0 , len = dataLists.length; i< len; i++ ) {

		fragementHtml += `<li><a href="${dataLists[i].url}" target="_blank">${dataLists[i].desc}</a></li>`;

	}
	// 登录渲染数据
	$list.append(fragementHtml);


	$('.add').on('click', function(){
		$mask.show();

	});

	$('.add-confirm').on('click', function(){

		var textValue = $('.add-text').val();
		var urlValue = $('.add-url').val();
		var $alert = $('.alert-box');
		var liHtml = `<li><a href="${urlValue}" target="_blank">${textValue}</a></li>`;
		if(textValue != '' && urlValue != '') {
			$list.append(liHtml);
			dataLists.push({'desc': textValue, 'url': urlValue});
			var templapeList = JSON.stringify(dataLists);
			stroge.setItem('lists', templapeList);
			$('.add-text').val('');
			$('.add-url').val('');
			$mask.hide();
		} else {
			$alert.fadeIn();
			setTimeout(function() {
				$alert.fadeOut();
			}, 800);
		}


	});

	$('.add-cancel').on('click', function(e){
		e.stopPropagation();
		$mask.hide();
	});

	
})