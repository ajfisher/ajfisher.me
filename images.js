var fs = require('fs');


var Metalsmith  = require('metalsmith');
var convert     = require('metalsmith-convert');

// make the options for convert
var convert_opts = [];
var convert_src = 'img/posts/*';

var image_sizes = [300, 400, 500, 650, 750, 1000, 1500];
// adds a stack of different sizes to autocreate
image_sizes.forEach(function(size) {
    convert_opts.push({
        src: convert_src + ".jpg",
        resize: { width: size, resizeStyle: 'aspectfit'},
        nameFormat: "%b_%x.jpg",
    });
    convert_opts.push({
        src: convert_src + ".png",
        resize: { width: size, resizeStyle: 'aspectfit'},
        nameFormat: "%b_%x.png",
    });
});

Metalsmith(__dirname)
    .clean(true)
    .use(convert(convert_opts))
    .source("./src")
    .destination("./build")
    .build(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Images created correctly");
        }
    });
