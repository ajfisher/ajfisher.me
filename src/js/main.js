

// does all the various elements we need doing

// Apply stick to the side bar
// basically don't deliver the sticky fill if we're not going multicolumn
if (window.innerWidth >= 768) {
    var sidebar = document.getElementById('sidebar');
    Stickyfill.add(sidebar);
}

// This injects a class onto p tags that contain images in the main article
// part of the page. Markup doesn't really allow class addition to standard
// tags so this is worth doing progressively.
var article_items = document.querySelectorAll("article p * img");
var article_arr_items = Array.from(article_items);

article_arr_items.forEach(function(item) {
	if (item.parentNode.localName == "p") {
		item.parentNode.classList.add("imagep");
	} else if (item.parentNode.localName == "a") {
		if (item.parentNode.parentNode.localName == "p") {
			item.parentNode.parentNode.classList.add("imagep");
		} else {
			console.log(item.parentNode.parentNode.localName);
		}
	}
});
