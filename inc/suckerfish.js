// Son of Suckerfish dropdown menus
// IE replacement of the ":hover" pseudoclass
$(document).ready(function() {
	$('li').mouseenter(function() {
		$(this).addClass('sfhover');
	}).mouseleave(function() {
		$(this).removeClass('sfhover');
	});
});
