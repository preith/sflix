var carousel_lens = [];
var carousel_currs = [];
var car_length = 4;
var API_KEY = "AIzaSyDcxMNdd3HVAC9gFB0OHWGMzN8Rn2f2pjk";
var pages = {};
var categories = {}; 

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

function createPage(name, playList, cat){
	var html = '<br><br><br><div class="row"><div class="col-md-1"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:60%;margin-left:50%;margin-top:10%;" src="img/back.png"></a></div><div class="col-md-8"><h2 style="color:white;">'+name+'</h2></div></div><div class="col-md-offset-1 col-md-10"><br>';

	var curr_car = 1;
    var size = playList.items.length;
    for(i=0;i < size; i++){
    	url = playList.items[i].snippet.resourceId.videoId;
    	categories[cat].push({"url": url, "title": playList.items[i].snippet.title, "time": playList.items[i].snippet.publishedAt});
    	if(curr_car == 1){
			html += '<div class="row">';
    	}
    	html += '<div class="col-md-3 fill-sm">';
		html += '<a target="_blank" href="https://www.youtube.com/embed/'+url+'?autoplay=1"><img src="http://img.youtube.com/vi/'+url+'/hqdefault.jpg" style="width:90%;" /></a>';
		html += '<img id="play" src="img/play.png" style="width:5%;"></img>';
		html += '<h4><span>'+playList.items[i].snippet.title+'</span></h4>';
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
    	categories[cat].push({"url": url, "title": playList.items[i].snippet.title, "time": playList.items[i].snippet.publishedAt});
    	categories[name].push({"url": url, "title": playList.items[i].snippet.title, "time": playList.items[i].snippet.publishedAt});
    }
    categories[cat].sort(function(a, b){a_sec = parseInt(a.time.substr(0, 4))*60*60*24*365 + parseInt(a.time.substr(5, 2)*60*60*24*30) + parseInt(a.time.substr(8, 2))*60*60*24 + parseInt(a.time.substr(11, 2))*60*60 + parseInt(a.time.substr(14, 2))*60 + parseInt(a.time.substr(17, 2));b_sec = parseInt(b.time.substr(0, 4))*60*60*24*365 + parseInt(b.time.substr(5, 2)*60*60*24*30) + parseInt(b.time.substr(8, 2))*60*60*24 + parseInt(b.time.substr(11, 2))*60*60 + parseInt(b.time.substr(14, 2))*60 + parseInt(b.time.substr(17, 2));return b_sec-a_sec});
    categories[name].sort(function(a, b){a_sec = parseInt(a.time.substr(0, 4))*60*60*24*365 + parseInt(a.time.substr(5, 2)*60*60*24*30) + parseInt(a.time.substr(8, 2))*60*60*24 + parseInt(a.time.substr(11, 2))*60*60 + parseInt(a.time.substr(14, 2))*60 + parseInt(a.time.substr(17, 2));b_sec = parseInt(b.time.substr(0, 4))*60*60*24*365 + parseInt(b.time.substr(5, 2)*60*60*24*30) + parseInt(b.time.substr(8, 2))*60*60*24 + parseInt(b.time.substr(11, 2))*60*60 + parseInt(b.time.substr(14, 2))*60 + parseInt(b.time.substr(17, 2));return b_sec-a_sec});
    console.log(categories);
}

function openPage(name){
	$('#content').fadeOut("slow", function(){
	    var replacement = $('<div id="content">'+pages[name]+'</div>').hide();
	    $(this).replaceWith(replacement);
	    $('#content').fadeIn(500);
	    window.scrollTo(0,0);
	});
}

