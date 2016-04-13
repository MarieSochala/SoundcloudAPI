var $ = require('jquery');
var SC = require('soundcloud');

SC.initialize({
   client_id: "7ef5e63f1d7b0de48f4abea27b6c6b70"
});


$("#getList").click(function() {
    console.log("youhou");
    SC.get("/users/lordakat/tracks").then(function(tracks) {
        $("ul").append('Latest track: ' + tracks[0].title);
});
}); 



