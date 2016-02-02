// does all the various elements we need doing
var ajfisher = {}; // namespace vars

// Apply sticky to the side bar
// basically don't deliver the sticky fill if we're not going multicolumn
if (window.innerWidth >= 768) {
    var sidebar = document.getElementById('sidebar');
    Stickyfill.add(sidebar);
}

// This injects a class onto p tags that contain images in the main article
// part of the page. Markup doesn't really allow class addition to standard
// tags so this is worth doing progressively.
ajfisher.articleImages = function() {
    ajfisher.article_items = Array.from(document.querySelectorAll("article p * img"));

    ajfisher.article_items.forEach(function(item) {
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
};

// now we do the pull quotes to extract them from the document and then
// set the appropriate CSS etc
ajfisher.pullquotes = function() {
    ajfisher.pullquote_list = Array.from(document.querySelectorAll("article p b"));

    ajfisher.pullquote_list.forEach(function(pq) {
        pq.parentNode.classList.add("has-pullquote");
        // make sure it's upper case on first char so it reads right.
        var quote = pq.textContent;
        quote = "" + quote[0].toUpperCase() + quote.substring(1)

        // now assign to the pq
        pq.parentNode.dataset.pullquote = quote;
    });
};

// produce the selection stuff.
ajfisher.selector = {};

ajfisher.selector.getSelection = function() {
    var t = '';
    if (window.getSelection) {
        t = window.getSelection();
    } else if (document.getSelection) {
        t = document.getSelection();
    } else if (document.selection) {
        t = document.selection.createRange().text;
    }

    return t;
}

console.log("hi there");
ajfisher.articleImages();
ajfisher.pullquotes();
