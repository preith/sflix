var RECENT_VIDEOS_SHOWN = 20;
var carousel_lens = [];
var carousel_currs = [];
var car_length = 4;
var API_KEY = "AIzaSyDcxMNdd3HVAC9gFB0OHWGMzN8Rn2f2pjk";
var chID = "UCvnOcTFOvNxpv7-tUw-B4QA";
var pages = {};
var categories = {}; 
var mainCats = [];
var allAdsList = [];
var currLiveShowNum = 0;
var mobile_device = false;
var vidsRecieved = 0;

var liveLinks = [];

function nextClick(id, idx) {
	carousel_currs[idx] += 1;
	document.getElementById(""+id+"_carousel_prev").style.display = "block";
	if(carousel_currs[idx] >= carousel_lens[idx]){
		document.getElementById(""+id+"_carousel_next").style.display = "none";
	}
}

function prevClick(id, idx) {
	carousel_currs[idx] -= 1;
	document.getElementById(""+id+"_carousel_next").style.display = "block";
	if(carousel_currs[idx] == 1){
		document.getElementById(""+id+"_carousel_prev").style.display = "none";
	}
}
function createMobileRecentPage(){
	name = "Recent Videos";
	var html = '<div class="row"><div class="col-xs-3 col-sm-3"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:80%;margin-left:10%;margin-top:10%;" src="img/back.png"></a></div><div class="col-xs-7"><h2 style="color:white;text-align:center;margin-top:10%;margin-left:-5%;">'+name+'</h2></div></div><br>';

    items = categories["all"]
    var size = RECENT_VIDEOS_SHOWN;
    html += '<div class="row tile-row-mobile" style="height:320%;"><div class="tiles-mobile"><div class="row">';
    for(i=1;i <= size; i++){
    	url = items[i-1].url;
    	html += '<div class="col-xs-6 tile-tile-mobile" id="default">';
		html += '<a target="_blank" href="https://www.youtube.com/embed/'+url+'?autoplay=1"><img src="https://img.youtube.com/vi/'+url+'/mqdefault.jpg" style="width:100%;" />';
		html += '</a>';
		html += '<div class="media-body" style="text-align:center;color:white;"><p class="media-heading" style="text-align:center;color:white;"><span style="text-align:center;color:white;">'+items[i-1].title+'</span></p></div>';
		html += '</div>';
		if(i % 2 == 0){
			html += '</div><div class="row">';
		}
    }
    html += '</div></div></div></div></div>';
    pages["Most_Recent"] = html;
}
function createRecentPage(){
	name = "Recent Videos";
	var html = '<div class="row"><div class="col-md-1"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:60%;margin-left:50%;margin-top:10%;" src="img/back.png"></a></div><div class="col-md-10"><h1 style="color:white;text-align:center;">'+name+'</h1></div></div><div class="row"><div class="col-md-offset-1 col-md-10"><br>';

	var curr_car = 1;
	items = categories["all"]
    var size = RECENT_VIDEOS_SHOWN;
    for(i=0;i < size; i++){
    	url = items[i].url;
    	//categories[cat].push({"url": url, "title": playList.items[i].snippet.title, "time": playList.items[i].snippet.publishedAt});
    	if(curr_car == 1){
			html += '<div class="tile-row-sm row">';
    	}
    	if(curr_car == 1) {
    		html += '<div class="col-md-3 fill-sm" id="first">';
    	} else if(curr_car == 4) {
    		html += '<div class="col-md-3 fill-sm" id="last">';
    	} else {
    		html += '<div class="col-md-3 fill-sm" id="default">';
    	}
		html += '<a target="_blank" href="https://www.youtube.com/embed/'+url+'?autoplay=1"><img id="tile-sm" src="https://img.youtube.com/vi/'+url+'/mqdefault.jpg" /></a>';
		html += '<img id="play" src="img/play.png" style="width:5%;"></img>';
		html += '<h4><span>'+items[i].title+'</span></h4>';
		html += '</div>';
		curr_car += 1;
		if(curr_car > 4){
			curr_car = 1;
			html += '</div>';
		}
    }
    if(curr_car != 0){
		html += '</div>';
    }
    html += '</div></div></body>';
    pages["Most_Recent"] = html;
}
function createMobileAdsPage(){
	name = "Advertisements";
	var html = '<div class="row"><div class="col-xs-3 col-sm-3"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:80%;margin-left:10%;margin-top:10%;" src="img/back.png"></a></div><div class="col-xs-7"><h2 style="color:white;text-align:center;margin-top:10%;margin-left:-5%;">'+name+'</h2></div></div><br>';

    items = categories["ads"]
    var size = items.length;
    html += '<div class="row tile-row-mobile" style="height:300%;"><div class="tiles-mobile"><div class="row">';
    for(i=1;i <= size; i++){
    	url = items[i].url;
    	src = items[i].title;
    	html += '<div class="col-xs-6 tile-tile-mobile" id="default">';
		html += '<a target="_blank" href="'+url+'"><img id="tile-sm" src="'+src+'" /></a>';
		if(i % 2 == 0){
			html += '</div><div class="row">';
		}
    }
    html += '</div></div></div></div></div>';
    pages["Most_Recent"] = html;
}
function createAdsPage(){
	name = "Advertisements";
	var html = '<div class="row"><div class="col-md-1"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:60%;margin-left:50%;margin-top:10%;" src="img/back.png"></a></div><div class="col-md-10"><h1 style="color:white;text-align:center;">'+name+'</h1></div></div><div class="col-md-offset-1 col-md-10"><br>';

	var curr_car = 1;
	items = categories["ads"]
    var size = items.length;
    for(i=0;i < size; i++){
    	url = items[i-1].url;
    	src = items[i-1].title;
    	if(curr_car == 1){
			html += '<div class="tile-row-mobile row" style="margin-bottom:25px;">';
    	}
    	html += '<div class="col-md-3 fill-sm">';
		html += '<a target="_blank" href="'+url+'"><img id="tile-sm" src="'+src+'" /></a>';
		html += '</div>';
		curr_car += 1;
		if(curr_car > 4){
			curr_car = 1;
			html += '</div>';
		}
    }
    if(curr_car != 0){
		html += '</div>';
    }
    html += '</div></body>';
    pages["Advertisements"] = html;
}
function createMobileMainPage(mainName){
	var html = '<div class="row" id="container" style="min-height:90%;"><div class="row"><div class="col-xs-3 col-sm-3"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:80%;margin-left:10%;margin-top:10%;" src="img/back.png"></a></div><div class="col-xs-4 col-xs-offset-1"><h2 style="color:white;text-align:center;margin-top:18%;">'+mainName+'</h2></div></div>';

	var curr_car = 1;
    var size = categories.length;
    for (var property in categories) {
	    if (categories.hasOwnProperty(property)) {
	    	if(property.split(" - " + mainName).length > 1){
	    		var items = categories[property];
				var size = 8;
			    	//sets max size of carosel to 15 (4 pages)
			    if(items.length < 8){
			    	size = items.length;
			    }
			    var set_width = (500 / 8) * size;
			    set_width = set_width + "%";
				name = property.split(" - ")[0];
				firstHalfHTML = '<div class="row tile-row-mobile"><div class="row"><div style="margin-bottom:-5px;" class="col-xs-8 col-xs-offset-2"><h4 style="color:white;"><a style="color:white;" onclick="openPage(\''+name.replace(/ /g, "_")+'\')" title="See all '+name+' Videos">'+name+'</a></h4></div></div><div class="tiles-mobile"><div class="row tiles-mobile-inner">';
				secondHalfHTML = '</div></div></div>';
				html += firstHalfHTML;
			    for(i=0;i < size; i++){
			    	url = items[i].url;
			    	html += '<div class="col-xs-2 tile-mobile" id="default">';
					html += '<a target="_blank" href="https://www.youtube.com/embed/'+url+'?autoplay=1"><img src="https://img.youtube.com/vi/'+url+'/mqdefault.jpg" style="width:100%;" />';
					html += '</a>';
					html += '<div class="media-body" style="text-align:center;color:white;"><p class="media-heading" style="text-align:center;color:white;"><span style="text-align:center;color:white;">'+items[i].title+'</span></p></div>';
					html += '</div>';
			    }
			    html += secondHalfHTML;
			    createMobilePage(name, items, mainName);
			}
		}
    }
    html += '</div>';
    pages[mainName] = html;
}
function createMainPage(mainName){
	var html = '<div class="row"><div class="col-md-1"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:60%;margin-left:50%;margin-top:10%;" src="img/back.png"></a></div><div class="col-md-4 col-md-offset-3"><h1 style="color:white;text-align:center;">'+mainName+'</h1></div></div><br>';

	var curr_car = 1;
    var size = categories.length;
    for (var property in categories) {
	    if (categories.hasOwnProperty(property)) {
	    	if(property.split(" - " + mainName).length > 1){
		    	curr_car = 1;
				carousel_currs.push(1);
				idx = carousel_currs.length - 1;
				name = property.split(" - ")[0];
				firstHalfHTML = '<div class="row tile-row" style=""><div class="row"><div style="margin-bottom:-25px;" class="col-md-offset-1 col-md-7"><h2 style="color:white;"><a style="color:white;" onclick="openPage(\''+name.replace(/ /g, "_")+'_'+mainName+'\')" title="See all '+name+' Videos">'+name+'</a></h2></div></div><div class="row tiles"><div class="col-md-12" style="height:125%;""><div id="'+name.replace(/ /g, "_")+'_carousel" class="carousel slide" data-ride="carousel" data-wrap="false" data-interval="false"><div id="'+name.replace(/ /g, "_")+'_carousel_inner" class="carousel-inner" role="listbox">';
				secondHalfHTML = '</div></div><div><a id="'+name.replace(/ /g, "_")+'_carousel_prev" class="left carousel-control" href="#'+name.replace(/ /g, "_")+'_carousel" role="button" data-slide="prev" style="display:none;" onclick="prevClick(\''+name.replace(/ /g, "_")+'\','+idx+')"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a id="'+name.replace(/ /g, "_")+'_carousel_next" class="right carousel-control" href="#'+name.replace(/ /g, "_")+'_carousel" role="button" data-slide="next" onclick="nextClick(\''+name.replace(/ /g, "_")+'\','+idx+')"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></div></div></div></div>';
				html += firstHalfHTML;
				html += '<div class="item active">';
				html += '<div class="row">';
				var items = categories[property];
				var size = 11;
			    	//sets max size of carosel to 15 (4 pages)
			    if(items.length < 11){
			    	size = items.length;
			    }
			    carousel_lens.push(size / 4);
			    for(i=0;i < size; i++){
			    	url = items[i].url;
			    	if(curr_car == 0){
			    		html += '<div class="item">';
						html += '<div class="row">';
						curr_car += 1;
			    	}
			    	if(curr_car == 1) {
			    		html += '<div class="col-md-3 fill" id="first">';
			    	} else if(curr_car == 4) {
			    		html += '<div class="col-md-3 fill" id="last">';
			    	} else {
			    		html += '<div class="col-md-3 fill" id="default">';
			    	}
					html += '<a target="_blank" href="https://www.youtube.com/embed/'+url+'?autoplay=1"><img src="https://img.youtube.com/vi/'+url+'/mqdefault.jpg" style="width:100%;" />';
					html += '<img id="play" src="img/play.png" style="width:5%;"></img></a>';
					html += '<h4><span>'+items[i].title+'</span></h4>';
					html += '</div>';
					curr_car += 1;
					if(curr_car == 5){
						curr_car = 0;
						html += '</div>';
						html += '</div>';
					}
			    }
			    if(curr_car != 0){
			    		//potentially add a car that shows "click for more"
			    	if(size == 11){
			    		html += '<div class="col-md-3 fill" id="more">';
						html += '<a onclick="openPage(\''+name.replace(/ /g, "_")+'\')" title="See all '+name+' Videos"><img src="img/forward.png" style="width:50%;margin-left:20%;margin-top:5%;" /></a>';
						html += '</div>';
			    	}
			    	html += '</div>';
					html += '</div>';
			    }
			    html += secondHalfHTML;
			    createPage(name, items, mainName);
			}
		}
    }
    if(curr_car != 0){
		html += '</div>';
    }
    html += '</div></body>';
    pages[mainName] = html;
}
function createMobilePage(name, items, category){
	var html = '<div class="row"><div class="col-xs-3 col-sm-3"><a onclick="openPage(\''+category+'\')" title="Back to '+category+'"><img style="width:80%;margin-left:10%;margin-top:10%;" src="img/back.png"></a></div><div class="col-xs-7"><h2 style="color:white;text-align:center;margin-top:10%;margin-left:-5%;">'+name+'</h2></div></div><br>';
    var size = items.length;
    var hgt = 16*size;
    if(size % 2 == 1){
    	hgt += 16
    }
    html += '<div class="row tile-row-mobile" style="height:'+hgt+'%;"><div class="tiles-mobile"><div class="row">';
    for(i=1;i <= size; i++){
    	url = items[i-1].url;
    	html += '<div class="col-xs-6 tile-tile-mobile" id="default">';
		html += '<a target="_blank" href="https://www.youtube.com/embed/'+url+'?autoplay=1"><img src="https://img.youtube.com/vi/'+url+'/mqdefault.jpg" style="width:100%;" />';
		html += '</a>';
		html += '<div class="media-body" style="text-align:center;color:white;"><p class="media-heading" style="text-align:center;color:white;"><span style="text-align:center;color:white;">'+items[i-1].title+'</span></p></div>';
		html += '</div>';
		if(i % 2 == 0){
			html += '</div><div class="row">';
		}
    }
    html += '</div></div></div></div></div>';
    pages[name.replace(/ /g, "_")] = html;
}
function createPage(name, items, category){
	var html = '<div class="row"><div class="col-md-1"><a onclick="openPage(\''+category+'\')" title="Back to '+category+'"><img style="width:60%;margin-left:50%;margin-top:10%;" src="img/back.png"></a></div><div class="col-md-10"><h1 style="color:white;text-align:center;">'+name+'</h1></div></div><div class="row"><div class="col-md-offset-1 col-md-10"><br>';

	var curr_car = 1;
    var size = items.length;
    for(i=0;i < size; i++){
    	url = items[i].url;
    	//categories[cat].push({"url": url, "title": playList.items[i].snippet.title, "time": playList.items[i].snippet.publishedAt});
    	if(curr_car == 1){
			html += '<div class="tile-row-sm row">';
    	}
    	if(curr_car == 1) {
    		html += '<div class="col-md-3 fill-sm" id="first">';
    	} else if(curr_car == 4) {
    		html += '<div class="col-md-3 fill-sm" id="last">';
    	} else {
    		html += '<div class="col-md-3 fill-sm" id="default">';
    	}
		html += '<a target="_blank" href="https://www.youtube.com/embed/'+url+'?autoplay=1"><img id="tile-sm" src="https://img.youtube.com/vi/'+url+'/mqdefault.jpg" /></a>';
		html += '<img id="play" src="img/play.png" style="width:5%;"></img>';
		html += '<h4><span>'+items[i].title+'</span></h4>';
		html += '</div>';
		curr_car += 1;
		if(curr_car > 4){
			curr_car = 1;
			html += '</div>';
		}
    }
    if(curr_car != 0){
		html += '</div>';
    }
    html += '</div></div></body>';
    pages[name.replace(/ /g, "_")+'_'+category] = html;
}

