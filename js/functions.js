var RECENT_VIDEOS_SHOWN = 20;
var carousel_lens = [];
var carousel_currs = [];
var car_length = 4;
var API_KEY = "AIzaSyDcxMNdd3HVAC9gFB0OHWGMzN8Rn2f2pjk";
var chID = "UCvnOcTFOvNxpv7-tUw-B4QA";
var tempChId = "UCKn9x42tG-XbocCjWjdVuDg";
var pages = {};
var categories = {}; 
var main_cats = ["Sheep", "Goats", "Pigs", "Cattle", "Commercials"];
var allAdsList = []
var currLiveShowNum = 0;

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

function createRecentPage(){
	name = "Recent Videos";
	var html = '<br><br><br><div class="row"><div class="col-md-1"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:60%;margin-left:50%;margin-top:10%;" src="img/back.png"></a></div><div class="col-md-10"><h1 style="color:white;text-align:center;">'+name+'</h1></div></div><div class="col-md-offset-1 col-md-10"><br>';

	var curr_car = 1;
	items = categories["all"]
    var size = RECENT_VIDEOS_SHOWN;
    for(i=0;i < size; i++){
    	url = items[i].url;
    	//categories[cat].push({"url": url, "title": playList.items[i].snippet.title, "time": playList.items[i].snippet.publishedAt});
    	if(curr_car == 1){
			html += '<div class="row">';
    	}
    	html += '<div class="col-md-3 fill-sm">';
		html += '<a target="_blank" href="https://www.youtube.com/embed/'+url+'?autoplay=1"><img src="http://img.youtube.com/vi/'+url+'/hqdefault.jpg" style="width:90%;" /></a>';
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
    html += '</div></body>';
    pages["Most_Recent"] = html;
}

function createAdsPage(){
	name = "Advertisements";
	var html = '<br><br><br><div class="row"><div class="col-md-1"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:60%;margin-left:50%;margin-top:10%;" src="img/back.png"></a></div><div class="col-md-10"><h1 style="color:white;text-align:center;">'+name+'</h1></div></div><div class="col-md-offset-1 col-md-10"><br>';

	var curr_car = 1;
	items = categories["ads"]
    var size = items.length;
    for(i=0;i < size; i++){
    	url = items[i].url;
    	src = items[i].title;
    	if(curr_car == 1){
			html += '<div class="row" style="margin-bottom:25px;">';
    	}
    	html += '<div class="col-md-3 fill-sm">';
		html += '<a target="_blank" href="'+url+'"><img src="'+src+'" style="width:90%;" /></a>';
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

function createMainPage(mainName){
	var html = '<br><br><br><div class="row"><div class="col-md-1"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:60%;margin-left:50%;margin-top:10%;" src="img/back.png"></a></div><div class="col-md-4 col-md-offset-3"><h1 style="color:white;text-align:center;">'+mainName+'</h1></div></div><br>';

	var curr_car = 1;
    var size = categories.length;
    for (var property in categories) {
	    if (categories.hasOwnProperty(property)) {
	    	if(property.split(" - " + mainName).length > 1){
		    	curr_car = 1;
				carousel_currs.push(1);
				idx = carousel_currs.length - 1;
				name = property.split(" - ")[0];
				firstHalfHTML = '<div class="row tile-row" style="max-height:120px;"><div class="row"><div style="margin-bottom:-25px;" class="col-md-offset-1 col-md-7"><h2 style="color:white;"><a style="color:white;" onclick="openPage(\''+name.replace(/ /g, "_")+'\')" title="See all '+name+' Videos">'+name+'</a></h2></div></div><div class="row tiles"><div class="col-md-12" style="height:125%;""><div id="'+name.replace(/ /g, "_")+'_carousel" class="carousel slide" data-ride="carousel" data-wrap="false" data-interval="false"><div id="'+name.replace(/ /g, "_")+'_carousel_inner" class="carousel-inner" role="listbox">';
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
			    	//console.log(playList.items[i]);
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
					html += '<a target="_blank" href="https://www.youtube.com/embed/'+url+'?autoplay=1"><img src="http://img.youtube.com/vi/'+url+'/mqdefault.jpg" style="width:100%;" />';
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
						html += '<a onclick="openPage(\''+name.replace(/ /g, "_")+'\')" title="See all '+name+' Videos"><img src="img/more.png" style="width:100%;" /></a>';
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

function createPage(name, items, category){
	var html = '<br><br><br><div class="row"><div class="col-md-1"><a onclick="openPage(\''+category+'\')" title="Back to '+category+'"><img style="width:60%;margin-left:50%;margin-top:10%;" src="img/back.png"></a></div><div class="col-md-10"><h1 style="color:white;text-align:center;">'+name+'</h1></div></div><div class="col-md-offset-1 col-md-10"><br>';

	var curr_car = 1;
    var size = items.length;
    for(i=0;i < size; i++){
    	url = items[i].url;
    	//categories[cat].push({"url": url, "title": playList.items[i].snippet.title, "time": playList.items[i].snippet.publishedAt});
    	if(curr_car == 1){
			html += '<div class="row">';
    	}
    	html += '<div class="col-md-3 fill-sm">';
		html += '<a target="_blank" href="https://www.youtube.com/embed/'+url+'?autoplay=1"><img src="http://img.youtube.com/vi/'+url+'/mqdefault.jpg" style="width:90%;" /></a>';
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
    html += '</div></body>';
    pages[name.replace(/ /g, "_")] = html;
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
    //console.log(categories);
}

function openPage(name){
	$('#content').fadeOut("slow", function(){
	    var replacement = $('<div id="content">'+pages[name]+'</div>').hide();
	    $(this).replaceWith(replacement);
	    $('#content').fadeIn(500);
	    window.scrollTo(0,0);
	});
}

function loadMainCars(){
	var html = "";
	for(j=-2;j < main_cats.length; j++){
		name = main_cats[j];
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
				firstHalfHTML = '<div class="row tile-row" style="max-height:80px;"><div class="row"><div style="margin-bottom:-25px;" class="col-md-offset-1 col-md-7"><h2 style="color:white;"><a style="color:white;" onclick="openPage(\''+name.replace(/ /g, "_")+'\')" title="See all '+name+' Videos">'+name+'</a></h2></div></div><div class="row tiles"><div class="col-md-12" style="height:110%;"><div id="'+name.replace(/ /g, "_")+'_carousel" class="carousel slide" data-ride="carousel" data-wrap="false" data-interval="false"><div id="'+name.replace(/ /g, "_")+'_carousel_inner" class="carousel-inner" role="listbox">';
			}else{
				firstHalfHTML = '<div class="row tile-row" style="max-height:120px;"><div class="row"><div style="margin-bottom:-25px;" class="col-md-offset-1 col-md-7"><h2 style="color:white;"><a style="color:white;" onclick="openPage(\''+name.replace(/ /g, "_")+'\')" title="See all '+name+' Videos">'+name+'</a></h2></div></div><div class="row tiles"><div class="col-md-12" style="height:125%;"><div id="'+name.replace(/ /g, "_")+'_carousel" class="carousel slide" data-ride="carousel" data-wrap="false" data-interval="false"><div id="'+name.replace(/ /g, "_")+'_carousel_inner" class="carousel-inner" role="listbox">';
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
		    	//console.log(playList.items[i]);
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
					html += '<a target="_blank" href="https://www.youtube.com/embed/'+url+'?autoplay=1"><img src="http://img.youtube.com/vi/'+url+'/mqdefault.jpg" style="width:100%;" />';
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
		    		//potentially add a car that shows "click for more"
		    	if(size == 11){
		    		html += '<div class="col-md-3 fill" id="more">';
					html += '<a onclick="openPage(\''+name.replace(/ /g, "_")+'\')" title="See all '+name+' Videos"><img src="img/more.png" style="width:100%;" /></a>';
					html += '</div>';
		    	}
		    	html += '</div>';
				html += '</div>';
		    }
		    secondHalfHTML = '</div></div><div><a id="'+name.replace(/ /g, "_")+'_carousel_prev" class="left carousel-control" href="#'+name.replace(/ /g, "_")+'_carousel" role="button" data-slide="prev" style="display:none;" onclick="prevClick(\''+name.replace(/ /g, "_")+'\','+idx+')"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a id="'+name.replace(/ /g, "_")+'_carousel_next" class="right carousel-control" href="#'+name.replace(/ /g, "_")+'_carousel" role="button" data-slide="next" onclick="nextClick(\''+name.replace(/ /g, "_")+'\','+idx+')"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></div></div></div></div>';
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
	document.getElementById("cars").innerHTML = html;
	pages["home"] = document.getElementById("content").innerHTML;
}

function getPlaylists(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.response);
			console.log(obj);
			for(i=0;i < obj.items.length; i++){
				var pl = obj.items[i]
				var id = pl.id;
				var title = pl.snippet.title;
				var cat = title.split(" - ")[1];
				//title = title.split(" - ")[0];
				//console.log(cat);
				if(cat != undefined){
					if(categories[cat] == undefined){
						categories[cat] = [];
					}
					categories[title] = [];
					getVidsFromPlaylist(id, title, cat, i, obj.items.length - 1);
				}
			}
		}
	};
	xhttp.open("GET", "https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCvnOcTFOvNxpv7-tUw-B4QA&maxResults=50&key="+API_KEY+"", true);
	xhttp.send();
}
function getVidsFromPlaylist(id, title, cat, current, end){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.response);
			if(obj.items.length > 0){
				organizeVideos(title, obj, cat);
				if(current == end){
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

function loadFirstContent(numLive, obj){
	//check for current live show here
	live = false;
	if(numLive > 0){
		live = true;
	}
	//if there is, load live show. load all adds into carosel
	if(live == true) {
		var title = "Current Live Show";
		if(numLive > 1){
			title = "Current Live Shows";
		}
		var url = obj.items[0].id.videoId;
		var vidTitle = obj.items[0].snippet.title;
		var html = '<div class=""><div class="row" style="max-height:420px; margin-top:50px;"><div class="row"><div class="col-md-offset-1"><h2 style="color:white;">'+title+'</h2></div></div><div class="row"><div class="col-md-9 col-md-offset-1"><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item"  src="https://www.youtube.com/embed/'+url+'?autoplay=1"></iframe></div></div></div></div><div id="cars" class="" class="col-md-12"></div>';
		document.getElementById("content").innerHTML = html;
		readTextFile("img/ads/primary/ad_list.txt", true);
		readTextFile("img/ads/secondary/ad_list.txt", true);
		readTextFile("img/ads/regular/ad_list.txt", true);
	} else { //if not, load primary adds up top, regular ads in carosel
		var html = '<div class=""><div class="row" style="max-height:420px;margin-top:50px;margin-left:100px;"><div class="row"><div id="primary_ad" class="col-md-7" style="margin-left:15px; margin-right:-20px;"></div><div id="secondary_ads" class="col-md-4" style="padding-right:55px;"></div></div></div></div><div id="cars" class="" class="col-md-12"></div>';
		document.getElementById("content").innerHTML = html;
		readTextFile("img/ads/primary/ad_list.txt", false);
		readTextFile("img/ads/secondary/ad_list.txt", false);
		readTextFile("img/ads/regular/ad_list.txt", false);
	}
}

function checkForLive(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.response);
			currLiveShowNum = obj.pageInfo.totalResults;
			loadFirstContent(obj.pageInfo.totalResults, obj);
		}
	};
	xhttp.open("GET", "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId="+tempChId+"&type=video&eventType=live&key="+API_KEY+"", true);
	xhttp.send();
}
function createSearchPage(query){
	console.log("new page")
	name = "Search Results for " + query + " ...";
	var html = '<br><br><br><div class="row"><div class="col-md-1"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:60%;margin-left:50%;margin-top:10%;" src="img/back.png"></a></div><div class="col-md-10"><h1 style="color:white;text-align:center;">'+name+'</h1></div></div><div class="col-md-offset-1 col-md-10"><br>';

	var curr_car = 1;
	items = categories["all"];
    var size = 25;
    for(i=0;i < size; i++){
    	url = items[i].url;
    	//categories[cat].push({"url": url, "title": playList.items[i].snippet.title, "time": playList.items[i].snippet.publishedAt});
    	if(curr_car == 1){
			html += '<div class="row">';
    	}
    	html += '<div class="col-md-3 fill-sm">';
		html += '<a target="_blank" href="https://www.youtube.com/embed/'+url+'?autoplay=1"><img src="http://img.youtube.com/vi/'+url+'/hqdefault.jpg" style="width:90%;" /></a>';
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
    html += '</div></body>';
    $('#content').fadeOut("slow", function(){
	    var replacement = $('<div id="content">'+html+'</div>').hide();
	    $(this).replaceWith(replacement);
	    $('#content').fadeIn(500);
	    window.scrollTo(0,0);
	});
}
function launchSearch(){
	serachQuery = document.getElementById("searchbar").value;
	if(serachQuery == ""){
		openPage("home");
		return;
	}else{
		console.log(serachQuery);
		createSearchPage(serachQuery);
	}
}

window.onload = function() {
	//add popover functionality
	$(function () {
		$('[data-toggle="popover"]').popover({html:true})
	})

	categories["all"] = [];
	checkForLive();
	var intervalID = setInterval(function(){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var obj = JSON.parse(this.response);
				console.log(obj);
				if(obj.pageInfo.totalResults > currLiveShowNum){
					document.getElementById("liveAlert").style.visibility = "visible";
					clearInterval(intervalID);
				}
			}
		};
		xhttp.open("GET", "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId="+tempChId+"&type=video&eventType=live&key="+API_KEY+"", true);
		xhttp.send();
	}, 2000);
	getPlaylists();
	pages["social"] = '<br><br><br><div class="col-md-10 col-md-offset-1"><div class="row"><div class="col-md-1"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:60%;margin-left:50%;margin-top:20%;" src="img/back.png"></a></div><div class="col-md-10"><h1 style="color:white;text-align:center;">Social Media</h1></div></div><div class="col-md-12"><br><div class="col-md-6"><iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fshowbarnflix&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="500" height="600" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe></div><div class="col-md-6"><a class="twitter-timeline" data-width="500" data-height="600" data-theme="light" href="https://twitter.com/ShowBarnFlix">Error loading content. Click here to see Tweets by @ShowBarnFlix</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></div></div></div>';
}
