var carousel_lens = [];
var carousel_currs = [];
var car_length = 4;
var API_KEY = "AIzaSyDcxMNdd3HVAC9gFB0OHWGMzN8Rn2f2pjk";
var pages = {};

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

function createPage(name, playList){
	var html = '<br><br><br><div class="row"><div class="col-md-1"><a onclick="openPage(\'home\')" title="Back to Home"><img style="width:60%;margin-left:50%;margin-top:10%;" src="img/back.png"></a></div><div class="col-md-8"><h2 style="color:white;">'+name+'</h2></div></div><div class="col-md-offset-1 col-md-10"><br>';

	var curr_car = 1;
    var size = playList.items.length;
    for(i=0;i < size; i++){
    	//console.log(playList.items[i]);
    	url = playList.items[i].snippet.resourceId.videoId;
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
    console.log(name);
}

function openPage(name){
	$('#content').fadeOut("slow", function(){
	    var replacement = $('<div id="content">'+pages[name]+'</div>').hide();
	    $(this).replaceWith(replacement);
	    $('#content').fadeIn("slow");
	    window.scrollTo(0,0);
	});
}

function loadCar(name, playList){
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
    		html += '<div class="col-md-3 fill">';
    	}
		html += '<a target="_blank" href="https://www.youtube.com/embed/'+url+'?autoplay=1"><img src="http://img.youtube.com/vi/'+url+'/hqdefault.jpg" style="width:100%;" /></a>';
		html += '<img id="play" src="img/play.png" style="width:5%;"></img>';
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
    	/*if(size == 11){
    		html += '<div class="col-md-3 fill">';
			html += '<a href="/sheep"><img src="img/more.jpg" style="width:100%;" /></a>';
			html += '</div>';
    	}*/
    	html += '</div>';
		html += '</div>';
    }
    html += secondHalfHTML;
    document.getElementById("cars").innerHTML = html;
    createPage(name, playList);
    pages["home"] = document.getElementById("content").innerHTML;
    console.log(pages);
    document.getElementById("dropDown").innerHTML += '<li><a onclick="openPage(\''+name.replace(/ /g, "_")+'\')" title="See all '+name+' Videos">'+name+'</a></li>';
}

function getPlaylists(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.response);
			//console.log(obj);
			for(i=0;i < obj.items.length; i++){
				var pl = obj.items[i]
				var id = pl.id;
				var title = pl.snippet.title;
				getVidsFromPlaylist(id, title);
			}
		}
	};
	xhttp.open("GET", "https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCvnOcTFOvNxpv7-tUw-B4QA&maxResults=50&key="+API_KEY+"", true);
	xhttp.send();
}
function getVidsFromPlaylist(id, title){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.response);
			if(obj.items.length > 0){
				loadCar(title, obj);
			}
		}
	};
	xhttp.open("GET", "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId="+id+"&key="+API_KEY+"", true);
	xhttp.send();
}
function loadFirstContent(){
	html = '<div class="jumbotron"><div class="row" style="max-height:420px;"><div class="row"><div class="col-md-offset-1"><h2 style="color:white;">Current Live Show</h2></div></div><div class="row tiles"><div class="col-md-10"><div class=""><img src="img/livestream.jpg" style="max-height:400px;"></div></div></div></div></div><div id="cars" class="" class="col-md-12"></div>';
	document.getElementById("content").innerHTML = html;
}
window.onload = function() {
	loadFirstContent();
	getPlaylists();
}