function organizeVideos(name, playList, cat){
    var size = playList.items.length;
    for(i=0;i < size; i++){
    	url = playList.items[i].snippet.resourceId.videoId;
    	categories["all"].push({"url": url, "title": playList.items[i].snippet.title, "time": playList.items[i].snippet.publishedAt});
    	categories[cat].push({"url": url, "title": playList.items[i].snippet.title, "time": playList.items[i].snippet.publishedAt});
    	categories[name].push({"url": url, "title": playList.items[i].snippet.title, "time": playList.items[i].snippet.publishedAt});
    }
    categories["all"].sort(function(a, b){a_sec = parseInt(a.time.substr(0, 4))*60*60*24*365 + parseInt(a.time.substr(5, 2)*60*60*24*30) + parseInt(a.time.substr(8, 2))*60*60*24 + parseInt(a.time.substr(11, 2))*60*60 + parseInt(a.time.substr(14, 2))*60 + parseInt(a.time.substr(17, 2));b_sec = parseInt(b.time.substr(0, 4))*60*60*24*365 + parseInt(b.time.substr(5, 2)*60*60*24*30) + parseInt(b.time.substr(8, 2))*60*60*24 + parseInt(b.time.substr(11, 2))*60*60 + parseInt(b.time.substr(14, 2))*60 + parseInt(b.time.substr(17, 2));return b_sec-a_sec});
    categories[cat].sort(function(a, b){a_sec = parseInt(a.time.substr(0, 4))*60*60*24*365 + parseInt(a.time.substr(5, 2)*60*60*24*30) + parseInt(a.time.substr(8, 2))*60*60*24 + parseInt(a.time.substr(11, 2))*60*60 + parseInt(a.time.substr(14, 2))*60 + parseInt(a.time.substr(17, 2));b_sec = parseInt(b.time.substr(0, 4))*60*60*24*365 + parseInt(b.time.substr(5, 2)*60*60*24*30) + parseInt(b.time.substr(8, 2))*60*60*24 + parseInt(b.time.substr(11, 2))*60*60 + parseInt(b.time.substr(14, 2))*60 + parseInt(b.time.substr(17, 2));return b_sec-a_sec});
    categories[name].sort(function(a, b){a_sec = parseInt(a.time.substr(0, 4))*60*60*24*365 + parseInt(a.time.substr(5, 2)*60*60*24*30) + parseInt(a.time.substr(8, 2))*60*60*24 + parseInt(a.time.substr(11, 2))*60*60 + parseInt(a.time.substr(14, 2))*60 + parseInt(a.time.substr(17, 2));b_sec = parseInt(b.time.substr(0, 4))*60*60*24*365 + parseInt(b.time.substr(5, 2)*60*60*24*30) + parseInt(b.time.substr(8, 2))*60*60*24 + parseInt(b.time.substr(11, 2))*60*60 + parseInt(b.time.substr(14, 2))*60 + parseInt(b.time.substr(17, 2));return b_sec-a_sec});
}

