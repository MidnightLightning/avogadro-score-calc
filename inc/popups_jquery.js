// Function to parse all anchor tags, and automatically make those that have a relation of 'external' open in a new window
// Requires jQuery to have been loaded
$(document).ready(function() {
	$("a[rel*='external'").click(function(event) {
		event.preventDefault(); // Keep from following standard href of link
		new_win = window.open($(this).attr('href'), 'avgo_popup') // Pop up a window to that URL
		if (window.focus) { new_win.focus() } // Give it focus if possible
	});
});

var winPop = function(url,win_options) {
	if (win_options === undefined) {
		newWin = window.open(url, 'avogadro_pop'); // Pop a new window
	} else {
		newWin = window.open(url, 'avogadro_pop', win_options); // Pop a new window
	}
	if (window.focus) { newWin.focus() } // Focus on it if possible
	return false; // Keep from following standard href of link
}
