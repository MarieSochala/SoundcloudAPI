var $ = require('jquery');
var SC = require('soundcloud');
var cache = {};


SC.initialize({
	client_id: "7ef5e63f1d7b0de48f4abea27b6c6b70"
});

$("#formsound").submit(function(e) {
	e.preventDefault();
	var lui = $('#artiste').val();
	console.log("youhou");

	SC.get("/users/" + lui + "/tracks").then(function(tracks) {
		for (var i = 0; i < 20; i++) {
			var track=tracks[i];
			$("ul").append('<li> <a data-sc="'+track.id+'" class="btn-floating red"><i class="material-icons">play_arrow</i></a> Latest track: ' + tracks[i].title + '<li></br>');	
			cache[track.id] = track;
			console.log(cache);
		};
	});
});

$('body').on('click', '[data-sc]', function(){
	var id = $(this).attr('data-sc');
	pl.change(cache[id]);

	
});

var pl = { 
	player: null,

	pause: function (){
		this.player.pause();
	},
	play: function (){
		this.player.play();
	}, 
	change: function (track){
		this.track = track;
		SC.stream('/tracks/' + track.id).then(function(player){
			pl.player = player;
			pl.play();
			pl.updateUI();
		});
	},
	updateUI: function (){
		var track = this.track;
		$('#auteur').html(track.user.username);
		$('#avatar').html('<img src="' + track.user.avatar_url + '" class="avatar">');
		$('#titre').html(track.title);
	},

	volume: function (){
		var son = ($('#volume').val())/100;
		this.player.setVolume(son);
	}

};

$('#pause').on('click', function(){
	$('img').removeClass("tourne");
	pl.pause();
});


$('#play').on('click', function(){
	$('img').addClass("tourne");
	pl.play();
});

$('#volume').on('change', function(){
	pl.volume();	
});