function openPage(name){
	if(mobile_device){
		$('#content-mobile').fadeOut(300, function(){
		    var replacement = $('<div id="content-mobile">'+pages[name]+'</div>').hide();
		    $(this).replaceWith(replacement);
		    $('#content-mobile').fadeIn(300);
		    window.scrollTo(0,0);
		    document.getElementById("searchbar").value = "";
		});
	}else{
		$('#content').fadeOut(300, function(){
		    var replacement = $('<div id="content">'+pages[name]+'</div>').hide();
		    $(this).replaceWith(replacement);
		    $('#content').fadeIn(300);
		    window.scrollTo(0,0);
		    document.getElementById("searchbar").value = "";
		});
	}
}
function loadMainCarsMobile(){
	var html = "";
	for(j=-2;j < mainCats.length; j++){
		name = mainCats[j];
		items = categories[name];
		if(j == -2){
			name = "Most Recent";
			items = categories["all"];
		}
		if(j == -1){
			name = "Advertisements";
			items = categories["ads"];
		}
		if(items != undefined){
			idx = carousel_currs.length - 1;
			var size = 7;
			var width_size = 8;
		    	//sets max size of carosel to 7 (4 pages)
		    if(items.length < 7 || j == -1){
		    	size = items.length;
		    	width_size = size;
		    }
		    var set_width = (500 / 8) * width_size;
		    set_width = set_width + "%";
			if(j == -1){
				firstHalfHTML = '<div class="row"><div id="cars" class="col-md-12"><div class="row tile-row-mobile" style="height:10%;"><div class="row"><div style="margin-bottom:-5px;" class="col-xs-8 col-xs-offset-2"><h4 style="color:white;"><a style="color:white;" onclick="openPage(\''+name.replace(/ /g, "_")+'\')" title="See all '+name+' Videos">'+name+'</a></h4></div></div><div class="tiles-mobile"><div class="row tiles-mobile-inner">';
			}else{
				firstHalfHTML = '<div class="row"><div id="cars" class="col-md-12"><div class="row tile-row-mobile" style="height:35%;"><div class="row"><div style="margin-bottom:-5px;" class="col-xs-8 col-xs-offset-2"><h4 style="color:white;"><a style="color:white;" onclick="openPage(\''+name.replace(/ /g, "_")+'\')" title="See all '+name+' Videos">'+name+'</a></h4></div></div><div class="tiles-mobile"><div class="row tiles-mobile-inner">';
			}
			html += firstHalfHTML;
		    for(i=0;i < size; i++){
		    	url = items[i].url;
		    	html += '<div class="col-xs-2 tile-mobile" id="default">';
		    	if(j == -1){
		    		html += '<a target="_blank" href="'+url+'"><img src="'+items[i].title+'" style="width:100%;" /></a>';
					html += '</div>';
		    	}else{
					html += '<a target="_blank" href="https://www.youtube.com/embed/'+url+'?autoplay=1"><img src="https://img.youtube.com/vi/'+url+'/mqdefault.jpg" style="width:100%;" />';
					html += '</a>';
					html += '<div class="media-body" style="text-align:center;color:white;"><p class="media-heading" style="text-align:center;color:white;"><span style="text-align:center;color:white;">'+items[i].title+'</span></p></div>';
					html += '</div>';
				}
		    }
		    html += '<div class="col-xs-2 tile-mobile" id="more">';
			html += '<a onclick="openPage(\''+name.replace(/ /g, "_")+'\')" title="See all '+name+' Videos"><img src="img/forward.png" style="width:50%;margin-left:20%;margin-top:10%;" /></a>';
			html += '</div></div></div></div></div></div>';
		    document.getElementById("dropDown").innerHTML += '<li><a onclick="openPage(\''+name.replace(/ /g, "_")+'\')" title="See all '+name+' Videos" style="color:white;text-align:center;font-size:16;">'+name+'</a></li>';
		    if(j == -2){
		    	createMobileRecentPage();
		    }else if(j == -1){
		    	createMobileAdsPage();
		    }else{
		    	createMobileMainPage(name);
		    }
		}
	}
	document.getElementById("content-mobile").innerHTML += html;
	pages["home"] = document.getElementById("content-mobile").innerHTML;
}
function loadMainCars(){
	var html = "";
	for(j=-2;j < mainCats.length; j++){
		name = mainCats[j];
		items = categories[name];
		if(j == -2){
			name = "Most Recent";
			items = categories["all"];
		}
		if(j == -1){
			name = "Advertisements";
			items = categories["ads"];
		}
		if(items != undefined){
			var curr_car = 1;
			carousel_currs.push(1);
			idx = carousel_currs.length - 1;
			if(j == -1){
				firstHalfHTML = '<div class="row"><div id="cars" class="col-md-12"><div class="row tile-row" style=""><div class="row"><div class="col-md-offset-1 col-md-7"><h2 style="color:white;"><a style="color:white;" onclick="openPage(\''+name.replace(/ /g, "_")+'\')" title="See all '+name+' Videos">'+name+'</a></h2></div></div><div class="row tiles"><div class="col-md-12" style="height:110%;"><div id="'+name.replace(/ /g, "_")+'_carousel" class="carousel slide" data-ride="carousel" data-wrap="false" data-interval="false"><div id="'+name.replace(/ /g, "_")+'_carousel_inner" class="carousel-inner" role="listbox">';
			}else{
				firstHalfHTML = '<div class="row"><div id="cars" class="col-md-12"><div class="row tile-row" style=""><div class="row"><div class="col-md-offset-1 col-md-7"><h2 style="color:white;"><a style="color:white;" onclick="openPage(\''+name.replace(/ /g, "_")+'\')" title="See all '+name+' Videos">'+name+'</a></h2></div></div><div class="row tiles"><div class="col-md-12" style="height:125%;margin-top:-10px;"><div id="'+name.replace(/ /g, "_")+'_carousel" class="carousel slide" data-ride="carousel" data-wrap="false" data-interval="false"><div id="'+name.replace(/ /g, "_")+'_carousel_inner" class="carousel-inner" role="listbox">';
			}
			html += firstHalfHTML;
			html += '<div class="item active">';
			html += '<div class="row">';
			var size = 11;
		    	//sets max size of carosel to 15 (4 pages)
		    if(items.length < 11 || j == -1){
		    	size = items.length;
		    }
		    carousel_lens.push(size / 4);
		    for(i=0;i < size; i++){
		    	url = items[i].url;
		    	if(curr_car == 0){
		    		html += '<div class="item">';
					html += '<div class="row">';
					curr_car += 1;
		    	}
		    	if(curr_car == 1) {
		    		html += '<div class="col-md-3 fill" id="first">';
		    	} else if(curr_car == 4) {
		    		html += '<div class="col-md-3 fill" id="last">';
		    	} else {
		    		html += '<div class="col-md-3 fill" id="default">';
		    	}
		    	if(j == -1){
		    		html += '<a target="_blank" href="'+url+'"><img src="'+items[i].title+'" style="width:100%;" /></a>';
					html += '</div>';
		    	}else{
					html += '<a target="_blank" href="https://www.youtube.com/embed/'+url+'?autoplay=1"><img src="https://img.youtube.com/vi/'+url+'/mqdefault.jpg" style="width:100%;" />';
					html += '<img id="play" src="img/play.png" style="width:5%;"></img></a>';
					html += '<div class="media-body"><h4 class="media-heading"><span>'+items[i].title+'</span></h4></div>';
					html += '</div>';
				}
				curr_car += 1;
				if(curr_car == 5){
					curr_car = 0;
					html += '</div>';
					html += '</div>';
				}
		    }
		    if(curr_car != 0){
		    		//add a car that shows "click for more"
		    	if(size == 11){
		    		html += '<div class="col-md-3" id="last">';
					html += '<a onclick="openPage(\''+name.replace(/ /g, "_")+'\')" title="See all '+name+' Videos"><img src="img/forward.png" style="width:50%;margin-left:20%;margin-top:15%;" /></a>';
					html += '</div>';
		    	}
		    	html += '</div>';
				html += '</div>';
		    }
		    secondHalfHTML = '</div></div><div><a id="'+name.replace(/ /g, "_")+'_carousel_prev" class="left carousel-control" href="#'+name.replace(/ /g, "_")+'_carousel" role="button" data-slide="prev" style="display:none;" onclick="prevClick(\''+name.replace(/ /g, "_")+'\','+idx+')"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a id="'+name.replace(/ /g, "_")+'_carousel_next" class="right carousel-control" href="#'+name.replace(/ /g, "_")+'_carousel" role="button" data-slide="next" onclick="nextClick(\''+name.replace(/ /g, "_")+'\','+idx+')"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></div></div></div></div></div></div>';
		    html += secondHalfHTML;
		    document.getElementById("dropDown").innerHTML += '<li><a onclick="openPage(\''+name.replace(/ /g, "_")+'\')" title="See all '+name+' Videos">'+name+'</a></li>';
		    if(j == -2){
		    	createRecentPage();
		    }else if(j == -1){
		    	createAdsPage();
		    }else{
		    	createMainPage(name);
		    }
		}
	}
	document.getElementById("content").innerHTML += html;
	pages["home"] = document.getElementById("content").innerHTML;
}

