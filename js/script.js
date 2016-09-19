$(document).ready(function(){
	$(".fancybox").fancybox();
});
$(function(){
	
	var searchField = $("#query");
	var searchButton = $("#search-btn");
	
	// focus event handler
	$(searchField).on("focus", function(){
		$(this).animate({
			width:"100%"
		}, 500);
		$(searchButton).animate({
			right:"10px"
		}, 500);
		$(this).attr("placeholder", " ");
	});
	
	// blur event handler
	$(searchField).on("blur", function(){
		$(this).animate({
			width:"45%",
		}, 500);
		$(searchButton).animate({
			right:"250px"
		}, 500);
		$(this).attr("placeholder", "Search...");
	});
	
	// ?
	$("#search-form").submit(function(e){
		e.preventDefault();
	});

});

function search(){
	
	// clear old results 
	$("#results").html(" ");
	$("#buttons").html(" ");
	
	// GET query za search (spremi search u varijablu q)
	var q = $("#query").val();
	
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: "snippet, id",
			q: q,
			type: "video",
			key: "AIzaSyDHiRwaXZxwyqG7pV81VXk2i7AgMTLRWcs"
		},
		function(data){	//'data' default store 
			var prevPageToken = data.prevPageToken;
			var nextPageToken = data.nextPageToken;
			
			console.log(data);
			
			$.each(data.items, function(i, item){
				
				// dohvat podataka
				var output = getOutput(item);
				
				// ispis podataka
				$("#results").append(output);
				
			});
		
		// display button-a
		var buttons = getButtons(prevPageToken, nextPageToken);
		$("#buttons").append(buttons);

		}
	);
}

function nextPage(){
	
	var token = $("#next-button").data("token");
	var q = $("#next-button").data("query");
	
	$("#results").html(" ");
	$("#buttons").html(" ");
	
	var q = $("#query").val();
	
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: "snippet, id",
			q: q,
			pageToken: token,
			type: "video",
			key: "AIzaSyDHiRwaXZxwyqG7pV81VXk2i7AgMTLRWcs"
		},
		function(data){
			var prevPageToken = data.prevPageToken;
			var nextPageToken = data.nextPageToken;
			
			console.log(data);
			
			$.each(data.items, function(i, item){
				
				// dohvat podataka
				var output = getOutput(item);
				
				// ispis podataka
				$("#results").append(output);
				
			});
		// display button-a
		var buttons = getButtons(prevPageToken, nextPageToken);
		$("#buttons").append(buttons);

		}
	);
}

function prevPage(){
	
	var token = $("#prev-button").data("token");
	var q = $("#prev-button").data("query");
	
	$("#results").html(" ");
	$("#buttons").html(" ");
	
	var q = $("#query").val();
	
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: "snippet, id",
			q: q,
			pageToken: token,
			type: "video",
			key: "AIzaSyDHiRwaXZxwyqG7pV81VXk2i7AgMTLRWcs"
		},
		function(data){
			var prevPageToken = data.prevPageToken;
			var nextPageToken = data.nextPageToken;
			
			console.log(data);
			
			$.each(data.items, function(i, item){
				
				// dohvat podataka
				var output = getOutput(item);
				
				// ispis podataka
				$("#results").append(output);
				
			});
		// display button-a
		var buttons = getButtons(prevPageToken, nextPageToken);
		$("#buttons").append(buttons);

		}
	);
}

// funkc getOutput koja dohvača željene iteme
function getOutput(item){
	
	// dohvat podataka
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;
	
	var output = "<li>" + 
	"<div class='list-left'>" + 
	"<img src='"+thumb+"'>" + 
	"</div>" + 
	"<div class='list-right'>" + 
	"<h3><a class='fancybox fancybox.iframe' href='http://www.youtube.com/embed/"+videoId+"'>"+title+"</a></h3>" +
	"<small>By <span class='cTitle'>"+channelTitle+"</span> on "+videoDate+"</small>" +
	"<p>"+description+"</p>" + 
	"</div>" + 
	"</li>" +
	"<div class='clearfix'></div>" + 
	"";
	
	return output;
	
}

// build button-a
function getButtons(prevPageToken, nextPageToken){
	
	var q = $("#query").val();
	
	if(!prevPageToken){
		var btnOutput = "<div class='button-container'>" + 
		"<button id='next-button' class='paging-button' data-token='"+nextPageToken+"' data-query='"+q+"'" + 
		"onclick='nextPage()'>Next Page</button></div>";
	}else{
		var btnOutput = "<div class='button-container'>" + 
		"<button id='prev-button' class='paging-button' data-token='"+prevPageToken+"' data-query='"+q+"'" + 
		"onclick='prevPage()'>Prev Page</button>" + 
		"<button id='next-button' class='paging-button' data-token='"+nextPageToken+"' data-query='"+q+"'" + 
		"onclick='nextPage()'>Next Page</button></div>";
	}
	
	return btnOutput;
}










