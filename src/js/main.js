

// does all the various elements we need doing

// Apply stick to the side bar
// basically don't deliver the sticky fill if we're not going multicolumn
if (window.innerWidth >= 768) {
    var sidebar = document.getElementById('sidebar');
    Stickyfill.add(sidebar);
}

// now add items where they need to be for images in the main body
var article_items = document.querySelectorAll("article p * img");
var article_arr_items = Array.from(article_items);

console.log("in here");
article_arr_items.forEach(function(item) {
	if (item.parentNode.localName == "p") {
		item.parentNode.classList.add("imagep");
		console.log("its p");
	} else if (item.parentNode.localName == "a") {
		console.log("its a");
		if (item.parentNode.parentNode.localName == "p") {
			console.log("p a img");
			item.parentNode.parentNode.classList.add("imagep");
		} else {
			console.log(item.parentNode.parentNode.localName);
		}
	}
});