function getPlaylists(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.response);
			var total = 0;
			for(i=0;i < obj.items.length; i++){
				var pl = obj.items[i]
				var title = pl.snippet.title;
				var cat = title.split(" - ")[1];
				if(cat != undefined){
					total += 1;
					if(mainCats.indexOf(cat) == -1){
						mainCats.push(cat);
					}
				}
			}
			for(i=0;i < obj.items.length; i++){
				var pl = obj.items[i]
				var id = pl.id;
				var title = pl.snippet.title;
				var cat = title.split(" - ")[1];
				if(cat != undefined){
					if(categories[cat] == undefined){
						categories[cat] = [];
					}
					categories[title] = [];
					getVidsFromPlaylist(id, title, cat, total);
				}
			}
		}
	};
	xhttp.open("GET", "https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCvnOcTFOvNxpv7-tUw-B4QA&maxResults=50&key="+API_KEY+"", true);
	xhttp.send();
}
function getVidsFromPlaylist(id, title, cat, end){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.response);
			vidsRecieved += 1;
			if(obj.items.length > 0){
				organizeVideos(title, obj, cat);
			}
			if(vidsRecieved == end){
				if(mobile_device){
					loadMainCarsMobile();
				}else{
					loadMainCars();
				}
			}
		}
	};
	xhttp.open("GET", "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId="+id+"&key="+API_KEY+"", true);
	xhttp.send();
}

