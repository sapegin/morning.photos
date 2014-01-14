// http://bost.ocks.org/mike/shuffle/
function shuffle(a) {
	var m = a.length;
	while (m) {
		var i = Math.floor(Math.random() * m--),
			t = a[m];
		a[m] = a[i];
		a[i] = t;
	}
	return a;
}
