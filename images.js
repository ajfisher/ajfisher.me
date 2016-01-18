var fs = require('fs');


var Metalsmith  = require('metalsmith');
var convert     = require('metalsmith-convert');

// make the options for convert
var convert_opts = [];
var convert_src = 'img/posts/*.jpg';

var image_sizes = [300, 400, 500, 650, 750, 1000, 1500];
// adds a stack of different sizes to autocreate
image_sizes.forEach(function(size) {
    convert_opts.push({
        src: convert_src,
        resize: { width: size, resizeStyle: 'aspectfit'},
        nameFormat: "%b_%x.jpg",
    });
});

Metalsmith(__dirname)
    .clean(false)
    .use(convert(convert_opts))
    .source("./src")
    .destination("./build")
    .build(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Site built correctly");
        }
    });