function loadAdCars(allAds){
	categories["ads"] = [];
	if(allAdsList.length > 1){
		title = "img/ads/primary/" + allAdsList[0].split(",")[0];
    	url = allAdsList[0].split(",")[1];
		categories["ads"].push({"url": url, "title": title, "time": "0"});

		title = "img/ads/secondary/" + allAdsList[1].split(",")[0];
    	url = allAdsList[1].split(",")[1];
		categories["ads"].push({"url": url, "title": title, "time": "0"});

		title = "img/ads/secondary/" + allAdsList[2].split(",")[0];
    	url = allAdsList[2].split(",")[1];
		categories["ads"].push({"url": url, "title": title, "time": "0"});
	}
	var size = allAds.length;
    for(i=0;i < size; i++){
		title = "img/ads/regular/" + allAds[i].split(",")[0];
    	url = allAds[i].split(",")[1];
		categories["ads"].push({"url": url, "title": title, "time": "0"});
	}
}

function readTextFile(fileStr, allAds)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", fileStr, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                if(!allAds && fileStr.split("primary").length > 1){	//primary ad
                	var name = allText.split(",")[0];
                	var url = allText.split(",")[1];
                	var html = '<a href="'+url+'" target="_blank"><img src="img/ads/primary/'+name+'" style="width:100%;"></a>';
                	document.getElementById("primary_ad").innerHTML = html;
                }else if(!allAds && fileStr.split("secondary").length > 1){	//secondary ads
                	var lines = allText.split("\n");
                	var name1 = lines[0].split(",")[0];
                	var name2 = lines[1].split(",")[0];
                	var url1 = lines[0].split(",")[1];
                	var url2 = lines[1].split(",")[1];
                	var html = '<a href="'+url1+'" target="_blank"><img src="img/ads/secondary/'+name1+'" style="width:98%;padding-bottom:10px;"></a><a href="'+url2+'" target="_blank"><img src="img/ads/secondary/'+name2+'" style="width:98%;"></a>';
                	document.getElementById("secondary_ads").innerHTML = html;
                }else if(fileStr.split("primary").length > 1){	//primary ads in carosel
                	allAdsList.push(allText);
            	}else if(fileStr.split("secondary").length > 1){	//secondary ads in carosel
                	var lines = allText.split("\n");
                	allAdsList.push(lines[0]);
                	allAdsList.push(lines[1]);
            	}else{
                	loadAdCars(allText.split("\n"));
                }
            }
        }
    }
    rawFile.send(null);
}