function loadCar(name, playList, cat){
	var curr_car = 1;
	carousel_currs.push(1);
	idx = carousel_currs.length - 1;
	var firstHalfHTML = '<div class="row tile-row" style="max-height:150px;"><div class="row"><div class="col-md-offset-1 col-md-7"><h2 style="color:white;"><a style="color:white;" onclick="openPage(\''+name.replace(/ /g, "_")+'\')" title="See all '+name+' Videos">'+name+'</a></h2></div></div><div class="row tiles"><div class="col-md-12" style="height:160%;""><div id="'+name.replace(/ /g, "_")+'_carousel" class="carousel slide" data-ride="carousel" data-wrap="false" data-interval="false"><div id="'+name.replace(/ /g, "_")+'_carousel_inner" class="carousel-inner" role="listbox">';
	var secondHalfHTML = '</div></div><div><a id="'+name.replace(/ /g, "_")+'_carousel_prev" class="left carousel-control" href="#'+name.replace(/ /g, "_")+'_carousel" role="button" data-slide="prev" style="display:none;" onclick="prevClick(\''+name.replace(/ /g, "_")+'\','+idx+')"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a id="'+name.replace(/ /g, "_")+'_carousel_next" class="right carousel-control" href="#'+name.replace(/ /g, "_")+'_carousel" role="button" data-slide="next" onclick="nextClick(\''+name.replace(/ /g, "_")+'\','+idx+')"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></div></div></div></div>';
	var html = document.getElementById("cars").innerHTML;
	html += firstHalfHTML;

	html += '<div class="item active">';
	html += '<div class="row">';
	var size = 11;
    	//sets max size of carosel to 15 (4 pages)
    if(playList.items.length < 11){
    	size = playList.items.length;
    }
    carousel_lens.push(size / 4);
    for(i=0;i < size; i++){
    	//console.log(playList.items[i]);
    	url = playList.items[i].snippet.resourceId.videoId;
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
		html += '<a target="_blank" href="https://www.youtube.com/embed/'+url+'?autoplay=1"><img src="http://img.youtube.com/vi/'+url+'/hqdefault.jpg" style="width:100%;" />';
		html += '<img id="play" src="img/play.png" style="width:5%;"></img></a>';
		html += '<h4><span>'+playList.items[i].snippet.title+'</span></h4>';
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
    document.getElementById("cars").innerHTML = html;
    createPage(name, playList, cat);
    pages["home"] = document.getElementById("content").innerHTML;
    //console.log(pages);
    document.getElementById("dropDown").innerHTML += '<li><a onclick="openPage(\''+name.replace(/ /g, "_")+'\')" title="See all '+name+' Videos">'+name+'</a></li>';
}

function getPlaylists(_callback){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.response);
			//console.log(obj);
			for(i=0;i < obj.items.length; i++){
				var pl = obj.items[i]
				var id = pl.id;
				var title = pl.snippet.title;
				var cat = title.split(" - ")[1];
				title = title.split(" - ")[0];
				console.log(cat);
				if(cat != undefined){
					if(categories[cat] == undefined){
						categories[cat] = [];
					}
					categories[title] = [];
					getVidsFromPlaylist(id, title, cat);
				}
			}
		}
	};
	xhttp.open("GET", "https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCvnOcTFOvNxpv7-tUw-B4QA&maxResults=50&key="+API_KEY+"", true);
	xhttp.send();
}
function getVidsFromPlaylist(id, title, cat){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.response);
			if(obj.items.length > 0){
				//loadCar(title, obj, cat);
				organizeVideos(title, obj, cat);
			}
		}
	};
	xhttp.open("GET", "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId="+id+"&key="+API_KEY+"", true);
	xhttp.send();
}
function loadFirstContent(){
	//check for current live show here
	//if there is, load live show. load all adds into carosel
	html = '<div class="jumbotron"><div class="row" style="max-height:420px;"><div class="row"><div class="col-md-offset-1"><h2 style="color:white;">Current Live Show</h2></div></div><div class="row tiles"><div class="col-md-10"><div class=""><img src="img/livestream.jpg" style="max-height:400px;"></div></div></div></div></div><div id="cars" class="" class="col-md-12"></div>';
	//if not, load primary adds up top, regular ads in carosel
	//html = '<div class="jumbotron"><div class="row" style="max-height:420px;"><div class="row"><div class="col-md-6 col-md-offset-1" style="margin-right:-20px;"><img src="img/ads/primary/CWL-bannerjan.png" style="width:100%;"></div><div class="col-md-4"><img src="img/ads/secondary/harmsshowlambs.png" style="width:98%;padding-bottom:10px;"><img src="img/ads/secondary/MacLennanClubLambs.png" style="width:98%;"></div></div></div></div><div id="cars" class="" class="col-md-12"></div>';
	document.getElementById("content").innerHTML = html;
}
function loadFooter(){
	html = '<div class="col-md-12"><div class="col-md-6"><div class="col-md-4"><div class="col-md-3"><a target="_blank" href="https://www.facebook.com/showbarnflix/"><img height="40px" src="img/fb.png"></a></div><div class="col-md-3"><a target="_blank" href="https://twitter.com/showbarnflix"><img height="40px" src="img/twit.png"></a></div><div class="col-md-3"><a target="_blank" href="https://www.youtube.com/channel/UCvnOcTFOvNxpv7-tUw-B4QA"><img height="40px" src="img/yt.png"></a></div><div class="col-md-3"><a target="_blank" href="https://www.instagram.com/showbarnflix/"><img height="40px" src="img/insta.png"></a></div></div></div><div class="col-md-6" style="text-align:right;">© Copyright 2016 ShowBarnFlix.com | Sponsored by <a target="_blank" href="https://www.wlivestock.com" style="color:white;">Willoughby Sales</a><br><a href="mailto:landree@wlivestock.com" style="color:white;">landree@wlivestock.com</a> | <a style="color:white;" href="tel:303-519-1166">(303) 519-1166</a></div></div>';
	document.getElementById("foot").innerHTML = html;
}

window.onload = function() {
	secondFunction();
	loadFirstContent();
	getPlaylists(function() {
        console.log('huzzah, I\'m done!');
    });
	pages["social"] = '<br><br><br><div class="col-md-10 col-md-offset-1"><div class="row"><div class="col-md-1"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:60%;margin-left:50%;margin-top:20%;" src="img/back.png"></a></div><div class="col-md-8"><h2 style="color:white;">Socail Media</h2></div></div><div class="col-md-12"><br><div class="col-md-6"><iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fshowbarnflix&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="500" height="600" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe></div><div class="col-md-6"><a class="twitter-timeline" data-width="500" data-height="600" data-theme="light" href="https://twitter.com/ShowBarnFlix">Error loading content. Click here to see Tweets by @ShowBarnFlix</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></div></div></div>';
}
