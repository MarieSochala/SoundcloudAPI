var $ = require('jquery');
var SC = require('soundcloud');

SC.initialize({
	client_id: "7ef5e63f1d7b0de48f4abea27b6c6b70"
});

var cache = {};



$("#formsound").submit(function(e) {
	e.preventDefault();
	console.log("youhou");

	SC.get("/users/lordakat/tracks").then(function(tracks) {
		for (var i = 0; i < 6; i++) {
			var track=tracks[i];
			$("ul").append('<li> <button data-sc="'+track.id+'">Lire</button> Latest track: ' + tracks[i].title + '<li>');	
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
		$('#avatar').html('<img src="' + track.user.avatar_url + '">');
		$('#titre').html(track.title);
	},

	volume: function (){
		var son = ($('#volume').val())/100;
		this.player.setVolume(son);
	}

};

$('#pause').on('click', function(){
	pl.pause();
});


$('#play').on('click', function(){
	pl.play();
});

$('#volume').on('change', function(){
	pl.volume();	
});