function loadLive(){
	var numLive = liveLinks.length;
	var title = "Live Show";
	if(numLive > 1){
		title = "Live Shows";
	}
	var head = '<div class="row"><div class="col-md-offset-1 col-md-3"><h2 style="color:white;">'+title+'</h2></div></div>';
	var live1 = ['<div id="live1">','<div class="row"><div class="col-md-offset-1 col-md-7" style="height:80%;"><iframe src="','" frameborder="0" gesture="media" allow="encrypted-media" width="100%" height="100%" allowfullscreen></iframe></div></div></div>'];
	var live2 = ['<div id="live2">','<div class="row"><div class="col-md-offset-1 col-md-5" style="padding:5;height:60%;"><iframe src="','" frameborder="0" gesture="media" allow="encrypted-media" width="100%" height="100%" allowfullscreen></iframe></div><div class="col-md-5" style="padding:5;height:60%;"><iframe src="','" frameborder="0" gesture="media" allow="encrypted-media" width="100%" height="100%" allowfullscreen></iframe></div></div></div>'];
	var live3 = ['<div id="live3">','<div class="row"><div class="col-md-offset-1 col-md-6" style="padding:5;height:74%;"><iframe src="','" frameborder="0" gesture="media" allow="encrypted-media" width="100%" height="100%" allowfullscreen></iframe></div><div class="col-md-5" style="margin-right:-200px;"><div class="row"><div class="col-md-7" style="padding:5;height:37%;"><iframe src="','" frameborder="0" gesture="media" allow="encrypted-media" width="100%" height="100%" allowfullscreen></iframe></div></div><div class="row"><div class="col-md-7" style="padding:5;height:37%;"><iframe src="','" frameborder="0" gesture="media" allow="encrypted-media" width="100%" height="100%" allowfullscreen></iframe></div></div></div></div></div>'];

	var mobileHead = '<div class="row"><div class="col-xs-offset-1 col-xs-6"><h2 style="color:white;">'+title+'</h2></div></div>'
	var mobileLive1 = ['<div id="live1"><div class="row"><div class="col-xs-12" style="height:40%;"><iframe src="','" frameborder="0" gesture="media" allow="encrypted-media" width="100%" height="100%" allowfullscreen></iframe></div></div></div>']

	var html = "";
	var linkCt = 0;
	if(numLive == 0){
		//maybe put banner ads here?
		return;
	}else if(mobile_device){
		html += mobileHead;
		for(var i = 0; i < numLive; i++){
			html += mobileLive1[0] + liveLinks[i] + mobileLive1[1];
			html += '<br>';
		}
		document.getElementById("content-mobile").innerHTML = html + document.getElementById("content-mobile").innerHTML;
		pages["home"] = document.getElementById("content-mobile").innerHTML;
		return;
	}else{
		//need to loop or something
		//could look for % 3 first, then do 1, or 2 and then all groups of 3 after
			//one at top
		if(numLive == 4){
			html += live2[0] + head + live2[1] + liveLinks[0] + live2[2]+ liveLinks[1] + live2[3];
			html += live2[0] + live2[1] + liveLinks[2] + live2[2]+ liveLinks[3] + live2[3];
			numLive = 0;
		}else if((numLive % 3) == 1){
			//maybe put side ads next to live vid?
			html += live1[0] + head + live1[1] + liveLinks[0] + live1[2];
			linkCt += 1;
			//two at top
		}else if((numLive % 3) == 2){
			html += live2[0] + head + live2[1] + liveLinks[0] + live2[2]+ liveLinks[1] + live2[3];
			linkCt += 2;
		}

			//then loop through all groups of 3 lefts
		length = Math.floor((numLive / 3));
		for(var i = 0; i < length; i++){
			if(numLive % 3 == 0 && i == 0){
				html += live3[0] + head;
				html += live3[1] + liveLinks[linkCt++];
				html += live3[2] + liveLinks[linkCt++];
				html += live3[3] + liveLinks[linkCt++];
				html += live3[4];
			}else{
				html += live3[0] + live3[1] + liveLinks[linkCt++];
				html += live3[2] + liveLinks[linkCt++];
				html += live3[3] + liveLinks[linkCt++];
				html += live3[4];

			}
		} 
	}
	document.getElementById("content").innerHTML = html + document.getElementById("content").innerHTML;
	pages["home"] = document.getElementById("content").innerHTML;
	return;
}

