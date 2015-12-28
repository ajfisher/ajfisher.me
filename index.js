var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');

Metalsmith(__dirname)
    .use(markdown())
    .use(layouts({
        engine: "handlebars",
        directory: "./layouts",
        partials: "./layouts/partials",
    }))
    .source("./src/content")
    .destination("./build")
    .build(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Site built correctly");
        }
    });