function createMobileSearchPage(query, items){
	name = "Search results for \"" + query + "...\"";
	var html = '<div class="row"><div class="col-xs-3 col-sm-3"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:80%;margin-left:10%;margin-top:20%;" src="img/back.png"></a></div><div class="col-xs-7"><h2 style="color:white;text-align:center;margin-top:10%;margin-left:-5%;">'+name+'</h2></div></div><br>';

	var size = items.length;
    var hgt = 16*size;
    if(size % 2 == 1){
    	hgt += 16
    }
    html += '<div class="row tile-row-mobile" style="height:'+hgt+'%;"><div class="tiles-mobile"><div class="row">';
    for(i=1;i <= size; i++){
    	url = items[i-1].url;
    	html += '<div class="col-xs-6 tile-tile-mobile" id="default">';
		html += '<a target="_blank" href="https://www.youtube.com/embed/'+url+'?autoplay=1"><img src="https://img.youtube.com/vi/'+url+'/mqdefault.jpg" style="width:100%;" />';
		html += '</a>';
		html += '<div class="media-body" style="text-align:center;color:white;"><p class="media-heading" style="text-align:center;color:white;"><span style="text-align:center;color:white;">'+items[i-1].title+'</span></p></div>';
		html += '</div>';
		if(i % 2 == 0){
			html += '</div><div class="row">';
		}
    }
    html += '</div></div></div></div></div>';
    $('#content-mobile').fadeOut(300, function(){
	    var replacement = $('<div id="content-mobile">'+html+'</div>').hide();
	    $(this).replaceWith(replacement);
	    $('#content-mobile').fadeIn(300);
	    window.scrollTo(0,0);
	});
}
function createSearchPage(query, items){
	name = "Search results for \"" + query + "...\"";
	var html = '<div class="row"><div class="col-md-1"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:60%;margin-left:50%;margin-top:10%;" src="img/back.png"></a></div><div class="col-md-10"><h1 style="color:white;text-align:center;">'+name+'</h1></div></div><div class="col-md-offset-1 col-md-10"><br>';

	var curr_car = 1;
    var size = items.length;
    for(i=0;i < size; i++){
    	url = items[i].url;
    	if(curr_car == 1){
			html += '<div class="tile-row-sm row">';
    	}
    	if(curr_car == 1) {
    		html += '<div class="col-md-3 fill-sm" id="first">';
    	} else if(curr_car == 4) {
    		html += '<div class="col-md-3 fill-sm" id="last">';
    	} else {
    		html += '<div class="col-md-3 fill-sm" id="default">';
    	}
		html += '<a target="_blank" href="https://www.youtube.com/embed/'+url+'?autoplay=1"><img id="tile-sm" src="https://img.youtube.com/vi/'+url+'/mqdefault.jpg" /></a>';
		html += '<img id="play" src="img/play.png" style="width:5%;"></img>';
		html += '<h4><span>'+items[i].title+'</span></h4>';
		html += '</div>';
		curr_car += 1;
		if(curr_car > 4){
			curr_car = 1;
			html += '</div>';
		}
    }
    if(curr_car != 0){
		html += '</div>';
    }
    html += '</div></div></body>';
    $('#content').fadeOut(300, function(){
	    var replacement = $('<div id="content">'+html+'</div>').hide();
	    $(this).replaceWith(replacement);
	    $('#content').fadeIn(300);
	    window.scrollTo(0,0);
	});
}
$(document).ready(function() {
	var timeoutID = null;

	$('#searchbar').keyup(function(e) {
		clearTimeout(timeoutID);
		timeoutID = setTimeout(launchSearch.bind(undefined, e.target.value), 500);
	});

});

function getSearchItems(serachQuery){
	serachQuery = serachQuery.toLowerCase();
	allItems = categories["all"];
	searchItems = []
	var size = allItems.length;
	for(i=0;i < size; i++){
		item = allItems[i];
		title = item.title.toLowerCase();
		if(title.includes(serachQuery)){
			searchItems.push(item);
		}
	}
	return searchItems;
}
function launchSearch(serachQuery){
	if(serachQuery == ""){
		openPage("home");
		return;
	}else{
		items = getSearchItems(serachQuery);
		if(items.length > 0){
			if(mobile_device){
				createMobileSearchPage(serachQuery, items);
			}else{
				createSearchPage(serachQuery, items);
			}
		}else{
			name = "No results found for \"" + serachQuery + "\"";
			if(mobile_device){
				var html = '<div class="row"><div class="col-xs-3 col-sm-3"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:80%;margin-left:10%;margin-top:10%;" src="img/back.png"></a></div><br><div class="col-xs-7"><h2 style="color:white;text-align:center;margin-top:10%;margin-left:-5%;">'+name+'</h2></div></div><br>';
				html += '<div style="height:80vh;"><div class="col-xs-5 col-xs-offset-5"><img height="10%" src="img/searchicon.png"/></div></div></div>';
				$('#content-mobile').fadeOut(300, function(){
				    var replacement = $('<div id="content-mobile">'+html+'</div>').hide();
				    $(this).replaceWith(replacement);
				    $('#content-mobile').fadeIn(300);
				    window.scrollTo(0,0);
				});
			}else{
				var html = '<div class="row"><div class="col-md-1"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:60%;margin-left:50%;margin-top:10%;" src="img/back.png"></a></div><div class="col-md-10"><h1 style="color:white;text-align:center;">'+name+'</h1></div></div><div class="col-md-offset-1 col-md-10"><br>';
		    	html += '<div style="height:80vh;"><br><div class="col-md-6 col-md-offset-5"><img height="40%" src="img/searchicon.png"/></div></div></div>';
			    $('#content').fadeOut(300, function(){
				    var replacement = $('<div id="content">'+html+'</div>').hide();
				    $(this).replaceWith(replacement);
				    $('#content').fadeIn(300);
				    window.scrollTo(0,0);
				});
			}
		}
	}
}

function dummyFunction(){
	$("button.navbar-toggle").click();
	return;
}

window.onload = function() {
	//add popover functionality
	$(function () {
		$('[data-toggle="popover"]').popover({html:true})
	})
	//add click ouside navbar
	$(document).ready(function () {
	    $(document).click(function (event) {
	        var clickover = $(event.target);
	        var _opened = $(".navbar-collapse").hasClass("navbar-collapse collapse in");
	        if (_opened === true && !clickover.hasClass("navbar-toggle") && (clickover[0].id != "noClose") && (clickover[0].id != "searchbar")) {
	            $("button.navbar-toggle").click();
	        }
	    });
	});
	categories["all"] = [];
	if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		mobile_device = true;
		pages["social"] = '<div id="social"><div class="row"><div class="col-xs-3"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:80%;margin-left:30%;margin-top:10%;" src="img/back.png"></a></div><div class="col-xs-7"><h2 style="color:white;text-align:center;margin-top:10%;margin-left:-5%;">Social Media</h2></div><div id="tabs" class="col-xs-offset-3"><ul class="nav nav-pills"><li class="active col-xs-4"><a href="#fb" target="_blank" data-toggle="tab"><img height="10%" src="img/fb.png"></a></li><li class="col-xs-4"><a href="#tw" target="_blank" data-toggle="tab"><img height="10%" src="img/twit.png"></a></li></ul></div></div><div class="row tab-content" style="margin-left:1px;"><div id="fb" class="tab-pane fade in active col-xs-11"><iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fshowbarnflix&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="320" height="600" style="border:none;overflow:scroll" scrolling="yes" frameborder="0" allowTransparency="true"></iframe></div><div id="tw" class="tab-pane fade col-xs-11"><a class="twitter-timeline" data-width="500" data-height="600" data-theme="light" href="https://twitter.com/ShowBarnFlix">Error loading content. Click here to see Tweets by @ShowBarnFlix</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></div></div></div>';
	}else{
		pages["social"] = '<div class="row"><div class="row"><div class="col-md-1"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:60%;margin-left:50%;margin-top:20%;" src="img/back.png"></a></div><div class="col-md-10"><h1 style="color:white;text-align:center;">Social Media</h1></div></div><div class="col-md-offset-1 col-md-10"><br><div class="col-md-6"><iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fshowbarnflix&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="500" height="600" style="border:none;overflow:hidden" scrolling="yes" frameborder="0" allowTransparency="true"></iframe></div><div class="col-md-6"><a class="twitter-timeline" data-width="500" data-height="600" data-theme="light" href="https://twitter.com/ShowBarnFlix">Error loading content. Click here to see Tweets by @ShowBarnFlix</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></div></div></div>';
		//document.getElementById("content").style = "position:relative;margin-top:6%;";
	}
	loadLive();
	getPlaylists();
}
